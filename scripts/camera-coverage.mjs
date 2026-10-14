import {currentSource} from "../src/discovery-eligibility.js";
import {embedPlaybackProofCurrent} from "../src/playback-proof.js";

// Read-only coverage accounting for the existing recency report, not verification.
export function cameraCoverage(sources,{now=new Date()}={}){
 const types=new Set(["LIVE_VIDEO","LIVE_IMAGE","EXTERNAL_LIVE"]);
 const cameras=sources.filter(s=>types.has(s.truth)&&s.playback!=="PREVIEW");
 const placeCount=rows=>new Set(rows.map(s=>s.placeId||s.id)).size;
 const failureActive=s=>{const f=Date.parse(s.playbackFailureObservedAt||""),p=Date.parse(s.playbackVerifiedAt||"");return Number.isFinite(f)&&(!Number.isFinite(p)||f>=p)};
 const eligible=cameras.filter(s=>currentSource(s,{now})&&!failureActive(s)&&embedPlaybackProofCurrent(s,{now,maxAgeHours:168}));
 return{catalogSources:sources.length,catalogPlaces:placeCount(sources),cameraTypeSources:cameras.length,cameraTypePlaces:placeCount(cameras),referenceSources:sources.length-cameras.length,healthyCameraTypePlaces:placeCount(cameras.filter(s=>s.health==="HEALTHY")),currentEligibleSources:eligible.length,currentEligiblePlaces:placeCount(eligible),cameraPlacesWithoutCurrentEligibleSource:placeCount(cameras)-placeCount(eligible),targetCameraPlaces:1000,knownCameraPlaceGap:Math.max(0,1000-placeCount(cameras)),currentEligiblePlaceGap:Math.max(0,1000-placeCount(eligible)),note:"Core and lazy supplemental catalogs combined. Distinct place IDs, not camera angles. Current eligibility applies existing discovery, recency, schedule, negative-playback and 168h search embed-proof gates; it is not independent playback of every camera today, nor the stricter LIVE HERE/featured admission. References, information records, photographs and affiliates do not count. No dates or health renewed by this report."};
}
