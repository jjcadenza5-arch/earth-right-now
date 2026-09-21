import {EARTH_SIGNAL_TYPES} from "./earth-signals.js";
export const EARTH_SIGNAL_INPUT_POLICY=Object.freeze({accountRequired:false,freeText:false,preciseLocationPublic:false,ttlMinutes:45});
export function earthSignalDraft(input={}){
 const type=EARTH_SIGNAL_TYPES.includes(input.type)?input.type:null,placeId=String(input.placeId||"").trim();
 if(!type||!placeId)return{ok:false,reason:"INVALID_SIGNAL"};
 return{ok:true,signal:{type,placeId,placeLabel:String(input.placeLabel||"").trim()||null,createdAt:input.createdAt||new Date().toISOString(),locationEvidence:input.locationPermission===true&&input.nearPlace===true?"NEAR_PLACE":"UNVERIFIED"}};
}
export function earthSignalSubmissionReady(input={}){
 const draft=earthSignalDraft(input);if(!draft.ok)return draft;
 return{ok:false,reason:"TRANSPORT_DISABLED",draft:draft.signal};
}
