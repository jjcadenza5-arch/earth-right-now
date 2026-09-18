import { destroyMedia } from "./media-lifecycle.js";
export const playbackAdapters = {
  EMBED: {
    render(source, mount) {
      mount.replaceChildren();
      const frame=document.createElement("iframe");
      frame.src=source.embedUrl;
      frame.title=source.title;
      frame.allow="autoplay; fullscreen; picture-in-picture";
      frame.allowFullscreen=true;
      frame.referrerPolicy="strict-origin-when-cross-origin";
      mount.append(frame);
    }
  },
  IMAGE_REFRESH: {
    render(source,mount) {
      mount.replaceChildren();
      const img=document.createElement("img");
      img.alt=source.title;
      const refresh=()=>{ img.src=source.sourceUrl+(source.sourceUrl.includes("?")?"&":"?")+"ern="+Date.now(); };
      refresh(); mount.append(img);
      const timer=setInterval(refresh, source.refreshMs||60000);
      return ()=>clearInterval(timer);
    }
  },
  EXTERNAL: {
    render(source,mount) {
      mount.replaceChildren();
      const box=document.createElement("div");
      box.className="ern-external-live";
      box.innerHTML="<strong>Live at source</strong><p>This current view opens at its official provider.</p>";
      const a=document.createElement("a"); a.href=source.sourceUrl; a.target="_blank"; a.rel="noopener noreferrer"; a.textContent="Open live source";
      box.append(a); mount.append(box);
    }
  },
  PREVIEW: {
    render(source,mount) {
      mount.replaceChildren();
      const box=document.createElement("div"); box.className="ern-preview";
      box.textContent=source.story||"Preview only"; mount.append(box);
    }
  },
  UNAVAILABLE: {
    render(source,mount) {
      mount.replaceChildren();
      const box=document.createElement("div"); box.className="ern-unavailable";
      box.innerHTML="<strong>Window temporarily unavailable</strong><p>ERN will not pretend an unavailable source is live.</p>";
      if(source.sourceUrl && source.sourceUrl!=="about:blank"){const a=document.createElement("a");a.href=source.sourceUrl;a.target="_blank";a.rel="noopener noreferrer";a.textContent="Check official source";box.append(a);}
      mount.append(box);
    }
  }
};

export function renderPlayback(mode,source,mount){destroyMedia(mount);
  return (playbackAdapters[mode]||playbackAdapters.EXTERNAL).render(source,mount);
}
