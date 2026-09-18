# Viewer State

The immersive viewer reflects PlaybackController state; it does not maintain a second navigation history.

Source action capability decides whether the viewer is entered at all:
- in-app PLAY enters viewer;
- EXTERNAL opens provider directly;
- UNAVAILABLE remains disabled/graceful.

This prevents the old failure mode where an external-only source opened a blank or misleading ERN player.
