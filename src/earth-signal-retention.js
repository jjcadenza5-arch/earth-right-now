import {EARTH_SIGNAL_TTL_MINUTES} from "./earth-signals.js";
export function earthSignalExpiryAt(createdAt){
 const t=new Date(createdAt);if(!Number.isFinite(t.getTime()))return null;
 return new Date(t.getTime()+EARTH_SIGNAL_TTL_MINUTES*60000).toISOString();
}
export function earthSignalDeletionState(item,{now=new Date()}={}){
 const expiry=item?.storageExpiryAt||earthSignalExpiryAt(item?.createdAt);
 if(!expiry)return{expired:true,deleteNow:true,expiryAt:null};
 const expired=new Date(expiry).getTime()<=now.getTime();
 return{expired,deleteNow:expired,expiryAt:expiry};
}
export function earthSignalRetentionRecord(item={}){
 return{id:item.id||null,placeId:item.placeId||null,createdAt:item.createdAt||null,expiryAt:item.storageExpiryAt||earthSignalExpiryAt(item.createdAt),permanent:false};
}
