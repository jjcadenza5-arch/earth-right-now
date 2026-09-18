# Offline Strategy

ERN is a live/current-condition product, so offline behavior must not fake freshness.

Safe to retain locally:
- application shell;
- static styles/scripts;
- favorites;
- recent-history IDs;
- preferences.

Catalog should prefer network/current data. Third-party live media follows provider caching rules and is never presented as current merely because a browser cached it.
