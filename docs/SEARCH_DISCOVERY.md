# Search & Discovery

Search is multilingual-friendly and accent-insensitive where the browser supports Unicode normalization.

Searchable fields:
- destination/source title
- region/country
- provider
- categories/families
- story
- aliases

Search never changes source truth. Results still pass through the same health/permission/playback policy when opened.

## Destination retrieval layer

Curated multilingual place aliases live in `data/place-search-aliases.json` and are loaded only after a visitor starts a search. This preserves the first-load performance budget while allowing local scripts, transliterations and common alternate names to resolve to the same destination.

Crawlable destination pages merge those aliases into visible “Also known as” text and structured `alternateName` data. Related destination links are also exposed in visible HTML and structured data.

Retrieval aliases are discovery metadata only. They never change health, currentness, permission, playback proof, source ranking or commercial treatment.
