# Watch Earth lifecycle

Watch Earth now builds its session only from sources that remain actionable under the canonical playback policy.

The session also has an explicit destroy lifecycle that stops its timer and clears its source list. This makes the curated journey safe for future catalog hot-reloads and route teardown.

External current sources may still appear in Watch Earth when deliberately curated, but their action remains an honest provider handoff rather than a fake in-ERN player.
