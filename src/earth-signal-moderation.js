export const EARTH_SIGNAL_MODERATION_POLICY=Object.freeze({
 reportReasons:Object.freeze(["WRONG_PLACE","MISLEADING","PRIVACY","UNSAFE","SPAM"]),
 autoPublishMedia:false,
 maxActiveSignalsPerPlacePerVisitor:3,
 requireExpiry:true
});
export function earthSignalModerationState(item={}){
 if(item.reported===true)return{visible:false,state:"REVIEW"};
 if(item.kind==="photo"||item.kind==="video")return item.moderation==="APPROVED"?{visible:true,state:"APPROVED"}:{visible:false,state:"PENDING"};
 return{visible:true,state:"STRUCTURED"};
}
export function earthSignalReport(input={}){
 const reason=EARTH_SIGNAL_MODERATION_POLICY.reportReasons.includes(input.reason)?input.reason:null;
 if(!reason||!input.signalId)return{ok:false,reason:"INVALID_REPORT"};
 return{ok:true,report:{signalId:String(input.signalId),reason,createdAt:input.createdAt||new Date().toISOString()}};
}
