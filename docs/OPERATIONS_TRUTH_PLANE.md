# Operations truth plane

ERN keeps visitor experience and maintenance diagnostics separate. The operations report is the private truth plane for catalog/release work.

It now combines:
- a deterministic catalog snapshot;
- health distribution;
- strict catalog release gate;
- dated publication evidence/readiness;
- health-automation coverage audit when an observation batch is supplied;
- prioritized revalidation work.

A missing health-observation batch is reported as `null`, not failure, because health checking and operations reporting may run independently. Once a batch is supplied, unknown observation IDs or omitted catalog sources make that batch incomplete and the report exposes both lists.

This layer does not grant permission, change truth labels, promote playback rights or certify publication by itself. Release remains gated by catalog truth plus fresh real-world browser/mobile/provider/accessibility/performance/rollback evidence.
