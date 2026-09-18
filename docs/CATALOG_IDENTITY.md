# Catalog identity

Source IDs are runtime identity. Duplicate IDs are therefore rejected by the catalog guard instead of silently allowing a later row to overwrite an earlier Map entry.

Additional truth/playback invariants now enforced:
- EXTERNAL_LIVE must use EXTERNAL playback;
- PREVIEW must use PREVIEW playback;
- coordinates, when supplied, must be finite and in range.

This becomes increasingly important as the recovered catalog grows from tens to hundreds of candidate records.
