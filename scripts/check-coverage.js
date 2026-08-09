/* eslint-disable */
const fs = require('fs');
const path = require('path');

// Extract URLs from url-map.md
function parseLegacyUrls(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const urlRegex = /`(\/[^`]*)`/g;
    const urls = new Set();
    let match;
    while ((match = urlRegex.exec(content)) !== null) {
      const url = match[1];
      // Keep only page URLs, skip file paths or static resources
      if (url.startsWith('/') && !url.includes('.') && !url.includes('/wp-content/')) {
        urls.add(url);
      }
    }
    return Array.from(urls);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
}

// Load data files to check matching slugs
function loadData(filePath) {
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

async function run() {
  console.log("=== STARTING MIGRATION COVERAGE AUDIT ===");

  const legacyUrls = parseLegacyUrls(path.join(__dirname, '..', 'docs', 'url-map.md'));
  console.log(`Discovered ${legacyUrls.length} legacy URLs to check.\n`);

  // Load slugs
  const diseaseSlugs = loadData(path.join(__dirname, '..', 'data', 'diseases.ts'));
  const procedureSlugs = loadData(path.join(__dirname, '..', 'data', 'procedures.ts'));
  const blogSlugs = loadData(path.join(__dirname, '..', 'data', 'blog.ts'));

  // Load redirects mapping
  const routesContent = fs.readFileSync(path.join(__dirname, '..', 'data', 'routes.ts'), 'utf8');
  // Simple regex to parse redirectsMap
  const redirectRegex = /"(\/[^"]*)"\s*:\s*"(\/[^"]*)"/g;
  const redirects = {};
  let rMatch;
  while ((rMatch = redirectRegex.exec(routesContent)) !== null) {
    redirects[rMatch[1]] = rMatch[2];
  }

  // Hardcoded static routes
  const staticRoutes = [
    '/',
    '/doctor-profile/',
    '/hospital/',
    '/gallery/',
    '/contact/',
    '/payments/',
    '/blog/',
    '/patient-testimonials/',
    '/case-study/',
    '/sitemap/'
  ];

  const results = [];
  let migratedCount = 0;
  let redirectCount = 0;
  let missingCount = 0;
  let errorCount = 0;

  for (const url of legacyUrls) {
    const normalizedUrl = url.endsWith('/') ? url : `${url}/`;
    const slug = url.replace(/^\/|\/$/g, '');

    // 1. Is it a static migrated page?
    if (staticRoutes.includes(normalizedUrl)) {
      results.push({ url, status: 'MIGRATED', target: normalizedUrl, note: 'Direct match' });
      migratedCount++;
      continue;
    }

    // 2. Is it in the hardcoded redirects map?
    if (redirects[normalizedUrl]) {
      results.push({ url, status: 'REDIRECT', target: redirects[normalizedUrl], note: 'Static 301' });
      redirectCount++;
      continue;
    }

    // 3. Does it match a disease slug?
    if (diseaseSlugs.includes(slug)) {
      const contentPath = path.join(__dirname, '..', 'content', 'diseases', `${slug}.md`);
      if (fs.existsSync(contentPath)) {
        results.push({ url, status: 'REDIRECT', target: `/conditions/${slug}/`, note: 'Dynamic disease redirect (Verified Content)' });
        redirectCount++;
      } else {
        results.push({ url, status: 'ERROR', target: `/conditions/${slug}/`, note: 'Missing markdown content file!' });
        errorCount++;
      }
      continue;
    }

    // 4. Does it match a procedure slug?
    if (procedureSlugs.includes(slug)) {
      const contentPath = path.join(__dirname, '..', 'content', 'procedures', `${slug}.md`);
      if (fs.existsSync(contentPath)) {
        results.push({ url, status: 'REDIRECT', target: `/procedures/${slug}/`, note: 'Dynamic procedure redirect (Verified Content)' });
        redirectCount++;
      } else {
        results.push({ url, status: 'ERROR', target: `/procedures/${slug}/`, note: 'Missing markdown content file!' });
        errorCount++;
      }
      continue;
    }

    // 5. Does it match a blog slug?
    if (blogSlugs.includes(slug)) {
      const contentPath = path.join(__dirname, '..', 'content', 'blog', `${slug}.md`);
      if (fs.existsSync(contentPath)) {
        results.push({ url, status: 'REDIRECT', target: `/blog/${slug}/`, note: 'Dynamic blog redirect (Verified Content)' });
        redirectCount++;
      } else {
        results.push({ url, status: 'ERROR', target: `/blog/${slug}/`, note: 'Missing markdown content file!' });
        errorCount++;
      }
      continue;
    }

    // 6. Otherwise it's missing or needs manual review
    results.push({ url, status: 'MISSING', target: 'N/A', note: 'No route or redirect matches found' });
    missingCount++;
  }

  // Create report markdown
  let report = `# Migration Coverage Report\n\n`;
  report += `> **Generated At**: ${new Date().toISOString()}\n`;
  report += `> **Audit Results**: ${migratedCount} Migrated, ${redirectCount} Redirected, ${errorCount} Errors, ${missingCount} Missing.\n\n`;
  report += `## Summary Statistics\n\n`;
  report += `| Status | Count | Description |\n`;
  report += `|---|---|---|\n`;
  report += `| **MIGRATED** | ${migratedCount} | Legacy URLs mapping directly to new static routes |\n`;
  report += `| **REDIRECT** | ${redirectCount} | Legacy URLs permanently redirected (301) to new locations (Verified Content) |\n`;
  report += `| **ERROR** | ${errorCount} | Matching slug found but dynamic content markdown file is missing! |\n`;
  report += `| **MISSING** | ${missingCount} | Legacy URLs with no matches (Requires manual audit) |\n\n`;
  
  report += `## Detailed Page Mapping Table\n\n`;
  report += `| # | Legacy URL | Status | Target Route | Notes |\n`;
  report += `|---|---|---|---|---|\n`;
  
  results.forEach((res, idx) => {
    report += `| ${idx + 1} | \`${res.url}\` | **${res.status}** | \`${res.target}\` | ${res.note} |\n`;
  });

  const reportPath = path.join(__dirname, '..', 'docs', 'phase-4-report.md');
  fs.writeFileSync(reportPath, report, 'utf8');

  console.log(`\nCoverage check complete!`);
  console.log(`Results summary:`);
  console.log(`- MIGRATED: ${migratedCount}`);
  console.log(`- REDIRECT: ${redirectCount}`);
  console.log(`- ERROR: ${errorCount}`);
  console.log(`- MISSING: ${missingCount}`);
  console.log(`\nDetailed report saved to: ${reportPath}`);
}

run();
