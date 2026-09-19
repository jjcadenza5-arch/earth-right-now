import "./test-browser-env.mjs";import { shortcutHelp,shortcutHelpText } from "../src/shortcut-help.js";import { shortcutHelpView } from "../src/shortcut-help-view.js";
const h=shortcutHelp();console.assert(h.some(x=>x.keys==="/")&&h.some(x=>x.keys.includes("←")));console.assert(shortcutHelpText().includes("Surprise me"));const v=shortcutHelpView();console.assert(v.textContent.includes("Keyboard shortcuts")&&v.textContent.includes("Close viewer"));
console.log("ERN shortcut help smoke checks passed");
