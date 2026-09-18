# Playback adapter hardening

Playback adapters now validate every media/provider URL before assigning it to an iframe, image or link.

The adapter layer also no longer uses `innerHTML` for status panels. Provider/source text remains data.

Invalid embed/image URLs fall through to the truthful unavailable state rather than creating a broken or unsafe media element.
