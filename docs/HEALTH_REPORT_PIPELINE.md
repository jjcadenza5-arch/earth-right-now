# Automated health reporting

ERN health automation begins in **report-only** mode.

A checker may submit observations such as page reachability, provider/media confirmation and definitive provider failure. The shared health transition model converts those observations into proposed health changes.

The report does **not** mutate `data/sources.json`, and automation can never change:
- truth type;
- permission;
- rights basis;
- playback mode.

HTTP 200 alone cannot produce HEALTHY. HEALTHY requires current media/provider confirmation. Ambiguous failures become DEGRADED; definitive provider-confirmed failures may become OFFLINE; inconclusive checks remain UNKNOWN.

Human/source-specific review remains required before public catalog mutation while provider adapters are still being developed.
