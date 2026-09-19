import { element } from "./safe-dom.js";import { shortcutHelp } from "./shortcut-help.js";
export function shortcutHelpView(){const d=element("details",{className:"shortcut-help"}),s=element("summary",{text:"Keyboard shortcuts"}),list=element("dl");for(const x of shortcutHelp()){list.append(element("dt",{text:x.keys}),element("dd",{text:x.label}))}d.append(s,list);return d}
