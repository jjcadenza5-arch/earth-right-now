export function storageAvailability(storage=typeof localStorage!=="undefined"?localStorage:null){
 if(!storage)return{ok:false,reason:"UNAVAILABLE"};
 const key="ern:storage-check";try{storage.setItem(key,"1");storage.removeItem(key);return{ok:true,reason:null}}catch{return{ok:false,reason:"BLOCKED"}}
}
export function localDataNotice(result){return result?.ok?"":"Private/local storage is unavailable. Favorites, recent places and My Earth changes may not persist after this session."}
