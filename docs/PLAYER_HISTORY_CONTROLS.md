# Viewer previous / next

Viewer navigation controls now reflect the actual history cursor.

Previously both Previous and Next became enabled whenever history contained more than one source. At the beginning or end of history this could display a clickable-looking control that had nowhere to go.

Rules:
- Previous is enabled only when cursor > 0.
- Next is enabled only when cursor is before the last history item.
- Source handoff remains within the single shared PlaybackController.
