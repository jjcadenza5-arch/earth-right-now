# Technical Debt Register

## Resolved in clean master
- Unused legacy navigation-state helper retired; current navigation uses surface-manager, viewer context/lifecycle, dialog lifecycle and navigation-sync paths.
- Place-level favorites are visible and removable in My Earth, with save/remove controls also available from place drawers.
- Living Atlas clustering, filters, controls, rendered pins/clusters, search results, and cluster destination drawers are connected through the shared Atlas model.
- Watch Earth session no longer initializes before the shared player exists.
- Duplicate global keyboard navigation removed.
- Hero My Earth / Explore actions no longer force scroll to stacked sections.
- Source favorites now use the versioned favorites module/key.

## Still to integrate
- Historical recovery is now ledgered and prioritized; 10 candidates remain pending fresh source/permission revalidation before any migration.
- Current source/provider verification remains an operational evidence task; automation may prioritize and record evidence but must not fabricate playback verification.
