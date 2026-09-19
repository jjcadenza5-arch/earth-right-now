# Focus model

ERN avoids scroll-based navigation. Focus changes use preventScroll where supported.

The immersive viewer traps Tab/Shift+Tab among visible enabled controls. If focus somehow enters the viewer on a non-control element, the next Tab moves to the first/last valid control rather than escaping the modal.

Closing the viewer restores the invoking control without scrolling. Focused surfaces and destination history remain independent of page scroll position.

Reduced-motion detection fails safely on browsers without matchMedia.
