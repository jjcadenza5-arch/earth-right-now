import { evidencePatch } from "../src/evidence-capture.js";
const base={browser:{ok:false,note:"",checkedAt:""}},commit="a".repeat(40);
const next=evidencePatch(base,"browser",{ok:true,note:"Chrome desktop candidate exercised",checkedAt:"2026-09-19T12:00:00Z",commit});
console.assert(next.browser.ok&&next.browser.note.includes("Chrome")&&next.browser.commit===commit);
let threw=false;try{evidencePatch(base,"madeUp",{ok:true,note:"x",commit})}catch{threw=true}console.assert(threw);
threw=false;try{evidencePatch(base,"browser",{ok:true,note:"x"})}catch{threw=true}console.assert(threw,"passing evidence without candidate commit must fail closed");
console.log("ERN evidence capture smoke checks passed");
