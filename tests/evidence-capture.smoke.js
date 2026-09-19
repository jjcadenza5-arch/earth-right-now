import { evidencePatch } from "../src/evidence-capture.js";
const base={browser:{ok:false,note:"",checkedAt:""}};
const next=evidencePatch(base,"browser",{ok:true,note:"Chrome desktop candidate exercised",checkedAt:"2026-09-19T12:00:00Z"});
console.assert(next.browser.ok&&next.browser.note.includes("Chrome"));
let threw=false;try{evidencePatch(base,"madeUp",{ok:true,note:"x"})}catch{threw=true}console.assert(threw);
console.log("ERN evidence capture smoke checks passed");
