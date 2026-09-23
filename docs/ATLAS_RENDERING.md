# Atlas Rendering

Atlas rendering consumes clusters produced by the Atlas model.

- One source becomes a normal pin.
- Nearby sources may become a count cluster.
- Cluster selection reveals its member windows rather than guessing which one the visitor wanted.
- A single source opens through PlaybackController.
- Projection/rendering remains replaceable by a future map provider.


Coordinate precision is part of Atlas truth. When a source carries `coordinateBasis`, a single-source pin exposes whether it is an exact camera position, a place reference point, or a regional reference point. Place/region reference pins explicitly state that they may not be the exact camera position; legacy pins remain neutral rather than gaining invented precision.
