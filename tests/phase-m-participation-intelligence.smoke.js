import assert from "node:assert/strict";
import {participationEvidencePack,participationEvidenceHasContent} from "../src/participation-evidence.js";
import {participationGuideContext,participationGuideText} from "../src/participation-guide-context.js";
import {participationPlaceSummary} from "../src/participation-place-context.js";

const now=new Date("2026-09-28T08:30:00Z");
const pack=participationEvidencePack({
  place:{id:"chiang-mai",title:"Chiang Mai"},
  now,
  signals:[
    {type:"RAINING",placeId:"chiang-mai",createdAt:"2026-09-28T08:20:00Z",locationEvidence:"NEAR_PLACE",reported:false},
    {type:"RAINING",placeId:"chiang-mai",createdAt:"2026-09-28T08:10:00Z",locationEvidence:"UNVERIFIED",reported:false},
    {type:"BUSY",placeId:"chiang-mai",createdAt:"2026-09-28T07:00:00Z",reported:false},
    {type:"PEACEFUL",placeId:"bangkok",createdAt:"2026-09-28T08:25:00Z",reported:false}
  ],
  photos:[
    {id:"p1",kind:"photo",placeId:"chiang-mai",createdAt:"2026-09-28T08:15:00Z",storageExpiryAt:"2026-09-28T09:00:00Z",moderation:"APPROVED",reported:false,metadataStripped:true},
    {id:"p2",kind:"photo",placeId:"chiang-mai",createdAt:"2026-09-28T08:15:00Z",storageExpiryAt:"2026-09-28T09:00:00Z",moderation:"PENDING",reported:false,metadataStripped:true}
  ]
});
assert.equal(participationEvidenceHasContent(pack),true);
assert.equal(pack.signals.length,1);assert.equal(pack.signals[0].count,2);assert.equal(pack.photos.length,1);
assert.equal(pack.verified,false);assert.equal(pack.truth.weatherVerified,false);assert.equal(pack.truth.cameraStatusChanged,false);
const guide=participationGuideContext(pack,{now});
assert.equal(guide.verified,false);assert.equal(guide.sourceTruthChanged,false);
const text=participationGuideText(guide);
assert.match(text,/visitors recently reported raining/i);assert.match(text,/not independently verified/i);
for(const prohibited of guide.prohibitedInferences)assert.ok(prohibited);
const place=participationPlaceSummary(pack);
assert.equal(place.verified,false);assert.equal(place.rankingAffected,false);
console.log("Phase M participation intelligence stays attributed, temporary and unverified");
