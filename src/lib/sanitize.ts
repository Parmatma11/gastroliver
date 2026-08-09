// Basic HTML Sanitizer for medical content pages
export function sanitizeHtml(html: string): string {
  if (!html) return "";

  return html
    // Remove scripts and direct handlers
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
    .replace(/<iframe[^>]*>([\s\S]*?)<\/iframe>/gi, '')
    .replace(/<object[^>]*>([\s\S]*?)<\/object>/gi, '')
    .replace(/<embed[^>]*>([\s\S]*?)<\/embed>/gi, '')
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '')
    // Remove event listener attributes
    .replace(/on\w+\s*=\s*["'][\s\S]*?["']/gi, '')
    // Remove javascript: links
    .replace(/href\s*=\s*["']javascript:[\s\S]*?["']/gi, 'href="#"');
}
