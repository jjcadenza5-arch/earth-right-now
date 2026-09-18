# Navigation without forced scroll

The last legacy navigation-state utilities that stored and restored raw page scroll positions have been removed.

Focused destinations use surface state + focus with `preventScroll`. Camera playback uses the shared immersive viewer/local interaction model.

This closes another route by which old ERN behavior could reintroduce the original "click a camera and jump back to Hero" problem.
