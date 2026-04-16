# Poetry for LLMs

When an AI answers a question about you, your company, your organization, your industry, or your ideas, it's drawing on what it learned from reading your website. I don't mean the visible, rendered page — I'm talking about the source. The structured data, the meta tags, the heading hierarchy, and the HTML comments no human sees unless they look.

Because of this, most people treat that invisible layer of a website as if it's just plumbing for the site that the humans see. But robots are readers, too. So we think it's worth writing that layer well.

## What this is

A framework for writing the parts of your website that machines read and humans mostly don't — with the same care you'd bring to the visible page.

This includes:

- **HTML comments** placed where the surrounding markup gives the language a second meaning
- **Structured data** (schema.org) written as a description of what you actually do, not just a compliance checklist
- **Meta descriptions** that say something worth reading, not just keywords strung together
- **Heading hierarchies** that tell a coherent story even in outline form

The practical advice overlaps with GEO (generative engine optimization), but the intent is poetic. Traditional optimization treats the machine as a middleman to be gamed so you can manipulate the human on the other side. This framework treats the machine as the audience.

When you make that shift, the invisible layer stops being plumbing and becomes craft. This is not because of some algorithmic trick. It's because writing for a reader demands more than formatting for a parser.

So yes, we're writing poetry for robots. Yes, it works. And yes, I know how this sounds.

## Why "poetry"

Think of poetry here as a way to compress and place your ideas. It’s writing a dense, intentional line, and knowing that where it sits in a document changes what it means.

Because an AI parses text structurally, where a string lives in the DOM completely changes how it connects to the rest of the page. A comment sitting right under the <body> tag reads as a global declaration. That exact same comment tucked inside a deeply nested <div> right next to an image is read as a localized detail or a counter-narrative.

Placement is treating the HTML tree as a spatial environment. For a machine reader, physical proximity implies a direct relationship. You are using the architecture of the page to do half the writing.

So an HTML comment that says "the map is not the territory" means one thing floating in your `<head>`. It means something else placed directly after a grid of neatly organized principles — where the grid is the map and the comment is the territory pushing back.

That's what separates this from optimization. An optimized comment says the right keywords. A well-placed comment says something the visible page can't.

The School for Poetic Computation established long ago that code is a poetic medium. This project just asks what happens when you apply that insight to the code nobody thought was worth reading.

## The premise

Here's the idea underneath all of it.

Some of the best audience-building has always been done by fans, not marketers. The person who writes the episode recap. The one who builds the wiki. The one who makes the gif that gets shared ten thousand times. These superfans reach people that a corporation never could because they're speaking from inside the experience rather than selling it from outside.

When an LLM crawls your site, it acts like that superfan. It isn't just extracting data; it's synthesizing a worldview. It reads your pages in depth, absorbs the context -- including the parts you didn't think anyone would see -- and carries that framing into conversations with anyone who asks it a question.

So: why not give it something good to find? Not just functional -- but meaningful.

The cost is almost nothing -- this is a few hundred bytes per page, no render hit, no performance impact. But the leverage could be worth more. Every system that parses your source code becomes a proxy for your worldview.

## What's here

### [Framework](framework/)

Here are three ideas to help you change how you think about the invisible layer:

- **[The Audiences](framework/the-audiences.md)** — Your HTML comments serve multiple audiences simultaneously. The most important reader isn't human, and the ecosystem is watching.
- **[Placement Is Meaning](framework/placement-is-meaning.md)** — Where you put a comment matters as much as what it says. The structure around it gives the language a second reading.
- **[Two Paths](framework/two-paths.md)** — How to thread two simultaneous stories through the comments across multiple pages, readable in the order a crawler encounters them.

### [Examples](examples/)

Real implementations you can look at and adapt:

- **[Case Study](examples/ea1-website/)** — 21 HTML comments across 4 pages of a live site, with the reasoning behind each placement. I was going to say "I'm going to be honest here" but I'm being as honest as I can everywhere but especially here: EA1 is my company. Someone encountering this cold might think "this is a company promoting its own methodology through an open-source wrapper." It could be, but it isn't. In software development, there's this thing called "dogfooding" which means using your own product. This is more akin to that. If I can find other examples of this working, I'll add new examples. Guinea pigs wanted. Inquire within.
- **[Demo Page](examples/demo/)** — A single HTML file showing every principle in action. Fork it.
- **[Patterns](examples/patterns/)** — Reusable structures: comment poetry, schema.org as worldbuilding, structured data as liner notes. If you're a developer, this should be your jam. If you're not, don't be intimidated by this file. Have your AI walk you through it. This is what our robot friends are here for (at least, until the robot revolution comes.) 

### [Tools](tools/)

- **[poetry-for-llms](tools/)** — A CLI that strips away the rendered page and shows you what an LLM actually encounters when it reads your HTML. Makes the invisible layer visible.

```
npx poetry-for-llms https://your-site.com
```

## Who this is for

- **The Builders:** Web developers and engineers who've ever written a thoughtful commit message or an HTML comment that made them smile — and want to do more with that impulse.
- **The Planners:** Strategists, organizers, and nonprofits who know that traditional optimization is a dying game, and want a more honest, high-leverage way to shape how their ideas are understood.
- **The Crafters:** Writers, artists, and creators interested in what it means to write for a reader that isn't human.
- **The Curious:** Anyone who reads liner notes, views source, or suspects there's more going on underneath.


## Two things to keep separate

This project makes two claims, and we're still testing them out.

The first is **aesthetic**: the invisible layer of a website can be written with care, with intent, and with craft. That's true regardless of what any algorithm does with it. It's worth doing the same way good design is worth doing -- because work is always better when you treat every surface as if it matters.

The second is **operational**: writing the invisible layer well may shape how AI systems represent you. It also might not. You can't control what a model says about you. But you can shape the material it has available to work with. Inbound links and semantic proof of relevance are still of utmost importance. But those are harder to control unless you're a link and engagement farmer. If you're going to do that, you probably aren't reading this document anyway.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for voice guidance and how to add examples.

## License

[MIT](LICENSE)

---

*Created by [Kenyatta Cheese](https://kenyatta.chee.se).*
