import { parseMarkdownToHtml } from './markdown';

export interface MarkdownSection {
  title: string;
  cleanTitle: string;
  id: string;
  level: number;
  contentHtml: string;
  rawMarkdown: string;
}

export function parseContentToSections(markdown: string): MarkdownSection[] {
  if (!markdown) return [];

  const lines = markdown.split('\n');
  const sections: MarkdownSection[] = [];
  
  let currentTitle = "Overview";
  let currentLevel = 2;
  let currentMarkdownLines: string[] = [];

  const createSection = (title: string, level: number) => {
    // Generate clean title (remove bold stars and surrounding whitespace)
    const cleanTitle = title.replace(/\*\*/g, '').replace(/[\r\n]/g, '').trim();
    // Generate ID for scroll anchor
    const id = cleanTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // remove special chars
      .replace(/\s+/g, '-')         // replace spaces with dash
      .replace(/-+/g, '-');         // remove duplicate dashes

    const rawMarkdown = currentMarkdownLines.join('\n');
    const contentHtml = parseMarkdownToHtml(rawMarkdown);

    sections.push({
      title,
      cleanTitle,
      id: id || `section-${sections.length}`,
      level,
      contentHtml,
      rawMarkdown
    });

    currentMarkdownLines = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check for headings: #, ##, ###, ####
    if (trimmed.startsWith('#')) {
      const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const headingText = headingMatch[2].trim();

        // Save previous section before starting a new one
        if (currentMarkdownLines.length > 0 || sections.length > 0) {
          createSection(currentTitle, currentLevel);
        }

        currentTitle = headingText;
        currentLevel = level;
        continue;
      }
    }

    currentMarkdownLines.push(line);
  }

  // Create the final section
  if (currentMarkdownLines.length > 0 || sections.length === 0) {
    createSection(currentTitle, currentLevel);
  }

  // Filter out completely empty sections if any
  return sections.filter(sec => sec.contentHtml.trim() !== '' || sec.level === 1);
}
