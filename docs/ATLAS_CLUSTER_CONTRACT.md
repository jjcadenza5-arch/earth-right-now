# Atlas cluster contract

The Atlas model and renderer now share one cluster shape:

`{ id, sources, lat, lon, count }`

An older cluster helper returned `items` while the renderer expected `sources`. That mismatch could make valid map clusters disappear even though catalog coordinates were correct.

Atlas also reports mapped and unmapped source counts explicitly. Sources without coordinates remain available in Atlas search/results; they simply do not create fake map pins.
