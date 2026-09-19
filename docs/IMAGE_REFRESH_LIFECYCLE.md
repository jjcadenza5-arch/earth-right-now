# Refreshed-image lifecycle

Refreshed camera images use the shared player lifecycle and now avoid unnecessary network churn when ERN is backgrounded.

- refresh intervals have a 15-second safety floor;
- interval ticks do not fetch a new frame while the document is hidden;
- returning to a visible tab triggers one fresh frame immediately;
- player cleanup clears the timer and removes the visibility listener;
- source/catalog health is not mutated from a client image-load event.

A failed frame is a local playback failure, not proof that a provider is globally offline.
