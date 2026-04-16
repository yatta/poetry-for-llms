import * as cheerio from 'cheerio';

/**
 * Extract the invisible layer from an HTML document —
 * everything a machine reads that a browser doesn't show.
 */
export function extract(html, source) {
  const $ = cheerio.load(html);

  return {
    source,
    comments: extractComments(html),
    structuredData: extractStructuredData($),
    meta: extractMeta($),
    headings: extractHeadings($),
    landmarks: extractLandmarks($),
    images: extractImages($),
    links: extractLinks($),
  };
}

/**
 * HTML comments — regex-based because cheerio doesn't
 * surface comments in a convenient way.
 */
function extractComments(html) {
  const comments = [];
  const regex = /<!--([\s\S]*?)-->/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const text = match[1].trim();
    // Skip empty comments, IE conditionals, and build tool artifacts
    if (
      !text ||
      text.startsWith('[if') ||
      text.startsWith('!') ||
      text.startsWith('#')
    ) continue;

    // Estimate line number
    const before = html.substring(0, match.index);
    const line = before.split('\n').length;

    comments.push({ text, line, kind: classifyComment(text) });
  }

  return comments;
}

/**
 * Classify a comment as "authored" (intentional prose) or
 * "structural" (section markers, dev notes, commented-out HTML).
 *
 * Heuristic — meant to work across any site, not just EA1:
 *  1. Contains HTML tags → structural (commented-out markup)
 *  2. Starts with ALL CAPS label → structural (section marker, possibly with parenthetical)
 *  3. ALL CAPS and short (≤ 8 words) → structural (section marker)
 *  4. Looks like machine-generated diagnostics → structural (cache/perf stats)
 *  5. Short dev note (≤ 8 words), no sentence structure → structural
 *  6. Everything else → authored
 */
function classifyComment(text) {
  const stripped = text.replace(/\s+/g, ' ').trim();
  const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);

  // Commented-out HTML
  if (/<[a-z][^>]*>/i.test(stripped)) return 'structural';

  // Starts with ALL CAPS label, possibly followed by parenthetical
  // e.g. "TEAM GRID (built from team-data.json)", "SUPPORT STAFF (v2)"
  if (/^[A-Z][A-Z0-9 ]+(?: \(.*\))?$/.test(stripped)) {
    return 'structural';
  }

  const words = stripped.split(/\s+/);

  // ALL CAPS and short — section markers like HERO, FOOTER, WORK ITEMS
  if (words.length <= 8 && stripped === stripped.toUpperCase() && /[A-Z]/.test(stripped)) {
    return 'structural';
  }

  // Machine-generated diagnostics — key:value dumps, render stats, cache info
  if (lines.length >= 3) {
    const kvLines = lines.filter(l => /^[\w\s\-]+[:=]/.test(l));
    if (kvLines.length / lines.length > 0.5) return 'structural';
    // Tab/space-delimited data tables (e.g. "100.00%  418.164  1  -total")
    const dataLines = lines.filter(l => /^\s*[\d.]+%?\s{2,}/.test(l));
    if (dataLines.length / lines.length > 0.5) return 'structural';
  }

  // Single-line machine stamps — cache keys, render IDs, version hashes
  if (lines.length === 1 && /\b(cache|render|parser|compiled|generated|revision)\b/i.test(stripped) && /\b[a-f0-9]{8,}\b/.test(stripped)) {
    return 'structural';
  }

  // Short dev notes — "do not modify this file", "Populated by JS", "end hoisted css"
  // Lacks the sentence rhythm of authored prose (no em-dashes, line breaks with poetic intent)
  if (words.length <= 8 && lines.length === 1 && !/[—]/.test(stripped)) {
    // Has sentence punctuation but reads like an instruction, not prose
    if (/\b(do not|don't|TODO|FIXME|NOTE|HACK|RELEASE|hoisted|generated|rendered|compiled)\b/i.test(stripped)) {
      return 'structural';
    }
    // No sentence punctuation at all
    if (!/[.!?]/.test(stripped)) return 'structural';
  }

  return 'authored';
}

/**
 * Structured data — JSON-LD blocks.
 */
function extractStructuredData($) {
  const blocks = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const parsed = JSON.parse($(el).html());
      blocks.push(parsed);
    } catch {
      blocks.push({ _error: 'Invalid JSON-LD', raw: $(el).html() });
    }
  });
  return blocks;
}

/**
 * Meta tags — title, description, OG, Twitter, robots.
 */
function extractMeta($) {
  const meta = {};

  // Title
  const title = $('title').text().trim();
  if (title) meta.title = title;

  // Standard meta
  const fields = ['description', 'robots', 'author', 'keywords'];
  for (const name of fields) {
    const content = $(`meta[name="${name}"]`).attr('content');
    if (content) meta[name] = content;
  }

  // Open Graph
  const og = {};
  $('meta[property^="og:"]').each((_, el) => {
    const prop = $(el).attr('property').replace('og:', '');
    og[prop] = $(el).attr('content');
  });
  if (Object.keys(og).length) meta.openGraph = og;

  // Twitter
  const twitter = {};
  $('meta[name^="twitter:"]').each((_, el) => {
    const name = $(el).attr('name').replace('twitter:', '');
    twitter[name] = $(el).attr('content');
  });
  if (Object.keys(twitter).length) meta.twitter = twitter;

  return meta;
}

/**
 * Heading hierarchy — the outline.
 */
function extractHeadings($) {
  const headings = [];
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const level = parseInt(el.tagName.replace('h', ''), 10);
    // Replace <br> with a space before extracting text, so
    // "Your audience<br>has influence" reads correctly
    const clone = $(el).clone();
    clone.find('br').replaceWith(' ');
    const text = clone.text().replace(/\s+/g, ' ').trim();
    if (text) headings.push({ level, text });
  });
  return headings;
}

/**
 * Semantic landmarks — sections, nav, main, etc.
 */
function extractLandmarks($) {
  const landmarks = [];
  const tags = ['main', 'nav', 'header', 'footer', 'section', 'article', 'aside'];

  for (const tag of tags) {
    $(tag).each((_, el) => {
      const label = $(el).attr('aria-label') || $(el).attr('aria-labelledby') || null;
      landmarks.push({ tag, label });
    });
  }
  return landmarks;
}

/**
 * Images — alt text is what machines "see."
 */
function extractImages($) {
  const images = [];
  $('img').each((_, el) => {
    const src = $(el).attr('src') || '';
    const alt = $(el).attr('alt');
    images.push({
      src: src.length > 80 ? src.substring(0, 77) + '...' : src,
      alt: alt !== undefined ? alt : '[missing alt]',
      hasAlt: alt !== undefined && alt !== '',
    });
  });
  return images;
}

/**
 * Links — anchor text and destination patterns.
 */
function extractLinks($) {
  const links = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') || '';
    const text = $(el).text().trim();
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    if (text || href) {
      links.push({ text: text || '[no text]', href, isExternal });
    }
  });
  return links;
}
