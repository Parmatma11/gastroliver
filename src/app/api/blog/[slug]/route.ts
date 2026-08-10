import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parseMarkdownToHtml } from '../../../../lib/markdown';

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  
  if (!slug) {
    return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: `Blog not found: ${slug}` }, { status: 404 });
  }

  try {
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const cleanedContent = stripTableOfContents(rawContent);
    const html = parseMarkdownToHtml(cleanedContent);

    return NextResponse.json({ html });
  } catch {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

function stripTableOfContents(markdown: string): string {
  if (!markdown) return "";
  
  const lines = markdown.split('\n');
  const resultLines: string[] = [];
  let inToc = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Detect Table of Contents header
    if (trimmed.toLowerCase() === 'table of contents') {
      inToc = true;
      continue;
    }
    
    if (inToc) {
      // Skip empty lines, Toggle button lines, and list items representing links
      if (trimmed === '' || 
          trimmed.includes('[Toggle') || 
          trimmed.includes('](#)') || 
          trimmed.startsWith('- [') || 
          trimmed.startsWith('* [') ||
          (trimmed.startsWith('-') && trimmed.includes('](#'))) {
        continue;
      }
      
      // End of TOC block
      inToc = false;
    }
    
    resultLines.push(line);
  }
  
  return resultLines.join('\n');
}
