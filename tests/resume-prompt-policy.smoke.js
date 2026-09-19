import { resumePromptPolicy } from "../src/resume-prompt-policy.js";
const offer={show:true,label:"Resume last window",sourceId:"x"};
console.assert(resumePromptPolicy({hasExplicitRoute:true,offer}).show===false);
console.assert(resumePromptPolicy({hasExplicitRoute:false,offer}).show===true);
console.assert(resumePromptPolicy({hasExplicitRoute:false,offer:{show:false,reason:"EXPIRED"}}).reason==="EXPIRED");
console.log("ERN resume prompt policy smoke checks passed");
