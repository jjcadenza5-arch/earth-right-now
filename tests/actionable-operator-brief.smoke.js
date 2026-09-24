import assert from "node:assert/strict";import {operationsOperatorBrief} from "../src/operations-operator-brief.js";
const snapshot={generatedAt:"2026-09-24T10:40:00Z",catalog:{healthy:8,total:10,degraded:2,expired:1},watchEarth:{strongCurrent:6,insideCurrent:2,status:"INSIDE_SHORTFALL",recommendedLimit:6},insideERN:{ready:2,targetReady:5,readyShortfall:3,recoveryDebt:5},providers:{families:1,targetFamilies:2,dominantShare:1,nextGoal:"REVIEW_SECOND_EMBED_PROVIDER"},release:{blockers:1},maintenance:{sourceRevalidation:4}};
const recovery={restorationCandidates:[{id:"metung",title:"Metung",action:"PROVE_VISITOR_PLAYBACK",restorationScore:125.9}],blocked:[{id:"bad",title:"Broken Cam",reason:"DEGRADED_EMBED"}]};
const research={next:[{id:"youtube-monterey-bay-cam",provider:"Monterey Bay Aquarium",permissionReview:"PER_VIDEO_EMBED_PERMISSION_REQUIRES_DEPLOYED_TEST",playbackReview:"HUMAN_PLAYBACK_REQUIRED"}]};
const md=operationsOperatorBrief({snapshot,delta:{direction:"BASELINE",score:0,improved:[],regressed:[]},recovery,research});
assert.match(md,/Inside-ERN restoration queue/);assert.match(md,/Metung/);assert.match(md,/Inside-ERN blockers/);assert.match(md,/Broken Cam/);assert.match(md,/Second-provider research/);assert.match(md,/Monterey Bay Aquarium/);
console.log("ERN actionable operator brief passed");
