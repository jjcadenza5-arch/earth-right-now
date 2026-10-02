import fs from "node:fs";
const read=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const text=p=>fs.readFileSync(p,"utf8");
const phase7=read("data/phase7-entry-approval.json");
const workplan=read("data/phase7-workplan.json");
const launch=read("data/phase7-launch-message-kit.json");
const story=read("data/phase7-story-launch-pack.json");
const business=read("data/phase7-partner-business-kit.json");
const distribution=read("data/distribution-channels.json");
const index=text("index.html"),press=text("press.html");
const issues=[];
if(phase7?.approved!==true)issues.push("PHASE7_NOT_APPROVED");
if(phase7?.automaticExternalActionsAllowed!==false)issues.push("AUTOMATIC_EXTERNAL_ACTION_BOUNDARY");
if(!launch?.canonicalUrl||launch.canonicalUrl!=="https://earthrightnow.app/")issues.push("CANONICAL_LAUNCH_URL");
if(!launch?.tagline||!launch?.oneLine||!launch?.shortProfile||!launch?.shortShare)issues.push("LAUNCH_MESSAGE_KIT_INCOMPLETE");
if(story?.principle!=="Do not push the answer. Create the question."||!(story?.items||[]).length)issues.push("STORY_LAUNCH_PACK_INCOMPLETE");
if(!(business?.verifiedCommercialRelationships||[]).length)issues.push("BUSINESS_KIT_RELATIONSHIP_EVIDENCE_MISSING");
if(!index.includes('id="shareErn"'))issues.push("SITE_SHARE_ACTION_MISSING");
if(!press.includes("Launch-ready copy")||!press.includes(launch.shortShare))issues.push("PUBLIC_LAUNCH_COPY_NOT_ALIGNED");
if((distribution?.channels||[]).some(x=>x.state!=="NOT_CONNECTED"||x.automaticPostingAllowed!==false))issues.push("UNVERIFIED_SOCIAL_CHANNEL_CLAIM");
const safety=distribution?.safety||{};
if(safety.inventAccountClaimsAllowed!==false||safety.automaticAccountCreationAllowed!==false||safety.automaticPostingAllowed!==false)issues.push("DISTRIBUTION_SAFETY_BOUNDARY");
const report={
 schemaVersion:1,
 phase:7,
 label:"Launch & Distribution Readiness QA",
 state:issues.length?"BLOCKED":"READY_NON_GATED_LAUNCH_PACKAGE",
 issues,
 workplanState:workplan?.state||"UNKNOWN",
 launchMessagesReady:!issues.includes("LAUNCH_MESSAGE_KIT_INCOMPLETE"),
 storiesPackReady:!issues.includes("STORY_LAUNCH_PACK_INCOMPLETE"),
 partnerBusinessKitReady:!issues.includes("BUSINESS_KIT_RELATIONSHIP_EVIDENCE_MISSING"),
 siteShareReady:!issues.includes("SITE_SHARE_ACTION_MISSING"),
 socialChannelsConnected:(distribution?.channels||[]).filter(x=>x.state==="CONNECTED").length,
 safety:{
  automaticAccountCreationAllowed:false,
  automaticPostingAllowed:false,
  analyticsActivationImplied:false,
  payoutActionImplied:false,
  separateFeatureActivationImplied:false
 }
};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
