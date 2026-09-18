# Catalog Content Rendering

Recovered and partner-submitted catalog strings are data, not trusted HTML.

Rules:
- titles, stories, regions, countries, providers and badges should be rendered as text;
- URLs pass URL-safety checks before external navigation;
- future business submissions never enter public catalog automatically;
- rich editorial HTML, if ever supported, requires a separate sanitization pipeline.

The current legacy card templates still interpolate catalog text and are tracked for migration to safe DOM construction before public release.
