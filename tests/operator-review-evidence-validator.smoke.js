import assert from "node:assert/strict";import {validateOperatorReviewEvidence} from "../src/operator-review-evidence.js";
const packet={schemaVersion:1,kind:"ERN_OPERATOR_REVIEW_EVIDENCE",catalogMutationAllowed:false,networkStatus:"UNKNOWN_NOT_RECORDED",items:[
 {id:"source-a",type:"restore",outcome:"HUMAN_PLAYBACK_CONFIRMED",observedAt:"2026-09-24T11:00:00Z",evidenceKind:"HUMAN_REVIEW",networkStatus:"UNKNOWN_NOT_RECORDED"},
 {id:"research-a",type:"research",outcome:"INCONCLUSIVE",observedAt:"2026-09-24T11:01:00Z",evidenceKind:"HUMAN_REVIEW",networkStatus:"UNKNOWN_NOT_RECORDED"}
]};
let r=validateOperatorReviewEvidence(packet,{knownSourceIds:["source-a"],researchIds:["research-a"]});
assert.equal(r.ok,true);assert.equal(r.summary.accepted,2);assert.equal(r.summary.confirmed,1);assert.equal(r.sourceEvidence.length,1);assert.equal(r.researchEvidence.length,1);
r=validateOperatorReviewEvidence({...packet,catalogMutationAllowed:true},{knownSourceIds:["source-a"],researchIds:["research-a"]});assert.equal(r.ok,false);assert.ok(r.rejected.some(x=>x.reason==="CATALOG_MUTATION_FLAG_MUST_BE_FALSE"));
const bad={...packet,items:[...packet.items,{...packet.items[0]}]};r=validateOperatorReviewEvidence(bad,{knownSourceIds:["source-a"],researchIds:["research-a"]});assert.ok(r.rejected.some(x=>x.reason==="DUPLICATE_ITEM"));
r=validateOperatorReviewEvidence({...packet,items:[{...packet.items[0],id:"missing"}]},{knownSourceIds:["source-a"],researchIds:["research-a"]});assert.ok(r.rejected.some(x=>x.reason==="UNKNOWN_SOURCE_ID"));
r=validateOperatorReviewEvidence({...packet,items:[{...packet.items[0],networkStatus:"HTTP_200"}]},{knownSourceIds:["source-a"],researchIds:["research-a"]});assert.ok(r.rejected.some(x=>x.reason==="ITEM_NETWORK_STATUS_MUST_BE_UNKNOWN"));
console.log("ERN operator review evidence validator passed");

// The deployed review lab emits source backlog cards as type=backlog.
const backlogPacket={schemaVersion:1,kind:"ERN_OPERATOR_REVIEW_EVIDENCE",catalogMutationAllowed:false,networkStatus:"UNKNOWN_NOT_RECORDED",reviewOrigin:"https://earthrightnow.app/review/inside-ern.html",items:[{id:"known-backlog",type:"backlog",outcome:"HUMAN_PLAYBACK_CONFIRMED",observedAt:"2026-10-29T04:55:39.563Z",evidenceKind:"HUMAN_REVIEW",networkStatus:"UNKNOWN_NOT_RECORDED"}]};
const backlogOptions={knownSourceIds:["known-backlog"],expectedReviewOrigins:[backlogPacket.reviewOrigin],maxItemAgeHours:24,now:new Date("2026-10-29T05:00:00Z")};
const backlogResult=validateOperatorReviewEvidence(backlogPacket,backlogOptions);
assert.equal(backlogResult.ok,true);assert.equal(backlogResult.sourceEvidence.length,1);assert.equal(backlogResult.sourceEvidence[0].type,"backlog","Preserve raw group provenance");
assert.equal(validateOperatorReviewEvidence(backlogPacket,{...backlogOptions,knownSourceIds:[]}).ok,false,"Backlog must reference a known source");
const mixedDuplicate=validateOperatorReviewEvidence({...backlogPacket,items:[...backlogPacket.items,{...backlogPacket.items[0],type:"restore"}]},backlogOptions);
assert.ok(mixedDuplicate.rejected.some(x=>x.reason==="DUPLICATE_ITEM"),"A source cannot be repeated across restore/backlog groups");
assert.equal(validateOperatorReviewEvidence({...backlogPacket,reviewOrigin:"https://example.test/review"},backlogOptions).ok,false);
assert.equal(validateOperatorReviewEvidence({...backlogPacket,items:[{...backlogPacket.items[0],observedAt:"2026-10-20T04:00:00Z"}]},backlogOptions).ok,false);
console.log("Deployed backlog exports retain source ID, origin, freshness and duplicate validation");
