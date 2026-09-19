# Viewer lifecycle

The immersive viewer has one close path.

Closing, whether initiated by the Close button or by a programmatic player close, must:
1. pause Watch Earth when appropriate;
2. run adapter/session cleanup;
3. destroy remaining media in the shared mount;
4. hide the viewer;
5. update viewer-open state;
6. restore focus to the invoking control without scrolling.

A re-entry guard prevents close recursion. This removes the old split where the button cleaned media but a programmatic player.close() only changed controller state.
