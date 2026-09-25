import assert from "node:assert/strict";import {operationsOperatorBrief} from "../src/operations-operator-brief.js";
const snapshot={generatedAt:"2026-09-24T10:30:00Z",catalog:{healthy:8,total:10,degraded:2,expired:1},watchEarth:{strongCurrent:6,insideCurrent:2,status:"INSIDE_SHORTFALL",recommendedLimit:6},insideERN:{ready:2,targetReady:5,readyShortfall:3,recoveryDebt:5},providers:{families:1,targetFamilies:2,dominantShare:1,nextGoal:"REVIEW_SECOND_EMBED_PROVIDER"},release:{blockers:1},maintenance:{sourceRevalidation:4},availability:{sampled:4,reachable:2,missing:1,blocked:1,temporaryError:0,timeout:0,networkError:0}};
const delta={direction:"MIXED",score:2,improved:[{metric:"catalog.healthy",previous:7,current:8,delta:1}],regressed:[{metric:"catalog.degraded",previous:1,current:2,delta:1}]};
const earthSignals={mode:"READ_ONLY",backendFoundation:{state:"PREPARED_NOT_DEPLOYED"},privacyNoticeDraft:{contentReady:true,published:false,activationSatisfied:false},deployment:{state:"NOT_DEPLOYED",missing:["httpsEndpoint","durableStorage"]}};const guideAi={mode:"DETERMINISTIC_ONLY",ready:false,deterministicFallback:true,deployment:{state:"NOT_DEPLOYED",missing:["httpsEndpoint","costGuard"],cost:{monthlyCostCeilingUsd:null}}};const md=operationsOperatorBrief({snapshot,delta,earthSignals,guideAi});assert.match(md,/ERN Daily Operations Brief/);assert.match(md,/MIXED/);assert.match(md,/Restore strong inside-ERN windows/);assert.match(md,/PAGE_MISSING/);assert.match(md,/Earth Signals readiness/);assert.match(md,/NOT_DEPLOYED/);assert.match(md,/Generative ERN Guide readiness/);assert.match(md,/DETERMINISTIC_ONLY/);assert.match(md,/Read-only operational summary/);
console.log("ERN daily operator brief passed");

const exhaustedBrief=operationsOperatorBrief({
 snapshot:{...snapshot,insideERN:{ready:5,targetReady:5,readyShortfall:0,recoveryDebt:0},release:{blockers:0}},
 delta:{direction:"UNCHANGED",improved:[],regressed:[]},
 researchReviewQueue:{exhausted:true,total:4,failedPlayback:4,nextAction:"RESEARCH_NEW_PROVIDER_FAMILY",primary:[]}
});
assert.match(exhaustedBrief,/Second-provider research state/);
assert.match(exhaustedBrief,/4\/4 staged candidate/);
assert.match(exhaustedBrief,/RESEARCH_NEW_PROVIDER_FAMILY/);
assert.match(exhaustedBrief,/Research a genuinely new embeddable provider family/);

const prepBrief=operationsOperatorBrief({
 snapshot:{...snapshot,insideERN:{ready:5,targetReady:5,readyShortfall:0,recoveryDebt:0},release:{blockers:0}},
 delta:{direction:"UNCHANGED",improved:[],regressed:[]},
 researchReviewQueue:{state:"PROVIDER_PREPARATION_READY",exhausted:false,primary:[],preparation:[{id:"widget",provider:"Widget Provider",familyLabel:"Official widget",technicalStatus:"GENERATED_WIDGET_CODE_REQUIRED",nextAction:"GENERATE_WIDGET"}]}
});
assert.match(prepBrief,/Provider-generated integration preparation/);
assert.match(prepBrief,/Widget Provider/);
assert.match(prepBrief,/Prepare the exact provider-generated target/);

const targetBrief=operationsOperatorBrief({
 snapshot:{...snapshot,insideERN:{ready:5,targetReady:5,readyShortfall:0,recoveryDebt:0},release:{blockers:0}},
 delta:{direction:"UNCHANGED",improved:[],regressed:[]},
 providerGeneratedTargets:{state:"PREPARATION_REQUIRED",preparation:3,reviewReady:0,items:[
   {id:"k",provider:"KitzSki",sourceId:"kitzbuhel",integrationKind:"PROVIDER_GENERATED_WIDGET",state:"EXACT_PROVIDER_CODE_REQUIRED",nextAction:"GENERATE_EXACT_CODE_ON_OFFICIAL_PROVIDER_SURFACE"},
   {id:"i",provider:"Icelandic Meteorological Office",sourceId:"reykjavik-metoffice",integrationKind:"PROVIDER_AUTHORIZED_CURRENT_IMAGE",state:"EXACT_PROVIDER_CODE_REQUIRED",nextAction:"GENERATE_EXACT_CODE_ON_OFFICIAL_PROVIDER_SURFACE"}
 ]}
});
assert.match(targetBrief,/Provider-generated target staging/);
assert.match(targetBrief,/Icelandic Meteorological Office/);
assert.match(targetBrief,/Obtain exact provider-generated code or authorized current-image target URLs/);

