/**
 * ERN shared playback controller.
 * Every surface asks this controller to play a source; no surface owns a second player engine.
 */
export class PlaybackController {
  constructor({ registry, onStateChange = () => {} } = {}) {
    this.registry = registry || new Map();
    this.onStateChange = onStateChange;
    this.state = { sourceId:null, surface:null, mode:null, open:false, history:[], cursor:-1 };
  }

  getSource(id) {
    const source = this.registry instanceof Map ? this.registry.get(id) : this.registry[id];
    if (!source) throw new Error(`Unknown ERN source: ${id}`);
    return source;
  }

  resolveMode(source) {
    if (source.health === "OFFLINE") return "UNAVAILABLE";
    if (source.truth === "PREVIEW" || source.playback === "PREVIEW") return "PREVIEW";
    if (source.permission === "LINK_ONLY" || source.truth === "EXTERNAL_LIVE" || source.playback === "EXTERNAL") return "EXTERNAL";
    if (source.truth === "LIVE_IMAGE" || source.playback === "IMAGE_REFRESH") return "IMAGE_REFRESH";
    if (source.truth === "LIVE_VIDEO" && source.permission === "EMBED_ALLOWED" && source.playback === "EMBED" && source.embedUrl) return "EMBED";
    return "EXTERNAL";
  }

  play(sourceId, { surface = "immersive", remember = true } = {}) {
    const source = this.getSource(sourceId);
    const mode = this.resolveMode(source);
    if (remember) {
      const history = this.state.history.slice(0, this.state.cursor + 1);
      if (history.at(-1) !== sourceId) history.push(sourceId);
      this.state.history = history.slice(-50);
      this.state.cursor = this.state.history.length - 1;
    }
    this.state = { ...this.state, sourceId, surface, mode, open:true };
    this.onStateChange({ ...this.state, source });
    return { source, mode, surface };
  }

  close() {
    this.state = { ...this.state, open:false };
    this.onStateChange({ ...this.state, source:this.state.sourceId ? this.getSource(this.state.sourceId) : null });
  }

  previous() {
    if (this.state.cursor <= 0) return null;
    this.state.cursor -= 1;
    return this.play(this.state.history[this.state.cursor], { surface:this.state.surface, remember:false });
  }

  next() {
    if (this.state.cursor >= this.state.history.length - 1) return null;
    this.state.cursor += 1;
    return this.play(this.state.history[this.state.cursor], { surface:this.state.surface, remember:false });
  }

  canPromote(source) {
    return source.health === "HEALTHY" &&
      ["LIVE_VIDEO","LIVE_IMAGE","EXTERNAL_LIVE","PARTNER"].includes(source.truth) &&
      source.permission !== "UNKNOWN";
  }
}
