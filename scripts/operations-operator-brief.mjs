import {readFile} from "node:fs/promises";
import {operationsOperatorBrief} from "../src/operations-operator-brief.js";

const args=process.argv.slice(2);
const snapshotPath=args[0];
if(!snapshotPath) throw new Error("snapshot path required");

const read=async p=>JSON.parse(await readFile(p,"utf8"));
const optional=async p=>{
  if(!p||p==="-") return null;
  try{return await read(p)}catch(error){if(error?.code==="ENOENT") return null;throw error}
};

const snapshot=await read(snapshotPath);
const delta=await optional(args[1]);
const availability=await optional(args[2]);
const recovery=await optional(args[3]);
const research=await optional(args[4]);
const playbackHorizon=await optional(args[5]);
const researchPreflight=await optional(args[6]);
const availabilityContinuity=await optional(args[7]);
const commercialInventory=await optional(args[8]);
const commercialOnboarding=await optional(args[9]);
const submissionTransport=await optional(args[10]);
const commercialVerificationHorizon=await optional(args[11]);
const playbackEvidenceConsistency=await optional(args[12]);
const providerFamilyResearch=await optional(args[13]);
const providerDiscoveryQueue=await optional(args[14]);
const operatorReviewQueue=await optional(args[15]);
const researchReviewQueue=await optional(args[16]);
const sourceRevalidationTriage=await optional(args[17]);
const commercialResearch=await optional(args[18]);
const affiliatePlatformResearch=await optional(args[19]);
const affiliateApplicationReadiness=await optional(args[20]);
const earthSignals=await optional(args[21]);

console.log(operationsOperatorBrief({snapshot,delta,availability,recovery,research,playbackHorizon,researchPreflight,availabilityContinuity,commercialInventory,commercialOnboarding,submissionTransport,commercialVerificationHorizon,playbackEvidenceConsistency,providerFamilyResearch,providerDiscoveryQueue,operatorReviewQueue,researchReviewQueue,sourceRevalidationTriage,commercialResearch,affiliatePlatformResearch,affiliateApplicationReadiness,earthSignals}));
