# Phase M — Living Participation Intelligence

Phase M connects future visitor participation to ERN understanding without turning it into source truth.

## Allowed
- “Visitors recently reported raining.”
- “Two visitors marked themselves near this place.”
- “An approved temporary visitor photo is available.”
- “Visitor reports are not independently verified.”

## Prohibited inference
Visitor repetition or media must never become:
- verified weather;
- a verified crowd level;
- a verified event;
- proof a camera is live/current;
- source health or permission evidence;
- editorial ranking weight.

## Architecture
The first Phase M layer is pure and transport-independent:
1. filter participation to one canonical ERN place and current TTL;
2. hide reported/pending/expired media;
3. aggregate signals without upgrading their evidence status;
4. produce Guide/place summaries with mandatory unverified disclosure.

No live Guide Worker integration is enabled by this foundation.