const blockerBrief=operationsOperatorBrief({
 snapshot:{...snapshot,insideERN:{ready:5,targetReady:5,readyShortfall:0,recoveryDebt:0},release:{blockers:0}},
 delta:{direction:"UNCHANGED",improved:[],regressed:[]},
 providerGeneratedTargets:{state:"PREPARATION_REQUIRED",preparation:3,manualPreparation:2,reviewReady:0,items:[
  {id:"k",provider:"KitzSki",sourceId:"kitzbuhel",integrationKind:"PROVIDER_GENERATED_WIDGET",state:"EXACT_PROVIDER_CODE_REQUIRED",manualInteractionRequired:true,nextAction:"GENERATE_EXACT_CODE_ON_OFFICIAL_PROVIDER_SURFACE"},
  {id:"i",provider:"IMO",sourceId:"reykjavik",integrationKind:"PROVIDER_AUTHORIZED_CURRENT_IMAGE",state:"EXACT_PROVIDER_TARGET_URL_REQUIRED",manualInteractionRequired:false,nextAction:"IDENTIFY_EXACT_AUTHORIZED_CURRENT_IMAGE_URL"}
 ]}
});
assert.match(blockerBrief,/2 require interactive provider action/);
assert.match(blockerBrief,/INTERACTIVE PROVIDER ACTION/);
assert.match(blockerBrief,/do not repeatedly retry them as machine-retrievable work/);
assert.match(blockerBrief,/Continue machine-safe discovery/);

const guideCostBrief=operationsOperatorBrief({
 snapshot:{...snapshot,insideERN:{ready:5,targetReady:5,readyShortfall:0,recoveryDebt:0},release:{blockers:0}},
 delta:{direction:"UNCHANGED",improved:[],regressed:[]},
 guideAi:{mode:"DETERMINISTIC_ONLY",ready:false,deterministicFallback:true,deployment:{state:"NOT_DEPLOYED",missing:["costGuard"],costDecisionRequired:true,cost:{monthlyCostCeilingUsd:null}}}
});
assert.match(guideCostBrief,/Model spending remains disabled/);
assert.match(guideCostBrief,/explicit monthly ceiling/);

const depthBrief=operationsOperatorBrief({
 snapshot:{...snapshot,insideERN:{ready:5,targetReady:5,readyShortfall:0,recoveryDebt:0},release:{blockers:0}},
 delta:{direction:"UNCHANGED",improved:[],regressed:[]},
 commercialResearchDepth:{totalCoveredPlaces:3,depthCandidates:2,selected:2,items:[
   {placeId:"a",title:"Alpha",country:"X",coveredIntents:["stay"],recommendedIntent:"activities"},
   {placeId:"b",title:"Beta",country:"Y",coveredIntents:["stay","activities"],recommendedIntent:"tickets"}
 ]}
});
assert.match(depthBrief,/Private travel-research depth/);
assert.match(depthBrief,/Alpha/);
assert.match(depthBrief,/next research intent: activities/);
assert.match(depthBrief,/Deepen private research at Alpha with a real activities option/);

const efficientRenewalBrief=operationsOperatorBrief({
 snapshot:{...snapshot,insideERN:{ready:6,targetReady:5,readyShortfall:0,recoveryDebt:3},release:{blockers:0}},
 delta:{direction:"UNCHANGED",improved:[],regressed:[]},
 operatorReviewQueue:{ready:6,targetReady:5,readyShortfall:0,renewalCount:3,renewalRequiredCount:2,recommendedRestorationCount:0,primaryItems:[{id:"a",title:"A",reviewMode:"RENEW"},{id:"b",title:"B",reviewMode:"RENEW"}],backlogItems:[{id:"c",title:"C",reviewMode:"RENEW"}],items:[{id:"a"},{id:"b"},{id:"c"}]}
});
assert.match(efficientRenewalBrief,/Renewal debt: 3; minimum primary renewals: 2/);
assert.match(efficientRenewalBrief,/Complete only the minimum primary playback renewals/);

const noDuplicatePrep=operationsOperatorBrief({
 snapshot:{providers:{families:1,targetFamilies:2},insideERN:{ready:5,targetReady:5,readyShortfall:0,recoveryDebt:0},release:{blockers:0}},
 delta:{direction:"UNCHANGED",improved:[],regressed:[]},
 providerGeneratedTargets:{state:"PREPARATION_REQUIRED",preparation:1,manualPreparation:1,reviewReady:0,items:[{providerFamilyId:"widget-family",provider:"Widget Provider",sourceId:"source",integrationKind:"PROVIDER_GENERATED_WIDGET",state:"EXACT_PROVIDER_CODE_REQUIRED",manualInteractionRequired:true,nextAction:"GENERATE_EXACT_CODE_ON_OFFICIAL_PROVIDER_SURFACE"}]},
 researchReviewQueue:{state:"PROVIDER_PREPARATION_READY",exhausted:false,primary:[],preparation:[{id:"widget-family",provider:"Widget Provider",familyLabel:"Official widget",technicalStatus:"GENERATED_WIDGET_CODE_REQUIRED",nextAction:"GENERATE_WIDGET"}]}
});
assert.match(noDuplicatePrep,/Provider-generated target staging/);
assert.doesNotMatch(noDuplicatePrep,/## Provider-generated integration preparation/);
const terminalProviderBrief=operationsOperatorBrief({
 snapshot:{providers:{families:1,targetFamilies:2},insideERN:{ready:5,targetReady:5,readyShortfall:0,recoveryDebt:0},release:{blockers:0}},
 delta:{direction:"UNCHANGED",improved:[],regressed:[]},
 providerDiscoveryQueue:{state:"CURRENT_CATALOG_RESEARCH_COMPLETE",primary:null,items:[]},
 researchReviewQueue:{state:"EXHAUSTED_RESEARCH_NEW_PROVIDER",exhausted:true,failedPlayback:4,total:4,primary:[],preparation:[],alternates:[]}
});
assert.match(terminalProviderBrief,/Current external-provider research is complete/);
assert.match(terminalProviderBrief,/do not recycle failed or already-classified families/);
