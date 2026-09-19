export function sessionResume({placeId=null,sourceId=null,surface=null,updatedAt=""}={}){
 return{version:1,placeId:typeof placeId==="string"?placeId:null,sourceId:typeof sourceId==="string"?sourceId:null,surface:typeof surface==="string"?surface:null,updatedAt:updatedAt||new Date().toISOString()};
}
export function validateSessionResume(x,{maxAgeHours=24,now=Date.now()}={}){
 if(!x||x.version!==1)return{ok:false,reason:"INVALID"};
 const t=Date.parse(x.updatedAt);if(!Number.isFinite(t)||now-t>maxAgeHours*36e5||t>now+300000)return{ok:false,reason:"EXPIRED"};
 if(!x.placeId&&!x.sourceId)return{ok:false,reason:"EMPTY"};
 return{ok:true,data:sessionResume(x)};
}
