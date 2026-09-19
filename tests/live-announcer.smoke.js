import "./test-browser-env.mjs";
import { liveRegion,announce } from "../src/live-announcer.js";
const el=document.createElement("div");liveRegion(el);
console.assert(el.getAttribute("role")==="status"&&el.getAttribute("aria-live")==="polite");
console.assert(announce(el,"Connection restored.")===true&&el.textContent==="Connection restored.");
console.assert(announce(el,"Connection restored.")===false,"duplicate announcements should be suppressed");
console.log("ERN live announcer smoke checks passed");
