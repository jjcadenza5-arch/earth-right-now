# Living Atlas Map Architecture

Current foundation uses provider-independent geographic coordinates and projection helpers.

This deliberately separates:
- ERN place/source data;
- map projection and viewport logic;
- the eventual visual map provider.

A future map library/provider can replace the schematic rendering without changing source truth, destination grouping or playback. Pins always open through the shared player.
