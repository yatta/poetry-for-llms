# poetry-for-llms

A CLI tool that shows you what a machine reader encounters when it reads your page — vs. what a human sees in a browser.

Most of the web is invisible to humans. HTML comments, structured data, meta tags, heading hierarchies, aria labels, alt text. Browsers skip or hide most of it. Machines read all of it.

This tool makes the invisible layer visible.

## Usage

```bash
# Analyze a URL
npx poetry-for-llms https://your-site.com

# Analyze a local file
npx poetry-for-llms ./path/to/page.html

# JSON output
npx poetry-for-llms https://your-site.com --json
```

## What it extracts

- **HTML comments** — everything inside `<!-- -->`
- **Structured data** — `<script type="application/ld+json">` blocks, parsed and formatted
- **Meta tags** — title, description, Open Graph, Twitter cards, robots directives
- **Heading hierarchy** — the outline an LLM sees when it processes your page structure
- **Semantic landmarks** — `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>` with their aria labels
- **Image alt text** — what machines "see" instead of images
- **Link structure** — internal vs. external, anchor text patterns

## Output

The default output is a readable report showing what a machine reader encounters, organized by category. Use `--json` for structured output you can process programmatically.

## Why this exists

The gap between what machines see and what humans see is the space where this practice lives. Most people leave it empty. This tool shows you how empty (or how full) that space is on any given page.
