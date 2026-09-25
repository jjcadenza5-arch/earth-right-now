import {earthSignalFeatureMode} from "./earth-signal-activation.js";
import {earthSignalCreateTransaction,earthSignalListProjection,earthSignalReportTransaction} from "./earth-signal-server-pipeline.js";
import {assertEarthSignalStorage} from "./earth-signal-storage-contract.js";
import {earthSignalRateSubject} from "./earth-signal-rate-limiter-contract.js";

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
  const limiter=context.rateLimiter;
  if(!limiter||typeof limiter.check!=="function"||typeof limiter.commit!=="function"){
    const error=new Error("EARTH_SIGNAL_RATE_LIMITER_REQUIRED");
    error.code="EARTH_SIGNAL_RATE_LIMITER_REQUIRED";
    throw error;
  }
  const subject=earthSignalRateSubject({subject:context.rateSubject});
  if(!subject.ok)return{ok:false,stage:"RATE_LIMIT",reason:subject.reason};
  const now=context.now instanceof Date?context.now:new Date();
  const draft=earthSignalCreateTransaction(input,{...context,now});
  if(!draft.ok)return draft;
  const rate=await limiter.check({subject:subject.subject,placeId:draft.record.placeId,now});
  if(!rate.allowed)return{ok:false,stage:"RATE_LIMIT",reason:rate.reason};
  const committed=await limiter.commit({subject:subject.subject,placeId:draft.record.placeId,now});
  if(!committed.allowed)return{ok:false,stage:"RATE_LIMIT",reason:committed.reason};
  await storage.putSignal(draft.record);
  return{...draft,rate:{remaining:committed.remaining},persisted:true};
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
  const limiter=context.rateLimiter;
  if(!limiter||typeof limiter.check!=="function"||typeof limiter.commit!=="function"){
    const error=new Error("EARTH_SIGNAL_RATE_LIMITER_REQUIRED");
    error.code="EARTH_SIGNAL_RATE_LIMITER_REQUIRED";
    throw error;
  }
  const subject=earthSignalRateSubject({subject:context.rateSubject});
  if(!subject.ok)return{ok:false,stage:"RATE_LIMIT",reason:subject.reason};
  const now=context.now instanceof Date?context.now:new Date();
  const records=await storage.listSignals({now});
  const tx=earthSignalReportTransaction(input,records);
  if(!tx.ok)return tx;
  const rate=await limiter.commit({subject:subject.subject,action:"REPORT",targetId:tx.report.signalId,now});
  if(!rate.allowed)return{ok:false,stage:"RATE_LIMIT",reason:rate.reason};
  await storage.putReport(tx.report);
  return{...tx,rate:{remaining:rate.remaining},persisted:true};
}

export async function cleanupEarthSignalService(context={}){
  requireActivated(context.capabilities);
  const storage=assertEarthSignalStorage(context.storage);
  return storage.deleteExpired({now:context.now instanceof Date?context.now:new Date()});
}
