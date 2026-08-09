/* eslint-disable */
// Node script to extract clean medical content from step logs and save to content/samples
const fs = require('fs');
const path = require('path');

const stepsBase = path.join('C:', 'Users', 'Lenovo', '.gemini', 'antigravity-ide', 'brain', '759e0827-6505-4364-b69f-948312be59e1', '.system_generated', 'steps');
const outputBase = path.join(__dirname, '..', 'content', 'samples');

// Ensure output folder exists
if (!fs.existsSync(outputBase)) {
  fs.mkdirSync(outputBase, { recursive: true });
}

// Map of Step Number -> Output Filename
const sampleFiles = {
  "59": "disease-acidity-and-reflux.md",
  "129": "disease-cirrhosis.md",
  "130": "disease-gall-bladder-stone.md",
  "60": "procedure-ugi-endoscopy.md",
  "131": "procedure-ercp.md",
  "132": "procedure-fibroscan.md",
  "61": "blog-fatty-liver-symptoms.md",
  "133": "blog-acid-reflux-symptoms.md",
  "134": "blog-semaglutide-for-weight-loss.md"
};

console.log("Extracting representative content samples...");

for (const step of Object.keys(sampleFiles)) {
  const stepFile = path.join(stepsBase, step, 'content.md');
  const outFile = path.join(outputBase, sampleFiles[step]);

  if (!fs.existsSync(stepFile)) {
    console.warn(`Warning: Step file not found: ${stepFile}`);
    continue;
  }

  const rawHtml = fs.readFileSync(stepFile, 'utf8');

  // Simple string-based extraction of main content body
  // We extract content inside the main body.
  // We search for first occurrence of "<h1" or "<h1>" inside the body text and extract until the footer wrapper or services.
  let content = "";
  
  // Find where main header or title starts
  const startIdx = rawHtml.indexOf('<div class="et_pb_column et_pb_column_2_3');
  if (startIdx !== -1) {
    const endIdx = rawHtml.indexOf('<div class="et_pb_column et_pb_column_1_3', startIdx);
    if (endIdx !== -1) {
      content = rawHtml.substring(startIdx, endIdx);
    } else {
      // fallback to extracting from start of main listing
      const fallbackEndIdx = rawHtml.indexOf('class="et_pb_column_4_tb_footer', startIdx);
      if (fallbackEndIdx !== -1) {
        content = rawHtml.substring(startIdx, fallbackEndIdx);
      } else {
        content = rawHtml.substring(startIdx);
      }
    }
  } else {
    // fallback if no columns match
    const titleStart = rawHtml.indexOf('<h1');
    if (titleStart !== -1) {
      const footerStart = rawHtml.indexOf('<footer', titleStart);
      content = footerStart !== -1 ? rawHtml.substring(titleStart, footerStart) : rawHtml.substring(titleStart);
    }
  }

  if (!content) {
    console.error(`Error: Could not extract content from Step ${step}`);
    continue;
  }

  // Clean HTML tags to clean markdown representation
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

  fs.writeFileSync(outFile, markdown, 'utf8');
  console.log(`Extracted: ${outFile}`);
}

console.log("Extraction complete!");
