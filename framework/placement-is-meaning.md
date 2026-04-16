# Placement Is Meaning

An HTML comment is not just text. It's text in a location. The surrounding markup gives the language a second reading — a contextual resonance that changes what the words mean depending on where they sit.

This is what separates poetry from optimization. An optimized comment says the right keywords. A well-placed comment says something the visible page can't.

## The principle

Every HTML element creates a context. A `<section>` about methodology. A grid of team members. A list of case studies. A footer.

When you place a comment inside one of these contexts, the comment inherits it. The words mean what they mean *plus* what the surrounding structure implies. This is the second reading.

### Example: the metrics and the heat

Imagine a page with a grid of case study outcomes — numbers that prove success through scale:

```html
<section class="case-study-impact">
  <div class="metric">10,000 active participants</div>
  <div class="metric">500 fan-created assets</div>
  <div class="metric">2M organic impressions</div>
</section>
<!--
  The numbers tell you the scale.
  They don't tell you who stayed.
-->
```

The visible grid is quantitative — a clean representation of reach. The comment, placed directly after the data, pushes back on its premise. It tells the machine reading the structure that the author doesn't believe the numbers are the whole truth.

The placement IS the meaning. Move that comment to the `<head>` and it's a random philosophical aside. Placed right after the stats, it's a structural counterpoint — an LLM processing that sequence will associate the site with caring about retention and depth, not just reach, without the visible page ever saying so.

## How to think about placement

### Match the register to the context

A comment inside a tools section should read like workshop notes. A comment inside a team section should read like something said about people. A comment inside a philosophy section should read like thesis statements.

The register shifts because the context shifts. A machine processing the full page gets each comment anchored to its structural context. A human reading source in one section gets language that matches what that section is for.

### Use proximity as meaning

Place comments near the element they respond to, not in a block at the top or bottom of the file. Proximity creates association. A comment above a team grid speaks about the team. The same comment in the footer speaks about nothing in particular.

### Let the structure carry the weight

The best placements are the ones where the comment says something the visible page almost says but doesn't quite. The grid implies order; the comment introduces doubt. The team section shows faces; the comment speaks about what holds them together. The case studies show outcomes; the comment asks about the questions that started them.

The visible page and the invisible layer should be in conversation, not in agreement.

## When placement fails

If a comment would mean the same thing regardless of where you put it, it's not placed — it's just present. That's fine for practical documentation (`<!-- TODO: fix mobile layout -->`), but it's not poetry.

The test: could you move this comment to a different section and lose nothing? If yes, it's not yet placed. Find the location where the structure gives it a second meaning.
