import assert from "node:assert/strict";
import {staleMaintenanceClass} from "../src/stale-maintenance-class.js";
import {sourceRevalidationTriage} from "../src/source-revalidation-triage.js";

const pattaya={id:"pattaya-city-live",title:"Pattaya",health:"DEGRADED",permission:"LINK_ONLY",playback:"EXTERNAL",truth:"EXTERNAL_LIVE",failureReason:"PUBLIC_PORTAL_CURRENT_CAMERA_INVENTORY_PRESENT_BUT_INDIVIDUAL_PLAYBACK_UNVERIFIED",checkedAt:"2026-09-29T06:10:00Z",lastSuccessfulCheck:"2026-09-23T14:24:00Z",sourceUrl:"https://example.test/pattaya"};
const chidori={id:"chidori-sakura",title:"Chidori",health:"DEGRADED",permission:"LINK_ONLY",playback:"EXTERNAL",truth:"EXTERNAL_LIVE",failureReason:"OFF_SEASON_OFFICIAL_SURFACE_STILL_SHOWS_2026_APRIL_STATE",checkedAt:"2026-09-29T06:10:00Z",lastSuccessfulCheck:"2026-09-23T00:10:00Z",sourceUrl:"https://example.test/chidori"};
const tbilisi={id:"tbilisi-mtkvari-river",title:"Tbilisi",health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL",truth:"EXTERNAL_LIVE",failureReason:null,checkedAt:"2026-09-24T06:47:00Z",lastSuccessfulCheck:"2026-09-24T06:47:00Z",sourceUrl:"https://example.test/tbilisi"};

assert.equal(staleMaintenanceClass(pattaya).class,"PLAYBACK_EVIDENCE_DEBT");
assert.equal(staleMaintenanceClass(chidori).class,"SEASONAL_OFF_SEASON");
assert.equal(staleMaintenanceClass(tbilisi).class,"EDITORIAL_CURRENTNESS_DEBT");

const r=sourceRevalidationTriage([pattaya,chidori,tbilisi],{limit:10});
const byId=new Map(r.items.map(x=>[x.id,x]));
assert.equal(byId.get("pattaya-city-live")?.lane,"PLAYBACK_EVIDENCE_REVIEW");
assert.equal(byId.get("chidori-sakura")?.lane,"SEASONAL_DEFERRED");
assert.equal(byId.get("tbilisi-mtkvari-river")?.maintenanceClass,"EDITORIAL_CURRENTNESS_DEBT");
assert.ok(byId.get("pattaya-city-live")?.urgency>byId.get("tbilisi-mtkvari-river")?.urgency);
assert.ok(byId.get("chidori-sakura")?.urgency<byId.get("tbilisi-mtkvari-river")?.urgency);
console.log("Stale ERN sources route by playback, seasonal, or editorial debt");
