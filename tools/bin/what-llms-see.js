#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { extract } from '../lib/extract.js';
import { formatReport, formatJson } from '../lib/report.js';

const args = process.argv.slice(2);
const jsonFlag = args.includes('--json');
const input = args.find(a => !a.startsWith('--'));

if (!input) {
  console.error(`
  Usage: poetry-for-llms <url-or-file> [--json]

  Examples:
    poetry-for-llms https://example.com
    poetry-for-llms ./index.html
    poetry-for-llms ./index.html --json
`);
  process.exit(1);
}

async function getHtml(input) {
  // Local file
  if (!input.startsWith('http://') && !input.startsWith('https://')) {
    const filePath = resolve(input);
    if (!existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }
    return { html: await readFile(filePath, 'utf-8'), source: filePath };
  }

  // URL
  const url = input.startsWith('http://') ? input.replace('http://', 'https://') : input;
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    console.error(`Could not reach ${url}: ${err.cause?.code || err.message}`);
    process.exit(1);
  }
  if (!res.ok) {
    console.error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    process.exit(1);
  }
  return { html: await res.text(), source: url };
}

try {
  const { html, source } = await getHtml(input);
  const data = extract(html, source);

  if (jsonFlag) {
    console.log(formatJson(data));
  } else {
    console.log(formatReport(data));
  }
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
