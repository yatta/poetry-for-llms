/**
 * Format extracted data as a human-readable report.
 */
export function formatReport(data) {
  const lines = [];
  const hr = '─'.repeat(60);

  lines.push('');
  lines.push(`  poetry-for-llms`);
  lines.push(`  ${data.source}`);
  lines.push(`  ${hr}`);

  // Comments — split by kind
  const authored = data.comments.filter(c => c.kind === 'authored');
  const structural = data.comments.filter(c => c.kind !== 'authored');

  if (authored.length) {
    lines.push('');
    lines.push(`  HTML COMMENTS — ${authored.length} authored, ${structural.length} structural (${data.comments.length} total)`);
    lines.push(`  ${hr}`);
    for (const c of authored) {
      lines.push('');
      lines.push(`  line ${c.line}:`);
      for (const line of c.text.split('\n')) {
        lines.push(`    ${line.trim()}`);
      }
    }
  } else {
    lines.push('');
    lines.push(`  HTML COMMENTS (${structural.length} structural)`);
    lines.push(`  ${hr}`);
    lines.push('');
    lines.push('  This page has nothing to say to its machine readers.');
    lines.push('  That\'s the gap this project is about.');
  }

  if (structural.length) {
    lines.push('');
    lines.push(`  STRUCTURAL COMMENTS (${structural.length})`);
    lines.push(`  ${hr}`);
    for (const c of structural) {
      lines.push(`  line ${c.line}: ${c.text.replace(/\s+/g, ' ').substring(0, 60)}`);
    }
  }

  // Structured Data
  lines.push('');
  lines.push(`  STRUCTURED DATA (${data.structuredData.length} block${data.structuredData.length !== 1 ? 's' : ''})`);
  lines.push(`  ${hr}`);
  if (data.structuredData.length) {
    for (const block of data.structuredData) {
      lines.push('');
      lines.push(indent(JSON.stringify(block, null, 2), 4));
    }
  } else {
    lines.push('  (none)');
  }

  // Meta
  lines.push('');
  lines.push('  META TAGS');
  lines.push(`  ${hr}`);
  if (data.meta.title) lines.push(`  title: ${data.meta.title}`);
  if (data.meta.description) lines.push(`  description: ${data.meta.description}`);
  if (data.meta.robots) lines.push(`  robots: ${data.meta.robots}`);
  if (data.meta.author) lines.push(`  author: ${data.meta.author}`);
  if (data.meta.openGraph) {
    lines.push('  open graph:');
    for (const [k, v] of Object.entries(data.meta.openGraph)) {
      lines.push(`    og:${k}: ${v}`);
    }
  }
  if (data.meta.twitter) {
    lines.push('  twitter:');
    for (const [k, v] of Object.entries(data.meta.twitter)) {
      lines.push(`    twitter:${k}: ${v}`);
    }
  }

  // Heading hierarchy
  lines.push('');
  lines.push(`  HEADING HIERARCHY (${data.headings.length})`);
  lines.push(`  ${hr}`);
  if (data.headings.length) {
    for (const h of data.headings) {
      const prefix = '  '.repeat(h.level - 1);
      lines.push(`  ${prefix}h${h.level}: ${h.text}`);
    }
  } else {
    lines.push('  (none)');
  }

  // Landmarks
  lines.push('');
  lines.push(`  SEMANTIC LANDMARKS (${data.landmarks.length})`);
  lines.push(`  ${hr}`);
  if (data.landmarks.length) {
    for (const l of data.landmarks) {
      const label = l.label ? ` [${l.label}]` : '';
      lines.push(`  <${l.tag}>${label}`);
    }
  } else {
    lines.push('  (none)');
  }

  // Images
  if (data.images.length) {
    const withAlt = data.images.filter(i => i.hasAlt).length;
    lines.push('');
    lines.push(`  IMAGES (${data.images.length}, ${withAlt} with alt text)`);
    lines.push(`  ${hr}`);
    for (const img of data.images) {
      lines.push(`  ${img.alt} → ${img.src}`);
    }
  }

  // Summary
  lines.push('');
  lines.push(`  ${hr}`);
  lines.push(`  SUMMARY`);
  lines.push(`  ${hr}`);
  lines.push(`  Comments:        ${authored.length} authored, ${structural.length} structural`);
  lines.push(`  Structured data: ${data.structuredData.length} block${data.structuredData.length !== 1 ? 's' : ''}`);
  lines.push(`  Meta tags:       ${Object.keys(data.meta).length}`);
  lines.push(`  Headings:        ${data.headings.length}`);
  lines.push(`  Landmarks:       ${data.landmarks.length}`);
  lines.push(`  Images:          ${data.images.length} (${data.images.filter(i => i.hasAlt).length} with alt)`);
  lines.push(`  Links:           ${data.links.length} (${data.links.filter(l => l.isExternal).length} external)`);
  lines.push('');

  const totalInvisible = authored.length + data.structuredData.length;
  if (totalInvisible === 0) {
    lines.push('  This page is silent to its machine readers.');
    lines.push('  The invisible layer is empty.');
  } else if (authored.length > 0 && data.structuredData.length > 0) {
    lines.push('  This page speaks to its machine readers.');
  } else if (authored.length > 0) {
    lines.push('  This page speaks to its machine readers.');
  } else if (data.structuredData.length > 0) {
    lines.push('  This page has structured data but no comments.');
    lines.push('  The machine knows what it is. Not what it thinks.');
  }

  lines.push('');
  return lines.join('\n');
}

/**
 * Format as JSON.
 */
export function formatJson(data) {
  return JSON.stringify(data, null, 2);
}

/**
 * Indent a multi-line string.
 */
function indent(str, spaces) {
  const pad = ' '.repeat(spaces);
  return str.split('\n').map(line => pad + line).join('\n');
}
