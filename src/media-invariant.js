import { mediaCount } from "./media-lifecycle.js";

export function mediaInvariant(root){
 const count=mediaCount(root);
 return{ok:count<=1,count,code:count<=1?"ONE_PLAYER_OK":"MULTIPLE_ACTIVE_MEDIA"};
}
export function assertMediaInvariant(root){
 const result=mediaInvariant(root);
 if(!result.ok)throw new Error(`ERN one-player invariant violated: ${result.count} active media elements`);
 return result;
}
