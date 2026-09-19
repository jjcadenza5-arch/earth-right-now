# Destination browser history

Destination drawers participate in browser history without scroll-based navigation.

- Opening a place uses history.pushState with #place=<durable-place-id>.
- Closing a place pushes the clean page URL.
- Back/Forward is handled by popstate and re-opens/closes the destination drawer to match the URL.
- Initial deep links use the same durable place model.
- Unknown or malformed place hashes fail closed.

The history handler uses a silent drawer render, so responding to Back/Forward does not write another history entry and cannot create a navigation loop.
