import { releaseBlockerSummary,releaseBlockerCopy } from "../src/release-blocker-summary.js";
const e={browser:{ok:false},mobile:{ok:false},providerPlayback:{ok:true},accessibility:{ok:true},performance:{ok:false},rollback:{ok:true}};const x=releaseBlockerSummary({ready:false,blockers:["RELEASE_EVIDENCE_INCOMPLETE"]},e);console.assert(!x.ready&&x.missingEvidence.join()==="browser,mobile,performance");console.assert(releaseBlockerCopy(x).includes("browser"));
console.log("ERN release blocker summary smoke checks passed");
