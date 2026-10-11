import assert from "node:assert/strict";
import {operationsOperatorBrief} from "../src/operations-operator-brief.js";
const brief=operationsOperatorBrief({
 snapshot:{generatedAt:"2026-10-05T11:10:00Z",catalog:{healthy:1,total:1},watchEarth:{strongCurrent:1,insideCurrent:1,status:"CURATED",recommendedLimit:5},insideERN:{ready:5,targetReady:5,readyShortfall:0,recoveryDebt:0},providers:{families:2,targetFamilies:2,dominantShare:.5,nextGoal:"none"},release:{blockers:0},maintenance:{sourceRevalidation:0}},
 delta:{direction:"UNCHANGED",improved:[],regressed:[]},
 searchGapTriage:{
  visitorDemand:{informationOnlySearchEvents:4,items:[{key:"local-cafe",searchCount:4,resultOpens:2,action:"REVIEW_EXISTING_RESEARCH_WORKFLOW"}]},
  totalZeroResultEvents:5,currentlyResolves:3,genuineCurrentGaps:1,lowConfidencePartial:1,
  rows:[
   {query:"new york",count:1,state:"CURRENTLY_RESOLVES",matches:[{title:"New York Skyline — Jersey City"}]},
   {query:"chiangmai",count:1,state:"GENUINE_CURRENT_GAP",matches:[]}
  ]
 }
});
assert.match(brief,/Search-gap triage/);
assert.match(brief,/currently resolves: 3/);
assert.match(brief,/genuine destination terms: 1/);
assert.match(brief,/"new york" ×1 — CURRENTLY_RESOLVES → New York Skyline — Jersey City/);
assert.match(brief,/"chiangmai" ×1 — GENUINE_CURRENT_GAP/);
assert.match(brief,/No class may auto-create a source or alias/);
console.log("Operator brief renders safe current search-gap triage");

assert.match(brief,/Information-only demand: 4/);
assert.match(brief,/local-cafe: 4 searches, 2 information opens/);
assert.match(brief,/not unique visitors or historical result-state proof/);
