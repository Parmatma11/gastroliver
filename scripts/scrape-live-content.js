/* eslint-disable */
const fs = require('fs');
const path = require('path');
const https = require('https');

// Helper to download content from a URL
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to load ${url}: Status Code ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Helper to extract slugs using regex
function getSlugsFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const slugRegex = /slug:\s*["']([^"']+)["']/g;
    const slugs = [];
    let match;
    while ((match = slugRegex.exec(content)) !== null) {
      slugs.push(match[1]);
    }
    return slugs;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
}

// Helper to clean HTML to markdown
function cleanHtmlToMarkdown(rawHtml) {
  let content = "";
  
  // Locate Divi main body content column (2/3 column layout or post_content)
  const startIdx = rawHtml.indexOf('<div class="et_pb_column et_pb_column_2_3');
  if (startIdx !== -1) {
    const endIdx = rawHtml.indexOf('<div class="et_pb_column et_pb_column_1_3', startIdx);
    if (endIdx !== -1) {
      content = rawHtml.substring(startIdx, endIdx);
    } else {
      const fallbackEndIdx = rawHtml.indexOf('class="et_pb_column_4_tb_footer', startIdx);
      if (fallbackEndIdx !== -1) {
        content = rawHtml.substring(startIdx, fallbackEndIdx);
      } else {
        content = rawHtml.substring(startIdx);
      }
    }
  } else {
    // Fallback standard wrappers
    const bodyStartClasses = [
      '<div class="entry-content">',
      '<div class="et_pb_post_content_0_tb_body">',
      '<article id="post-'
    ];
    let foundStart = -1;
    for (const wrapper of bodyStartClasses) {
      foundStart = rawHtml.indexOf(wrapper);
      if (foundStart !== -1) {
        break;
      }
    }
    if (foundStart !== -1) {
      const footerStart = rawHtml.indexOf('<footer', foundStart);
      content = footerStart !== -1 ? rawHtml.substring(foundStart, footerStart) : rawHtml.substring(foundStart);
    } else {
      // General body fallback
      const titleStart = rawHtml.indexOf('<h1');
      if (titleStart !== -1) {
        const footerStart = rawHtml.indexOf('<footer', titleStart);
        content = footerStart !== -1 ? rawHtml.substring(titleStart, footerStart) : rawHtml.substring(titleStart);
      }
    }
  }

  if (!content) return "";

  // Convert HTML tags to Markdown
  let markdown = content
    // Remove scripts and style blocks
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '')
    // Replace headers
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n')
    // Replace strong and bold tags
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**')
    // Replace links
    .replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    // Replace lists
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, '\n$1\n')
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, '\n$1\n')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
    // Replace paragraphs and breaks
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n')
    .replace(/<br\s*\/?>/gi, '\n')
    // Remove all remaining HTML tags
    .replace(/<[^>]*>/g, '')
    // Clean up entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    // Clean extra empty lines
    .replace(/\n\s*\n+/g, '\n\n')
    .trim();

  return markdown;
}

async function scrapeCategory(filePath, categoryFolder) {
  const slugs = getSlugsFromFile(filePath);
  console.log(`Discovered ${slugs.length} slugs in ${filePath}. Starting scrape...`);
  
  const destDir = path.join(__dirname, '..', 'content', categoryFolder);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  for (const slug of slugs) {
    const destFile = path.join(destDir, `${slug}.md`);
    if (fs.existsSync(destFile)) {
      console.log(`Skipping: ${categoryFolder}/${slug}.md already exists.`);
      continue;
    }

    const url = `https://gastroliver.in/${slug}/`;
    try {
      console.log(`Fetching: ${url}`);
      const rawHtml = await fetchUrl(url);
      const markdown = cleanHtmlToMarkdown(rawHtml);
      
      if (markdown && markdown.length > 50) {
        fs.writeFileSync(destFile, markdown, 'utf8');
        console.log(`Saved: ${categoryFolder}/${slug}.md (${markdown.length} bytes)`);
      } else {
        console.warn(`Warning: Extracted content for ${slug} is empty or too short. Saving raw fallback...`);
        // Fallback save the description if extraction failed
        fs.writeFileSync(destFile, `# ${slug.replace(/-/g, ' ')}\n\n(Content extraction failed. Fallback raw markup is being audited.)`, 'utf8');
      }
      
      // Delay 100ms to avoid throttling
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (err) {
      console.error(`Error scraping ${slug}:`, err.message);
    }
  }
}

async function run() {
  console.log("=== STARTING LIVE CONTENT SCRAPE ===");
  
  // Scrape diseases
  await scrapeCategory(
    path.join(__dirname, '..', 'data', 'diseases.ts'),
    'diseases'
  );

  // Scrape procedures
  await scrapeCategory(
    path.join(__dirname, '..', 'data', 'procedures.ts'),
    'procedures'
  );

  // Scrape blogs
  await scrapeCategory(
    path.join(__dirname, '..', 'data', 'blog.ts'),
    'blog'
  );

  console.log("=== SCRAPING COMPLETE ===");
}

run();
