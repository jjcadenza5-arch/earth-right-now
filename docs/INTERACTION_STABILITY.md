# Interaction stability

ERN's mature interaction model avoids navigation side effects.

- Viewer arrow keys operate only while the immersive viewer is open.
- Escape closes the viewer only when the viewer is open; editable fields retain their own Escape-to-blur behavior.
- Global shortcuts install through a removable listener and become a no-op outside browser contexts.
- Focus moves with preventScroll where ERN explicitly restores/open-focuses controls.
- Surface manager changes focused product surfaces without scrollIntoView or scrollTo.
- Atlas pins are explicit buttons with accessible names.
- Repeated viewer open/close remains idempotent and media teardown is centralized.

This preserves the key prototype lesson: choosing a camera must not unexpectedly throw the visitor back to the Hero.
