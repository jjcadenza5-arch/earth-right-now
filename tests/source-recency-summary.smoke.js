import assert from "node:assert/strict";
import fs from "node:fs";
import {cameraCoverage} from "../scripts/camera-coverage.mjs";
const src=fs.readFileSync(new URL("../scripts/source-recency-summary.mjs",import.meta.url),"utf8");
assert.match(src,/stateOf\(s\)==="STALE_CHECK"/,"recency summary must use current stale state name");
assert.doesNotMatch(src,/RECHECK_DUE/,"legacy RECHECK_DUE state must not remain in recency summary");
const now=new Date("2026-10-14T07:30:00Z"),recent="2026-10-14T07:00:00Z";
const base={truth:"LIVE_IMAGE",playback:"EXTERNAL",permission:"LINK_ONLY",health:"HEALTHY",sourceUrl:"https://example.com/camera",checkedAt:recent};
const rows=[
 {...base,id:"a",placeId:"same"},
 {...base,id:"b",placeId:"same",truth:"EXTERNAL_LIVE"},
 {...base,id:"reference",truth:"PREVIEW"},
 {...base,id:"limited",health:"DEGRADED"},
 {...base,id:"expired",checkedAt:"2026-09-01T00:00:00Z"},
 {...base,id:"missing-proof",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",playback:"EMBED",embedUrl:"https://www.youtube-nocookie.com/embed/abcdefghijk"},
 {...base,id:"failed",playbackVerifiedAt:recent,playbackFailureObservedAt:"2026-10-14T07:10:00Z"},
 {...base,id:"future",checkedAt:"2026-10-15T07:00:00Z"},
 {...base,id:"scheduled",availabilitySchedule:{timeZone:"UTC",start:"01:00",end:"02:00"}}
];
const result=cameraCoverage(rows,{now});
assert.equal(result.catalogPlaces,8);
assert.equal(result.cameraTypePlaces,7,"reference must not count toward camera goal");
assert.equal(result.currentEligiblePlaces,1,"same-place angles count once; expired, failed, unproved, future, limited and closed sources cannot inflate current coverage");
assert.equal(result.currentEligibleSources,2);
assert.equal(result.knownCameraPlaceGap,993);
assert.equal(result.currentEligiblePlaceGap,999);
const proof={...rows[5],playbackVerifiedAt:recent};
assert.equal(cameraCoverage([proof],{now}).currentEligiblePlaces,1);
assert.equal(cameraCoverage([{...proof,playbackVerifiedAt:"2026-10-15T07:00:00Z"}],{now}).currentEligiblePlaces,0);
console.log("Source recency summary classifies STALE_CHECK records correctly");
