export function assertNowMomentPhotoMetadataStore(store){
  const methods=["put","get","list","update","listExpired","delete"];
  for(const m of methods)if(typeof store?.[m]!=="function")throw Object.assign(new Error("PHOTO_METADATA_STORE_REQUIRED"),{code:"PHOTO_METADATA_STORE_REQUIRED"});
  return store;
}
export function assertNowMomentPhotoObjectStore(store){
  const methods=["put","get","delete"];
  for(const m of methods)if(typeof store?.[m]!=="function")throw Object.assign(new Error("PHOTO_OBJECT_STORE_REQUIRED"),{code:"PHOTO_OBJECT_STORE_REQUIRED"});
  return store;
}

export function memoryNowMomentPhotoStores(){
  const metadata=new Map(),objects=new Map();
  return{
    metadata:{
      async put(record){metadata.set(record.id,{...record});return{ok:true}},
      async get(id){return metadata.get(id)||null},
      async list({placeId=null,now=new Date()}={}){const t=now.getTime();return [...metadata.values()].filter(r=>(!placeId||r.placeId===placeId)&&Date.parse(r.storageExpiryAt)>t)},
      async update(id,patch){const r=metadata.get(id);if(!r)return null;const n={...r,...patch};metadata.set(id,n);return n},
      async listExpired({now=new Date()}={}){const t=now.getTime();return [...metadata.values()].filter(r=>Date.parse(r.storageExpiryAt)<=t).map(r=>({...r}))},
      async delete(id){return metadata.delete(id)}
    },
    objects:{
      async put(key,bytes,{contentType}={}){objects.set(key,{bytes:new Uint8Array(bytes),contentType});return{ok:true}},
      async get(key){return objects.get(key)||null},
      async delete(key){return objects.delete(key)}
    },
    debug:{metadata,objects}
  };
}
