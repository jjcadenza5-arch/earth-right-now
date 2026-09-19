# Immersive viewer fidelity

The target remains the mature ERN immersive behavior recovered from the later prototype screenshots, implemented on the Fresh one-player architecture.

The viewer:
- occupies the screen without sending the page back to Hero;
- keeps one media mount;
- keeps Close / Previous / Next / Source / Full screen immediately reachable;
- preserves story/place context without covering the media unnecessarily;
- uses black media letterboxing where source aspect ratio requires it;
- supports video, image and allowed iframe media through the shared playback lifecycle;
- restores focus to the visitor's opener without forced scrolling;
- never upgrades stale source wording merely because the viewer is open.

Mobile keeps the media large enough to remain the experience, while controls wrap below it instead of creating a second playback surface.
