import assert from "node:assert/strict";
import { sourceMetadataCompleteness,catalogMetadataAudit } from "../src/catalog-metadata-audit.js";

const full={id:"x",provider:"p",country:"c",region:"r",timeZone:"UTC",categories:["City"],rightsBasis:"basis",checkedAt:"2026-09-19",lastSuccessfulCheck:"2026-09-19",quality:80,story:"story",attribution:"p"};
assert.equal(sourceMetadataCompleteness(full).complete,true);
assert.equal(sourceMetadataCompleteness(full).score,100);

const degraded={...full,id:"degraded",lastSuccessfulCheck:null,lastFailedCheck:"2026-09-25",health:"DEGRADED"};
assert.equal(sourceMetadataCompleteness(degraded).complete,true);

const orbit={...full,id:"orbit",coordinateBasis:"DYNAMIC_ORBIT",timeZone:undefined,lastSuccessfulCheck:"2026-09-24"};
assert.equal(sourceMetadataCompleteness(orbit).complete,true);

const a=catalogMetadataAudit([full,{...full,id:"y",story:"",quality:null}]);
assert.equal(a.total,2);
assert.equal(a.incomplete,1);
assert.ok(a.rows[0].missing.includes("story"));
assert.ok(a.rows[0].missing.includes("quality"));

const noAttribution=sourceMetadataCompleteness({...full,id:"z",attribution:""});
assert.ok(noAttribution.missing.includes("attribution"));
console.log("ERN catalog metadata audit smoke checks passed");
