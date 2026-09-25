import {earthSignalSubmissionEnvelope,earthSignalServerRecord,earthSignalPublicResponse} from "./earth-signal-api-contract.js";
import {earthSignalModerationState,earthSignalReport} from "./earth-signal-moderation.js";
import {earthSignalDeletionState} from "./earth-signal-retention.js";

export function earthSignalCreateTransaction(input={}, context={}){
  const knownPlaceIds=context.knownPlaceIds||null;
  const now=context.now instanceof Date?context.now:new Date();
  const request=earthSignalSubmissionEnvelope(input,{knownPlaceIds});
  if(!request.ok)return{ok:false,stage:"VALIDATION",reason:request.reason};

  const built=earthSignalServerRecord(request.request,{id:context.id,now});
  if(!built.ok)return{ok:false,stage:"SERVER_RECORD",reason:built.reason};

  const moderation=earthSignalModerationState(built.record);
  if(!moderation.visible)return{ok:false,stage:"MODERATION",reason:moderation.state};

  const deletion=earthSignalDeletionState(built.record,{now});
  return{
    ok:true,
    stage:"READY_TO_PERSIST",
    record:built.record,
    public:earthSignalPublicResponse(built.record),
    retention:{expiryAt:deletion.expiryAt,deleteNow:deletion.deleteNow}
  };
}

export function earthSignalListProjection(records=[], {placeId=null,now=new Date()}={}){
  return (records||[])
    .filter(record=>!placeId||record.placeId===placeId)
    .filter(record=>earthSignalModerationState(record).visible)
    .filter(record=>!earthSignalDeletionState(record,{now}).deleteNow)
    .map(earthSignalPublicResponse);
}

export function earthSignalReportTransaction(input={}, records=[]){
  const report=earthSignalReport(input);
  if(!report.ok)return{ok:false,stage:"VALIDATION",reason:report.reason};
  const target=(records||[]).find(record=>String(record.id)===String(report.report.signalId));
  if(!target)return{ok:false,stage:"LOOKUP",reason:"SIGNAL_NOT_FOUND"};
  return{
    ok:true,
    stage:"READY_TO_PERSIST",
    report:report.report,
    immediateVisibility:"HIDE_PENDING_REVIEW"
  };
}
