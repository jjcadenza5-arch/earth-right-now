# Safe Rendering Migration

Catalog-facing cards are migrating from HTML-string interpolation to DOM text construction.

Completed:
- source card view;
- destination card view.

Remaining:
- place-memory card;
- window tile;
- any future partner/business editorial surface.

This is a release gate because recovered/provider text and future submissions must never be interpreted as markup.
