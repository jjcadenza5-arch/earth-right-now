import {affiliatePartner} from "./affiliate-partners.js";
import {offerVerificationState} from "./travel-offer-verification.js";

const DAY=864e5;
function nowMs(now){return now instanceof Date?now.getTime():Number(now)}
function dueState(days){
  if(!Number.isFinite(days))return "REVIEW_REQUIRED";
  if(days<0)return "EXPIRED";
  if(days<=7)return "DUE_7D";
  if(days<=14)return "DUE_14D";
  if(days<=30)return "DUE_30D";
  return "CURRENT";
}
function summarize(rows){
  const count=state=>rows.filter(x=>x.state===state).length;
  return{total:rows.length,current:count("CURRENT"),due30:count("DUE_30D"),due14:count("DUE_14D"),due7:count("DUE_7D"),expired:count("EXPIRED"),reviewRequired:count("REVIEW_REQUIRED"),inactive:count("INACTIVE")};
}
export function commercialVerificationHorizon({partners=[],offers=[]}={}, {now=new Date(),offerMaxAgeDays=90}={}){
  const n=nowMs(now);
  const partnerRows=(partners||[]).map(raw=>{
    const parsed=affiliatePartner(raw);
    if(!parsed)return{kind:"PARTNER",id:String(raw?.id||""),name:String(raw?.name||raw?.id||""),state:"REVIEW_REQUIRED",expiresAt:null,remainingDays:null,reason:"INVALID_PARTNER_RECORD"};
    if(!parsed.enabled||!parsed.affiliate)return{kind:"PARTNER",id:parsed.id,name:parsed.name,state:"INACTIVE",expiresAt:parsed.expiresAt||null,remainingDays:null,reason:"NOT_ACTIVE_AFFILIATE"};
    const verified=Date.parse(parsed.verifiedAt),expires=Date.parse(parsed.expiresAt);
    if(!Number.isFinite(verified)||!Number.isFinite(expires)||verified>n+5*60*1000||expires<=verified){
      return{kind:"PARTNER",id:parsed.id,name:parsed.name,state:"REVIEW_REQUIRED",expiresAt:Number.isFinite(expires)?new Date(expires).toISOString():null,remainingDays:null,reason:"INVALID_VERIFICATION_WINDOW"};
    }
    const remainingDays=(expires-n)/DAY;
    return{kind:"PARTNER",id:parsed.id,name:parsed.name,state:dueState(remainingDays),expiresAt:new Date(expires).toISOString(),remainingDays:Number(remainingDays.toFixed(1)),reason:null};
  });
  const offerRows=(offers||[]).map(raw=>{
    const state=offerVerificationState(raw,{now:n,maxAgeDays:offerMaxAgeDays});
    const verified=Date.parse(raw?.verifiedAt||"");
    const expires=Number.isFinite(verified)?verified+offerMaxAgeDays*DAY:NaN;
    if(state.reason==="VERIFICATION_EXPIRED"){
      const remainingDays=Number.isFinite(expires)?(expires-n)/DAY:null;
      return{kind:"OFFER",id:String(raw?.id||""),name:String(raw?.title||raw?.id||""),placeId:String(raw?.placeId||""),state:"EXPIRED",expiresAt:Number.isFinite(expires)?new Date(expires).toISOString():null,remainingDays:Number.isFinite(remainingDays)?Number(remainingDays.toFixed(1)):null,reason:state.reason};
    }
    if(!state.current){
      return{kind:"OFFER",id:String(raw?.id||""),name:String(raw?.title||raw?.id||""),placeId:String(raw?.placeId||""),state:"REVIEW_REQUIRED",expiresAt:Number.isFinite(expires)?new Date(expires).toISOString():null,remainingDays:null,reason:state.reason||"UNVERIFIED"};
    }
    const remainingDays=(expires-n)/DAY;
    return{kind:"OFFER",id:String(raw.id||""),name:String(raw.title||raw.id||""),placeId:String(raw.placeId||""),state:dueState(remainingDays),expiresAt:new Date(expires).toISOString(),remainingDays:Number(remainingDays.toFixed(1)),reason:null};
  });
  const all=[...partnerRows,...offerRows];
  const urgent=all.filter(x=>["DUE_30D","DUE_14D","DUE_7D","EXPIRED","REVIEW_REQUIRED"].includes(x.state)).sort((a,b)=>{
    const rank={EXPIRED:0,REVIEW_REQUIRED:1,DUE_7D:2,DUE_14D:3,DUE_30D:4};
    return(rank[a.state]??9)-(rank[b.state]??9)||(a.remainingDays??Infinity)-(b.remainingDays??Infinity)||a.id.localeCompare(b.id);
  });
  return{
    generatedAt:new Date(n).toISOString(),
    offerMaxAgeDays,
    summary:{partners:summarize(partnerRows),offers:summarize(offerRows),attention:urgent.length},
    urgent,
    partners:partnerRows,
    offers:offerRows,
    safety:{automaticActivationAllowed:false,automaticRenewalAllowed:false,publicRankingAffected:false,inventedInventoryAllowed:false},
    note:"Read-only commercial verification horizon. It warns before partner/offer verification expires and never creates, renews, activates or ranks commercial inventory."
  };
}
