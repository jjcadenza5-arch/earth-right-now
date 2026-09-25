export const EARTH_SIGNAL_STORAGE_METHODS=Object.freeze([
  "putSignal",
  "listSignals",
  "putReport",
  "deleteExpired"
]);

export function earthSignalStorageReadiness(adapter={}){
  const checks=Object.fromEntries(EARTH_SIGNAL_STORAGE_METHODS.map(name=>[name,typeof adapter?.[name]==="function"]));
  const missing=EARTH_SIGNAL_STORAGE_METHODS.filter(name=>!checks[name]);
  return{ready:missing.length===0,checks,missing};
}

export function assertEarthSignalStorage(adapter={}){
  const readiness=earthSignalStorageReadiness(adapter);
  if(!readiness.ready){
    const error=new Error("EARTH_SIGNAL_STORAGE_INCOMPLETE");
    error.code="EARTH_SIGNAL_STORAGE_INCOMPLETE";
    error.missing=readiness.missing;
    throw error;
  }
  return adapter;
}

export function createInMemoryEarthSignalStorage(seed=[]){
  let signals=[...(seed||[])];
  let reports=[];
  return{
    async putSignal(record){
      signals=signals.filter(x=>String(x.id)!==String(record.id));
      signals.push({...record});
      return{...record};
    },
    async listSignals({placeId=null,now=new Date()}={}){
      const t=now.getTime();
      return signals.filter(x=>{
        if(placeId&&x.placeId!==placeId)return false;
        const expiry=Date.parse(x.storageExpiryAt||"");
        return !Number.isFinite(expiry)||expiry>t;
      }).map(x=>({...x}));
    },
    async putReport(report){
      reports.push({...report});
      signals=signals.map(x=>String(x.id)===String(report.signalId)?{...x,reported:true}:x);
      return{...report};
    },
    async deleteExpired({now=new Date()}={}){
      const before=signals.length,t=now.getTime();
      signals=signals.filter(x=>{
        const expiry=Date.parse(x.storageExpiryAt||"");
        return !Number.isFinite(expiry)||expiry>t;
      });
      return{deleted:before-signals.length};
    },
    snapshot(){
      return{signals:signals.map(x=>({...x})),reports:reports.map(x=>({...x}))};
    }
  };
}
