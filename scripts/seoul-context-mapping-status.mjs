import fs from "node:fs";
import {seoulContextMappingForPlace,seoulMappingValidationTarget} from "../src/seoul-context-mapping.js";
const registry=JSON.parse(fs.readFileSync(new URL("../data/seoul-context-place-mappings.json",import.meta.url),"utf8"));
const sources=JSON.parse(fs.readFileSync(new URL("../data/sources.json",import.meta.url),"utf8"));
const fail=[],ids=new Set(sources.map(x=>x.id)),placeIds=new Set(sources.map(x=>x.placeId||x.id));
if(registry.publicActivationAllowed!==false)fail.push("Seoul mapping registry must remain public-OFF");
if(registry.invariants?.automaticMappingAllowed!==false)fail.push("automatic Seoul place mapping must remain disabled");
if(registry.invariants?.fuzzyNameMappingAllowed!==false)fail.push("fuzzy Seoul place mapping must remain disabled");
if(registry.invariants?.proximityOnlyMappingAllowed!==false)fail.push("proximity-only Seoul mapping must remain disabled");
if(registry.invariants?.realProviderResponseRequiredBeforeActivation!==true)fail.push("real provider response must be required before mapping activation");
for(const row of registry.mappings||[]){
 if(!row.ernPlaceId||!placeIds.has(row.ernPlaceId))fail.push(`${row.ernPlaceId||"UNKNOWN"}: ERN place id missing from catalog`);
 for(const id of row.ernSourceIds||[])if(!ids.has(id))fail.push(`${row.ernPlaceId}: source id missing from catalog: ${id}`);
 if(row.mayCreateLiveLabel!==false)fail.push(`${row.ernPlaceId}: mapping may create LIVE label`);
 if(row.mayAffectWatchEarthRanking!==false)fail.push(`${row.ernPlaceId}: mapping may affect Watch Earth ranking`);
 if(row.state!=="APPROVED_VALIDATED"&&(row.mayPublishContext!==false||row.realResponseValidated!==false))fail.push(`${row.ernPlaceId}: unvalidated mapping may publish context`);
 const target=seoulMappingValidationTarget(registry,row.ernPlaceId);
 if(!target.ok)fail.push(`${row.ernPlaceId}: validation target incomplete: ${target.reason}`);
 const publicMap=seoulContextMappingForPlace(registry,row.ernPlaceId);
 if(row.state!=="APPROVED_VALIDATED"&&publicMap.ok)fail.push(`${row.ernPlaceId}: unvalidated mapping became public`);
}
console.log(JSON.stringify({ok:fail.length===0,publicActivationAllowed:registry.publicActivationAllowed,total:registry.mappings?.length||0,mappings:(registry.mappings||[]).map(x=>({placeId:x.ernPlaceId,state:x.state,mayPublishContext:x.mayPublishContext,realResponseValidated:x.realResponseValidated})),fail},null,2));
if(fail.length)process.exit(1);
