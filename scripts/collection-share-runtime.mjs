export function collectionShareRuntime(copiedText, shareText) {
  const button = document.querySelector(".collection-share");
  if (!button) return;
  const payload = {title: document.title, text: shareText, url: location.href};
  button.addEventListener("click", async () => {
    try {
      let shared = false;
      if (navigator.share) {
        await navigator.share(payload);
        shared = true;
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(payload.url);
        shared = true;
        const original = button.textContent;
        button.textContent = copiedText;
        setTimeout(() => button.textContent = original, 1200);
      }
      if (shared) globalThis.ERN_EVENT?.("share_clicked", {route: location.pathname});
    } catch {}
  });
}

export function collectionShareScript(copiedText, shareText) {
  const json = value => JSON.stringify(value).replace(/</g, "\\u003c");
  return `<script>(${collectionShareRuntime.toString()})(${json(copiedText)},${json(shareText)})</script>`;
}
