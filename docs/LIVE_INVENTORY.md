# Live Inventory

Live Right Now is stricter than the Living Atlas.

A source enters the public live inventory only when:
- its truth type is current/live-capable;
- operational health is HEALTHY;
- its check is CURRENT_CHECK;
- permission is known.

If no source passes, ERN says it is rechecking live windows. It does not fill the gap with stale recovered cameras or prerecorded media.
