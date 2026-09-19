import { validateEmbedRegistry } from "../src/embed-registry-guard.js";
console.assert(validateEmbedRegistry([{id:"ok",playback:"EMBED",permission:"EMBED_ALLOWED",embedUrl:"https://couchtourist.com/embed/cam/1/"}]).length===0);
console.assert(validateEmbedRegistry([{id:"bad-host",playback:"EMBED",permission:"EMBED_ALLOWED",embedUrl:"https://example.com/embed"}]).length===1);
console.assert(validateEmbedRegistry([{id:"bad-permission",playback:"EMBED",permission:"LINK_ONLY",embedUrl:"https://couchtourist.com/embed/cam/1/"}]).length===1);
console.log("ERN embed registry guard smoke checks passed");
