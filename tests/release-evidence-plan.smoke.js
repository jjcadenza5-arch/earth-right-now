import { releaseEvidencePlan,releaseEvidenceMarkdown } from "../src/release-evidence-plan.js";
const plan=releaseEvidencePlan(),keys=plan.map(x=>x.key);
console.assert(keys.join(",")==="browser,mobile,providerPlayback,accessibility,performance,rollback","release plan must cover every real-world gate");
console.assert(plan.every(x=>x.steps.length>=4&&x.pass),"every release gate needs concrete checks and a pass condition");
const md=releaseEvidenceMarkdown();
console.assert(md.includes("CI does not complete these checks")&&md.includes("Provider playback"),"generated checklist must preserve evidence boundary");
console.log("ERN release evidence plan smoke checks passed");
