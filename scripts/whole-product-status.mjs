import {currentSource} from "../src/discovery-eligibility.js";
import {embedPlaybackCurrent} from "../src/embed-playback-current.js";
import {currentTravelOffer} from "../src/travel-offer-verification.js";
import {activeAffiliatePartner} from "../src/affiliate-partners.js";
import {GUIDE_AI_CAPABILITIES} from "../src/guide-ai-capabilities.js";
import fs from "node:fs";
const read=p=>fs.readFileSync(p,"utf8"),json=p=>JSON.parse(read(p));
const index=read("index.html"),app=read("src/app-lite.js"),sources=json("data/sources.json"),local=json("data/local-directory.json"),evidence=json("data/release-evidence.json"),rollback=json("data/rollback-proof.json");
const guide=json("data/guide-ai-deployment.json"),submission=json("data/submission-transport.json"),media=json("data/now-moment-media-deployment.json"),earth=json("data/earth-signal-deployment.json"),partners=json("data/affiliate-partners.json"),offers=json("data/travel-offers.json"),distribution=json("data/distribution-channels.json");
const analytics=read("src/analytics-config.js");
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
const guideActivationReady=Object.entries(GUIDE_AI_CAPABILITIES).filter(([k])=>k!=="deterministicFallback").every(([,v])=>v===true);
const currentPartners=partners.filter(p=>activeAffiliatePartner(p));
const currentOffers=offers.filter(o=>currentTravelOffer(o)&&(!o.partnerId||currentPartners.some(p=>p.id===o.partnerId)));
const connectedChannels=(distribution.channels||[]).filter(x=>x.state==="CONNECTED").map(x=>x.id);
const analyticsActive=/enabled\s*:\s*true/.test(analytics)&&!/provider\s*:\s*["']NONE["']/.test(analytics);
const external={
 guideAI:{backendDeployed:guide.status==="DEPLOYED",publicGenerativeActive:guide.status==="DEPLOYED"&&guideActivationReady,deterministicPublicFallback:true},
 earthSignals:{deployed:earth.status==="DEPLOYED",publicActive:earth.status==="DEPLOYED"&&earth.publicActivationAllowed===true,moderationReady:earth.moderation===true},
 submissionTransport:{deployed:Boolean(submission.endpoint),publicActive:submission.enabled===true&&Boolean(submission.endpoint)},
 nowMomentMedia:{deployed:media.status==="DEPLOYED",publicActive:media.status==="DEPLOYED"&&media.publicActivationAllowed===true,videoEnabled:media.videoEnabled===true,moderationReady:media.moderationQueue===true},
 localEarth:{reviewedPlaces:local.filter(x=>x?.status==="APPROVED").length},
 commercial:{currentAffiliatePartners:currentPartners.length,currentVerifiedOffers:currentOffers.length,inventoryActive:currentOffers.length>0},
 distribution:{connectedChannels},
 analytics:{active:analyticsActive}
};
const productReady=Object.values(product).every(Boolean),evidenceReady=formalEvidence.every(k=>evidencePassed.includes(k)),gatesReady=Object.values(automatedGates).every(Boolean);
const conclusion=productReady&&evidenceReady&&gatesReady?"STABLE_BETA_READY":productReady?"CORE_PRODUCT_PRESENT":"CORE_PRODUCT_GAP";
console.log(JSON.stringify({
 generatedAt:new Date().toISOString(),
 product,
 catalog:{sources:sources.length,current,mapped,configuredInsideERN:configuredInside,freshHumanProvenEmbeds:provenEmbeds,currentImageRefreshes:currentImages,currentInsideERN:currentInside,reviewedLocalPlaces:external.localEarth.reviewedPlaces},
 releaseEvidence:{passed:evidencePassed,remaining:formalEvidence.filter(k=>!evidencePassed.includes(k))},
 automatedGates,
 externalActivation:external,
 readiness:{productReady,evidenceReady,gatesReady},
 conclusion,
 note:conclusion==="STABLE_BETA_READY"?"ERN core product, formal evidence and automated beta gates are complete. External features are reported separately as deployed, public-active, or intentionally gated.":"Core product presence is not the same as full interactive activation. External AI, uploads, submissions, moderation, analytics and partner services remain evidence-gated; do not fake activation."
},null,2));
