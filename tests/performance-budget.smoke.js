import "./test-browser-env.mjs";
import { performanceBudget,performanceSnapshot,performanceBudgetResult } from "../src/performance-budget.js";
const root=document.createElement("div"),budget=performanceBudget();
console.assert(budget.activeMediaMax===1,"ERN performance budget must preserve one-player architecture");

const iframe=document.createElement("iframe");
iframe.setAttribute("src","https://example.com/live");
root.replaceChildren(iframe);
let snap=performanceSnapshot({root,now:()=>1});
console.assert(snap.activeMedia===1&&snap.mediaElements===1);
console.assert(performanceBudgetResult(snap).ok);

const video=document.createElement("video");
video.setAttribute("src","https://example.com/b");
root.replaceChildren(iframe,video);
const bad=performanceBudgetResult(performanceSnapshot({root,now:()=>2}));
console.assert(!bad.ok&&bad.blockers.includes("MULTIPLE_ACTIVE_MEDIA"));

const placeholder=document.createElement("iframe");
const hiddenVideo=document.createElement("video");
hiddenVideo.setAttribute("src","https://example.com/b");
hiddenVideo.hidden=true;
root.replaceChildren(placeholder,hiddenVideo);
snap=performanceSnapshot({root,now:()=>3});
console.assert(snap.mediaElements===2&&snap.activeMedia===0,"inactive placeholders must not be counted as active players");
console.log("ERN performance budget smoke checks passed");
