import {currentSource} from "../src/discovery-eligibility.js";
import {embedPlaybackCurrent} from "../src/embed-playback-current.js";
import fs from "node:fs";
const read=p=>fs.readFileSync(p,"utf8"),json=p=>JSON.parse(read(p));
const index=read("index.html"),app=read("src/app-lite.js"),sources=json("data/sources.json"),local=json("data/local-directory.json"),evidence=json("data/release-evidence.json"),rollback=json("data/rollback-proof.json");
const mapped=sources.filter(s=>Number.isFinite(Number(s.lat))&&Number.isFinite(Number(s.lon))).length;
const configuredInside=sources.filter(s=>s.health!=="OFFLINE"&&((s.playback==="EMBED"&&s.embedUrl)||(s.playback==="IMAGE_REFRESH"&&s.sourceUrl))).length;
const current=sources.filter(s=>currentSource(s)).length;
const provenEmbeds=sources.filter(s=>s.playback==="EMBED"&&s.embedUrl&&currentSource(s)&&embedPlaybackCurrent(s)).length;
const currentImages=sources.filter(s=>s.playback==="IMAGE_REFRESH"&&s.sourceUrl&&currentSource(s)).length;
const currentInside=provenEmbeds+currentImages;
const formalEvidence=["browser","mobile","providerPlayback","accessibility","performance","rollback"];
const automatedGates={accessibility:fs.existsSync("scripts/accessibility-preflight.mjs"),performance:fs.existsSync("scripts/performance-preflight.mjs"),rollback:fs.existsSync("scripts/rollback-preflight.mjs")&&rollback?.verified===true,participation:fs.existsSync("scripts/participation-preflight.mjs"),featuredCuration:fs.existsSync("scripts/featured-curation-preflight.mjs")};
const evidencePassed=formalEvidence.filter(k=>evidence?.[k]?.ok===true&&String(evidence[k].note||"").trim());
const product={
 watchEarth:index.includes('id="watch"'),
 search:index.includes('id="search"')&&app.includes("localDirectoryMatch("),
 atlas:index.includes('id="map"')&&index.includes('data-map-filter="local"'),
 localEarth:index.includes('id="localEarth"'),
 guide:index.includes('id="guidePanel"')&&app.includes("guidePlaceMatches("),
 myEarth:index.includes('id="saved"'),
 placesAndCameras:fs.existsSync("for-places.html"),
 nowMoments:fs.existsSync("now-moments.html"),
 destinationPages:fs.existsSync("scripts/build-destination-pages.mjs")
};
const external={
 realAIBackend:false,
 submissionTransport:false,
 nowMomentUploadTransport:false,
 moderationPipeline:false,
 reviewedLocalBusinesses:local.filter(x=>x?.status==="APPROVED").length,
 affiliateInventory:false
};
const productReady=Object.values(product).every(Boolean),evidenceReady=formalEvidence.every(k=>evidencePassed.includes(k)),gatesReady=Object.values(automatedGates).every(Boolean);
const conclusion=productReady&&evidenceReady&&gatesReady?"STABLE_BETA_READY":productReady?"CORE_PRODUCT_PRESENT":"CORE_PRODUCT_GAP";
console.log(JSON.stringify({
 generatedAt:new Date().toISOString(),
 product,
 catalog:{sources:sources.length,current,mapped,configuredInsideERN:configuredInside,freshHumanProvenEmbeds:provenEmbeds,currentImageRefreshes:currentImages,currentInsideERN:currentInside,reviewedLocalPlaces:external.reviewedLocalBusinesses},
 releaseEvidence:{passed:evidencePassed,remaining:formalEvidence.filter(k=>!evidencePassed.includes(k))},
 automatedGates,
 externalActivation:external,
 readiness:{productReady,evidenceReady,gatesReady},
 conclusion,
 note:conclusion==="STABLE_BETA_READY"?"ERN core product, formal evidence and automated beta gates are complete. Heavy AI/upload/business activation remains intentionally separate.":"Core product presence is not the same as full interactive activation. AI, uploads, submissions, moderation and partner inventory require real external services or reviewed records; do not fake them."
},null,2));
