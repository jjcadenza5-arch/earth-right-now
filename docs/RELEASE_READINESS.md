# Release readiness

ERN separates **catalog readiness** from **production readiness**.

Catalog readiness is machine-checkable: valid promoted records, current healthy inventory, and current inside-ERN playback.

Production readiness additionally requires evidence for:
- desktop browser behavior;
- mobile behavior;
- real provider playback/iframe behavior;
- accessibility/keyboard behavior;
- performance;
- rollback readiness.

The repository must never mark these integration checks complete merely because static code inspection looks correct. They become true only after the corresponding browser/device/deployment check is actually performed.

This prevents a green catalog from being mistaken for permission to publish.
