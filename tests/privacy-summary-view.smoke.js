import "./test-browser-env.mjs";
import { privacySummaryView } from "../src/privacy-summary-view.js";
const view=privacySummaryView();console.assert(view.textContent.includes("Privacy by default"));console.assert(view.textContent.includes("stay in this browser"));console.assert(view.textContent.includes("precise location"));console.assert(view.textContent.includes("Third-party camera providers"));
console.log("ERN privacy summary view smoke checks passed");
