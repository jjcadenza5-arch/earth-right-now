import { submissionCatalogDraft } from "../src/submission-catalog-draft.js";
const approved={status:"APPROVED",rightsConfirmed:true,sourceUrl:"https://example.test/cam",placeName:"Beach"};
console.assert(!submissionCatalogDraft({...approved,status:"PENDING_REVIEW"},{id:"beach-cam",placeId:"beach"}).ok);
const x=submissionCatalogDraft(approved,{id:"beach-cam",placeId:"beach",title:"Beach camera",country:"Thailand"});
console.assert(x.ok,"approved submission should create schema-valid conservative draft");
console.assert(x.draft.truth==="PREVIEW"&&x.draft.permission==="UNKNOWN"&&x.draft.health==="UNKNOWN"&&x.draft.playback==="PREVIEW","submission must not auto-promote to live/embed/healthy");
console.log("ERN submission catalog draft smoke checks passed");
