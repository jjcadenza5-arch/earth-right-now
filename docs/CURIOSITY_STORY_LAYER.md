# ERN Curiosity-First Story Layer

## Principle

**Do not push the answer. Create the question.**

ERN's storytelling layer exists to make a visitor curious enough to open a real window onto Earth. It is a strengthening layer over the existing product, not a redesign and not a replacement for Watch Earth, Search, Atlas, Guide, My Earth or truth/currentness systems.

## Product behavior

Use small questions and open loops around real current conditions:

- "What is happening here in full daylight?"
- "What is still moving here after dark?"
- "Where is the light changing right now?"
- "Who is already awake here at dawn?"
- "Where does Earth feel quiet right now?"

The live/current source is the answer. ERN should not over-explain the moment before the visitor sees it.

## Guardrails

- Truth labels always outrank storytelling.
- A PREVIEW never becomes current because the copy is evocative.
- A five-minute photogram remains LIVE IMAGE/current image, never LIVE VIDEO.
- Story copy must not claim an event, weather condition, crowd, wildlife sighting or visual detail that ERN has not verified.
- Curiosity may invite exploration but must not manufacture urgency.
- Do not use manipulative countdowns, fake scarcity, forced autoplay loops or clickbait claims.
- Preserve visitor choice: multiple high-quality windows remain preferable to one "correct" answer.
- Preserve stable navigation and existing playback architecture.

## Where it belongs

Good surfaces:
- Watch Earth set reason
- "Look now" viewer moment prompt
- ERN Guide prompts
- Surprise Earth / Keep Wandering
- lightweight place-story introductions

Avoid:
- source truth labels
- permission/health status
- legal attribution
- currentness evidence
- safety warnings
- commercial disclosure

## Implementation status — 2026-09-25

The first live implementation changes Watch Earth moment/set copy in `src/app-lite.js` from explanatory statements to short questions. Ranking, source selection, truth labels, playback behavior and layout are unchanged.

Future work should continue this direction incrementally, with non-regression tests guarding truth and navigation.
