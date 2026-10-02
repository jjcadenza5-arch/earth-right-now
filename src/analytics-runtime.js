import {analyticsConfig,analyticsReady} from "./analytics-config.js";
import {telemetryEnvelope} from "./telemetry-policy.js";

const DNT=()=>navigator.doNotTrack==="1"||globalThis.doNotTrack==="1"||navigator.globalPrivacyControl===true;
const VISITOR_KEY="ern:analytics-visitor:v1";
function visitorId(){
  try{
    let id=localStorage.getItem(VISITOR_KEY);
    if(!id){id=crypto.randomUUID?.()||("ern-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2));localStorage.setItem(VISITOR_KEY,id)}
    return id;
  }catch{return crypto.randomUUID?.()||""}
}
function deviceClass(){
  const w=Math.max(Number(globalThis.innerWidth)||0,Number(screen?.width)||0);
  if(w&&w<768)return"mobile";
  if(w&&w<1100)return"tablet";
  return"desktop";
}
function referrerHost(){
  try{return document.referrer?new URL(document.referrer).hostname.replace(/^www\./,""):""}catch{return""}
}
function context(){return{device:deviceClass(),referrerHost:referrerHost()}}
async function sendEnvelope(event){
  if(!analyticsReady()||DNT()||!event)return false;
  const body=JSON.stringify({event,visitorId:visitorId(),context:context()});
  try{
    const r=await fetch(analyticsConfig.endpoint,{method:"POST",headers:{"content-type":"text/plain;charset=UTF-8"},body,keepalive:true,credentials:"omit",referrerPolicy:"strict-origin-when-cross-origin"});
    return r.ok;
  }catch{return false}
}
if(analyticsReady()&&!DNT()){
  globalThis.ERN_TELEMETRY=event=>{void sendEnvelope(event);return true};
  globalThis.ERN_EVENT=(name,data={})=>{const e=telemetryEnvelope(name,data);if(!e)return false;void sendEnvelope(e);return true};
  const queued=Array.isArray(globalThis.ERN_EVENT_QUEUE)?globalThis.ERN_EVENT_QUEUE.splice(0):[];for(const [name,data] of queued)globalThis.ERN_EVENT(name,data);
  const sendPage=()=>globalThis.ERN_EVENT?.("page_view",{route:location.pathname||"/"});
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",sendPage,{once:true});else queueMicrotask(sendPage);
}
export const analyticsRuntime={enabled:analyticsReady()&&!DNT(),privacyMode:analyticsConfig.privacyMode};
