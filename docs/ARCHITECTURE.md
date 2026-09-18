# ERN Architecture

## Target
**One Hero, one live engine, one Explore system.**

### Layers
1. Earth Catalog — places, coordinates, categories, aliases, stories.
2. Source Registry — provider, truth, permission, health, freshness, quality, attribution.
3. Selection Engine — filters/ranks sources for context.
4. Playback Controller — one state machine; embed/image/external/preview adapters.
5. Experience Surfaces — Hero, Watch Earth, Explore, Living Atlas, Beautiful Moments, My Earth, ERN AI.
6. Travel Bridge — nearby stays, food, transport, tickets/affiliate opportunities.

### Playback rule
Surfaces request playback with a source ID. The controller opens in the visitor's current context (inline/local or immersive). It must not scroll the document to Hero.

### Recovery rule
Recovered ERN HTML is specification/evidence. Extract data and behavior deliberately; do not import its accumulated duplicate player generations wholesale.
