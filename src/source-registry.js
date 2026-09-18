import { PlaybackController } from "./playback-controller.js";

export async function loadRegistry(url = "./data/sources.json") {
  const response = await fetch(url, { cache:"no-store" });
  if (!response.ok) throw new Error(`ERN source registry failed: ${response.status}`);
  const rows = await response.json();
  return new Map(rows.map(row => [row.id, Object.freeze(row)]));
}

export function rankedSources(registry, predicate = () => true) {
  return [...registry.values()].filter(predicate).sort((a,b) => {
    const score = x => (x.quality || 0) * .55 + (x.freshness || 0) * .30 + (x.moment || 0) * .15;
    return score(b) - score(a);
  });
}

export function createERNPlayback(registry, onStateChange) {
  return new PlaybackController({ registry, onStateChange });
}
