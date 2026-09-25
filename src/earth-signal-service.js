import {earthSignalFeatureMode} from "./earth-signal-activation.js";
import {earthSignalCreateTransaction,earthSignalListProjection,earthSignalReportTransaction} from "./earth-signal-server-pipeline.js";
import {assertEarthSignalStorage} from "./earth-signal-storage-contract.js";

function requireActivated(capabilities={}){
  if(earthSignalFeatureMode(capabilities)!=="CONTRIBUTION_ENABLED"){
    const error=new Error("EARTH_SIGNALS_NOT_ACTIVATED");
    error.code="EARTH_SIGNALS_NOT_ACTIVATED";
    throw error;
  }
}

export async function createEarthSignalService(input={}, context={}){
  requireActivated(context.capabilities);
  const storage=assertEarthSignalStorage(context.storage);
  const now=context.now instanceof Date?context.now:new Date();
  const history=await storage.listSignals({now});
  const tx=earthSignalCreateTransaction(input,{...context,history,now});
  if(!tx.ok)return tx;
  await storage.putSignal(tx.record);
  return{...tx,persisted:true};
}

export async function listEarthSignalService(context={}){
  requireActivated(context.capabilities);
  const storage=assertEarthSignalStorage(context.storage);
  const now=context.now instanceof Date?context.now:new Date();
  const records=await storage.listSignals({placeId:context.placeId||null,now});
  return{ok:true,signals:earthSignalListProjection(records,{placeId:context.placeId||null,now})};
}

export async function reportEarthSignalService(input={}, context={}){
  requireActivated(context.capabilities);
  const storage=assertEarthSignalStorage(context.storage);
  const now=context.now instanceof Date?context.now:new Date();
  const records=await storage.listSignals({now});
  const tx=earthSignalReportTransaction(input,records);
  if(!tx.ok)return tx;
  await storage.putReport(tx.report);
  return{...tx,persisted:true};
}

export async function cleanupEarthSignalService(context={}){
  requireActivated(context.capabilities);
  const storage=assertEarthSignalStorage(context.storage);
  return storage.deleteExpired({now:context.now instanceof Date?context.now:new Date()});
}
