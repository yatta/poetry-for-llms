# Learnings

Running record of what we've figured out building this. Updated as we go.

---

## April 14–15, 2026: The big revision pass

### What happened

The README and all framework docs went through multiple revision passes across three AI systems (Claude/Cowork, Gemini, ChatGPT). Each caught different things.

### Voice and register

- **The biggest AI tell is structural repetition.** Every pattern having a "Why it works:" heading, every section following the same cadence — that's what makes writing feel generated. Varying the rhythm matters more than any individual word choice.
- **"Structures you can steal"** was changed to **"Structures you can crib"** — Kenyatta's edit. "Crib" is warmer, less aggressive, and has the right connotation (borrowing with acknowledgment, not taking).
- **First person works in the README.** The shift from impersonal framework-voice to "I don't mean the visible page" / "And yes, I know how this sounds" made it read like a person wrote it. Framework docs stay more direct and structural — each file has its own register.
- **Honesty > polish.** The case study section admitting "EA1 is my company" and the operational section saying "It also might not" do more for credibility than any amount of careful framing.
- **Conference-talk register is the failure mode.** Lines that sound like conversations among systems-thinking friends at TED don't land for the broader audience this project needs to reach. "Trust that good work travels through networks" — true, but it's a vibe, not a claim. Caught this pattern across multiple files.

### Architecture and naming

- **Six audiences collapsed to three.** Machine reader, view-source human, ecosystem. The original six included "cost is negligible" (not an audience) and "AI collaborators" and "the industry" (overlapping). Cleaner taxonomy, same coverage.
- **"Non-Carbon Superfan" as a heading asked too much of a cold reader.** Replaced with "The Machine Reader" — superfan concept earned inside the paragraph instead of announced in the heading.
- **"Asymmetric Leverage" sounded like a pitch deck.** Killed the heading, kept the content as a closing paragraph. The insight (design for all three audiences because they want the same thing) is real. The label was grifter-ish.
- **CLI tool renamed from `what-llms-see` to `poetry-for-llms`.** Gemini caught the inconsistency between the tool name in the header and the npx command. Aligned everything to the package name.
- **`six-audiences.md` renamed to `the-audiences.md`.** Less literal, more inviting.

### Concepts that held up

- **The two-claims structure (aesthetic vs. operational).** ChatGPT suggested this. It's the most important structural decision in the README — it protects the project from collapsing "we wrote it with care" into "and therefore models will surface it," which is a falsifiable claim that might not hold.
- **Practice path / seeing path over Tactical / Abstract.** Gemini suggested the rename. We kept the originals because they carry EA1's specific orientation: practice first, seeing discovered through practice. "Abstract" sounds like the higher-order thing, which inverts the actual hierarchy.
- **SFPC as one-line lineage, not a section.** Taeyoon Choi's School for Poetic Computation is the direct intellectual ancestor. One sentence at the end of "Why poetry" — acknowledges the lineage without turning into a literature review.
- **Placement-is-meaning needs a different example than the README.** Gemini caught that using the map/territory example in both the README and the framework doc makes the project feel shallow. New anchor example: metrics grid with "The numbers tell you the scale. They don't tell you who stayed."

### What different AI systems caught

- **ChatGPT** was strongest on structural analysis: the two-claims distinction, defining the adversary, specifying failure modes, the epistemic modesty of "shape the material available to compress." Thinks in frameworks.
- **Gemini** was strongest on implementation details: CLI naming inconsistency, the need for a new anchor example in placement-is-meaning, tightening prose rhythm, the fragility/ephemerality of the two-path structure across different crawlers. Thinks in builds.
- **Claude/Cowork** was strongest on voice calibration and vault integration: catching conference-talk register, defending "poetry" rather than replacing it, the SFPC lineage connection, pushing back on changes that would lose EA1's specific orientation. Thinks in relationships between documents.

### Open questions

- Does the CLI tool actually work well? Untested this session. Handoff doc written for Claude Code.
- What would a second (non-EA1) case study look like? Need a guinea pig.
- Can we run Gemini's "Mirror Test" — structured queries against ea1.co to document what the comments and schema contribute to LLM responses?
- The patterns file tells developers what to do. What do we tell the strategist who reads the README and needs to brief a dev team?
