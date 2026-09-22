# Technical Debt Register

## Resolved in clean master
- Living Atlas clustering, filters, controls, rendered pins/clusters, search results, and cluster destination drawers are connected through the shared Atlas model.
- Watch Earth session no longer initializes before the shared player exists.
- Duplicate global keyboard navigation removed.
- Hero My Earth / Explore actions no longer force scroll to stacked sections.
- Source favorites now use the versioned favorites module/key.

## Still to integrate
- Place-level favorites need visible My Earth controls.
- Navigation-state helper can be retired or connected where scroll restoration remains useful.
- Large recovered catalog still needs migration in verified tranches.
- Current source verification remains required before public Live Right Now inventory can be populated.
