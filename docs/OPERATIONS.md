# ERN Operations

ERN needs an operational layer in addition to the visitor experience.

Operations report:
- catalog totals;
- place totals;
- truth/health/permission/playback distributions;
- primary vs Atlas inventory;
- prioritized revalidation queue.

This is intentionally separate from the public UI. It helps maintain a large living network without exposing maintenance noise to visitors.


## Live-now Watch Earth coverage

The deterministic `watch-earth:audit` remains a regression tool anchored to catalog evidence time. It must not be read as proof that the catalog is current at the moment an operator looks at it.

`npm run watch-earth:now` is the separate operational view. It evaluates Watch Earth against the actual current clock, reports current journey count/shortfall, geographic/provider breadth and the amount of stale or expired catalog evidence. It is report-only and does not refresh timestamps or turn HTTP reachability into playback/currentness proof.
