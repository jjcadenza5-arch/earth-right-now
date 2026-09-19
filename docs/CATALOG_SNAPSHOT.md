# Catalog snapshot

ERN distinguishes raw catalog size from useful current inventory.

The catalog snapshot reports:
- total source records;
- destination/place count;
- health distribution;
- strict-current inventory;
- legal inside-ERN playback inventory;
- strict-current inside-ERN playback;
- external-only inventory;
- truth, permission and playback distributions.

This prevents a large recovered catalog from being mistaken for a large live network. ERN should grow the underlying atlas freely, but the visitor-facing current network is measured separately and conservatively.
