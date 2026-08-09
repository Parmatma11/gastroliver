import { sanitizeHtml } from './sanitize';

// Simple regex-based markdown to HTML parser for clinical content
export function parseMarkdownToHtml(markdown: string): string {
  if (!markdown) return "";

  let html = markdown
    // Escape HTML entities to prevent raw injection, except we keep structure safe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    
    // Bold: **text**
    .replace(/\*\*([\s\S]*?)\*\*/g, '<strong>$1</strong>')
    
    // Headings: #, ##, ###, ####
    .replace(/^####\s+(.*?)$/gm, '<h4>$1</h4>')
    .replace(/^###\s+(.*?)$/gm, '<h3>$1</h3>')
    .replace(/^##\s+(.*?)$/gm, '<h2>$1</h2>')
    .replace(/^#\s+(.*?)$/gm, '<h1>$1</h1>')
    
    // Lists: - item
    // We group consecutive list items together
    .replace(/^- (.*?)$/gm, '<li>$1</li>');

  // Wrap list items in <ul>
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    // Remove duplicate nested <ul> wrappers
    .replace(/<\/ul>\s*<ul>/g, '');

  // Split double newlines into paragraphs, except inside headers or lists
  const lines = html.split(/\n\n+/);
  const parsedParagraphs = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return "";
    
    // If it is already a header or list block, leave it as is
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<li')) {
      return trimmed;
    }
    
    // Convert links: [label](url)
    const processedLine = trimmed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="content-link">$1</a>');
    
    return `<p>${processedLine}</p>`;
  });

  return sanitizeHtml(parsedParagraphs.filter(Boolean).join('\n'));
}
