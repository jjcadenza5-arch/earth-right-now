import {guideAiEscalationDecision} from "./guide-ai-routing.js";
import {GUIDE_AI_CAPABILITIES} from "./guide-ai-capabilities.js";
import {guideAiActivation} from "./guide-ai-activation.js";

const ENDPOINT="https://ern-guide-api.jjcadenza6.workers.dev/api/guide";
const PUBLIC_AI=guideAiActivation(GUIDE_AI_CAPABILITIES).ready;
const VERSION="2026-09-25.v2";
const form=document.querySelector("#guideForm"),input=document.querySelector("#guideInput"),reply=document.querySelector("#guideReply"),results=document.querySelector("#guideResults");
if(form&&input&&reply&&results){
 let seq=0;
 const reqId=()=>{const b=crypto.getRandomValues(new Uint8Array(16));return"req_"+[...b].map(x=>x.toString(16).padStart(2,"0")).join("")};
 const lang=()=>document.documentElement.lang||localStorage.getItem("ern-language")||"en";
 const snapshot=()=>({items:[...results.querySelectorAll("button.guide-result")],link:results.querySelector("a.guide-result-link")||null});
 const maybeAsk=async q=>{
  if(!PUBLIC_AI){reply.dataset.aiState="deterministic";return}
  const my=++seq,det=snapshot(),decision=guideAiEscalationDecision({query:q,deterministic:det});
  if(!decision.eligible)return;
  const fallback=reply.textContent;
  reply.dataset.aiState="thinking";
  try{
   const r=await fetch(ENDPOINT,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({version:VERSION,query:String(q||"").trim(),language:lang(),requestId:reqId()})});
   if(my!==seq||!r.ok){reply.dataset.aiState="fallback";return}
   const body=await r.json();
   if(my!==seq||!body?.answer){reply.dataset.aiState="fallback";return}
   reply.textContent=body.answer;
   reply.dataset.aiState="generated";
  }catch{if(my===seq){reply.textContent=fallback;reply.dataset.aiState="fallback"}}
 };
 form.addEventListener("submit",()=>setTimeout(()=>maybeAsk(input.value),0));
 document.addEventListener("click",e=>{const b=e.target.closest("[data-guide]");if(b)setTimeout(()=>maybeAsk(b.dataset.guide||""),0)});
}
