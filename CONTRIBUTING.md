# Contributing

## Voice

The writing in this repo follows a specific register: compressed, direct, under-explained. Sentences end rather than trail. Questions are asked but not answered. The language trusts the reader to meet it halfway.

If you're adding text, resist the urge to explain what's already clear from context. If a sentence feels complete, it probably is. If you'd add "in other words" — don't.

## Adding examples

Every comment in an example must trace to a source — a principle, a documented practice, a specific observation. No freeform copy. The curation is the point. If you want to add a new example:

1. Describe the site and what it does
2. Show every comment with its location and placement rationale
3. Explain what source text each comment traces to
4. Open a PR with the example in `examples/`

## Adding patterns

Patterns in `examples/patterns/` follow a structure:

- **The pattern name** — what it is, in a few words
- **An example** — real HTML showing the pattern in use
- **"Why it works"** — one paragraph on why a machine reader benefits from this

Keep patterns concrete. If you can't show it in HTML, it's not a pattern yet.

## The tool

PRs to `tools/` are welcome. Priorities:

- Keep dependencies minimal (currently just cheerio)
- Output should be readable by a human at a terminal, not just parseable by a script
- New extractors should surface things machines read that humans don't see

## What not to add

- Framework-specific examples (React, Vue, Next.js) — keep it HTML-native
- "Awesome list" collections of links — this is a single coherent project
- Optimization tips framed as gaming strategies — the whole point is the reframe

## License

Contributions are MIT-licensed.
