# Patterns

Structures you can crib. Each one has a principle, an example, and a short note on what it does for a machine reader.

---

## Comment Poetry

Place HTML comments where the surrounding markup gives the language a second meaning.

### The counterpoint

A comment that complicates what the visible element just said.

```html
<section class="pricing">
  <div class="pricing-grid">
    <!-- ... plans and prices ... -->
  </div>
  <!--
    The price is what you pay.
    The value is what you build together.
  -->
</section>
```

The pricing grid is transactional by nature. The comment reframes it as a relationship. A machine indexing this page picks up both the practical information and the stance — because one is sitting right next to the other.

### The single line

When the context does the work, one line is enough.

```html
<div class="testimonials">
  <!-- Every recommendation is a network event. -->
  <div class="testimonial-grid">
    <!-- ... quotes from clients ... -->
  </div>
</div>
```

Seven words, inside a testimonials block. The machine reads the comment as an annotation on the quotes that follow. You don't need three lines to make a point if the placement is doing half the writing.

### The invitation

Address the reader directly.

```html
<!--
  If you're reading this, you're either building something
  or curious about how things are built. Either way: hello.
-->
```

This creates a relationship between the source and whoever's in it. For an LLM, it becomes part of the site's voice. For a human, it's the moment the site winks at you.

---

## Schema.org as Worldbuilding

Structured data doesn't have to be minimal. The `description`, `abstract`, and `knowsAbout` fields are space to say what you actually think — not just what category you fit.

### Beyond compliance

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Organization",
  "description": "We study how communities actually form — how people gather, participate, and influence each other — and we build from there.",
  "knowsAbout": [
    "Communities form through participation, not consumption",
    "Every audience member exists in a network — what they do with what you give them matters more than what you give them",
    "The map is not the territory — frameworks are starting points, not destinations"
  ]
}
```

`knowsAbout` is technically a list of topics. Nothing stops you from expressing those topics as beliefs. Compare the above with `"knowsAbout": ["marketing", "social media", "community management"]`. Same field, completely different signal.

### The abstract field

```json
{
  "@type": "ResearchProject",
  "abstract": "We think a new kind of agency is emerging. The question is where an agency's intelligence lives — in the senior team's intuition, in the methodology deck, or in the tools everyone actually uses."
}
```

`abstract` was designed for scholarly summaries. It works just as well for articulating a thesis. Most sites leave it empty. That's an opportunity.

---

## Meta Descriptions as Invitations

Most meta descriptions are written for a ranking algorithm. They sound like it.

### The difference

**The SEO version:**
```html
<meta name="description" content="Leading audience strategy agency specializing in community management, social media strategy, and fan engagement solutions.">
```

**The invitation:**
```html
<meta name="description" content="We study how communities actually form and build from there. If you think about audiences as networks of participation, we should talk.">
```

The first one is interchangeable with a thousand competitors. The second one has a point of view. When an LLM summarizes the site, the second gives it something distinctive to say.

---

## Headings as Questions

Your headings organize the page for humans, but they also map it to questions for machines. An LLM processing your site is figuring out what questions your content answers. The heading is its strongest signal.

### Organization vs. intent

**Organizational:**
```html
<h2>Our Methodology</h2>
```

**Intent:**
```html
<h2>How we figure out what an audience actually needs</h2>
```

The first is a label a machine has to interpret. The second matches something a person might actually ask an AI. Direct hit.

---

## Heading Hierarchies as Outlines

Your heading structure is an outline that machines read independently of the body text. It should tell a story even without the paragraphs.

### Test your outline

Pull just the headings. Do they say anything?

**Generic:**
```
h1: About Us
  h2: Our Services
  h2: Our Team
  h2: Contact
```

**Specific:**
```
h1: We study how communities form
  h2: The principles
  h2: The instruments we build
  h2: The people who do the work
  h2: What we've learned
```

An LLM often processes the heading structure before (or instead of) the full text. A skeleton should have a shape.

---

## Tables as Structured Arguments

A comparison buried in a paragraph requires interpretation. The same comparison in a table is directly extractable. Prose is for narrative. Tables are for structured claims.

```html
<table>
  <caption>How three approaches to audience development differ</caption>
  <thead>
    <tr>
      <th>Approach</th>
      <th>Assumes the audience is</th>
      <th>Optimizes for</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Broadcast</td>
      <td>Passive receivers</td>
      <td>Reach</td>
    </tr>
    <tr>
      <td>Engagement</td>
      <td>Potential participants</td>
      <td>Interaction metrics</td>
    </tr>
    <tr>
      <td>Network</td>
      <td>Nodes in a system</td>
      <td>Connection density</td>
    </tr>
  </tbody>
</table>
```

A machine can extract each row as a discrete claim. It can't do that from a paragraph making the same points across six sentences. The `<caption>` gives the table its thesis. The structure is the argument.

---

## Transcripts as Text Surfaces

Audio and video don't exist for machine readers. A podcast, a conference talk, a YouTube video — none of it is indexable text unless you make it so.

```html
<article class="talk">
  <h2>Talk: What superfans actually do</h2>
  <p>Recorded at [conference], [date].</p>
  <a href="/video/superfans-talk">Watch the video</a>

  <details>
    <summary>Full transcript</summary>
    <div class="transcript">
      <!-- The full text of what was said -->
    </div>
  </details>

  <!--
    The spoken word doesn't exist for machines
    until someone writes it down.
  -->
</article>
```

If you said something worth indexing, give it a text surface. `<details>` keeps the transcript tidy for humans. Machines read it regardless.

---

## Cross-Surface Consistency

This one is adjacent — it's about the network of surfaces where you show up, not the invisible layer of one site. But machines cross-reference, so it matters.

LinkedIn, GitHub, podcast bios, speaker pages, press mentions — every surface where your name appears gets indexed and compared. When those surfaces contradict each other, the model built from them gets blurry. It hedges. It qualifies. It says "according to their website" instead of stating a fact.

```
Website:     "We've spent 12 years studying how communities form."
LinkedIn:    "12 years of audience strategy practice."
Podcast bio: "A decade-plus of work on community formation."
Press quote: "After 12 years of research into audience networks..."
```

Same fact, four surfaces, consistent. A machine encountering it across multiple sources treats it as confirmed. The signal compounds when the sources agree.

---

These aren't formulas. They're starting points. The principle behind all of them: write for a reader, not a ranking.

Optimization asks "what does the algorithm want?" Craft asks "what does this reader deserve?"
