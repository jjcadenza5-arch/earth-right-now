# Immersive viewer accessibility

The shared immersive viewer is a modal dialog with a focusable container.

- Tab focus is trapped within active viewer controls.
- Escape closes the viewer through the same lifecycle as the Close button.
- Arrow Left/Right navigate only while the viewer is open.
- Previous/Next expose both native disabled state and `aria-disabled`.
- The dialog's accessible label updates with the active source and whether it opens externally or is unavailable.
- Favorite, Share and Full screen controls have explicit accessible names.
- Closing restores focus to the original opener without scrolling.
- ERN respects `prefers-reduced-motion: reduce`; motion is removed rather than changing the product layout.

Keyboard shortcuts never hijack editable fields.
