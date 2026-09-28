import {loadParticipationPublicConfig} from "./participation-public-config.js";
import {createEarthSignalClient} from "./earth-signal-client.js";
import {EARTH_SIGNAL_TYPES} from "./earth-signals.js";

const LABEL_TO_TYPE={
  "Beautiful light":"BEAUTIFUL_LIGHT",
  "Raining":"RAINING",
  "Busy":"BUSY",
  "Peaceful":"PEACEFUL",
  "Something happening":"SOMETHING_HAPPENING",
  "Worth seeing":"WORTH_SEEING"
};

const form=document.getElementById("signalForm");
const placeInput=document.getElementById("signalPlace");
const placeList=document.getElementById("signalPlaces");
const box=document.getElementById("signalPreview");
const badge=document.getElementById("signalBadge");
const placeLabel=document.getElementById("signalPlaceLabel");
const expiry=document.getElementById("signalExpiry");
const mode=document.getElementById("signalMode");
const submit=document.getElementById("signalSubmit");
const nearWrap=document.getElementById("signalNearWrap");
const near=document.getElementById("signalNear");
const result=document.getElementById("signalResult");
const pulseSection=document.getElementById("signalPulseSection");
const pulseRefresh=document.getElementById("signalPulseRefresh");
const pulse=document.getElementById("signalPulse");

let sources=[],byLabel=new Map(),client=createEarthSignalClient({});

function canonicalPlaces(rows=[]){
  const map=new Map();
  for(const s of rows){
    const placeId=String(s.placeId||s.id||"").trim();
    const label=String(s.place||s.title||"").trim();
    if(placeId&&label&&!map.has(label))map.set(label,{placeId,label});
  }
  return [...map.values()].sort((a,b)=>a.label.localeCompare(b.label));
}
function showPreview({label,type,live=false,expiresAt=null}){
  badge.textContent=label;
  placeLabel.textContent=placeInput.value.trim();
  const end=expiresAt?new Date(expiresAt):new Date(Date.now()+45*60000);
  expiry.textContent=(live?"Submitted · expires around ":"Preview only · would expire around ")+end.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});
  box.hidden=false;
}
async function boot(){
  const [cfg,sourceResponse]=await Promise.all([
    loadParticipationPublicConfig(),
    fetch("./data/sources.json",{cache:"no-store"}).catch(()=>null)
  ]);
  sources=sourceResponse?.ok?await sourceResponse.json():[];
  const places=canonicalPlaces(Array.isArray(sources)?sources:[]);
  byLabel=new Map(places.map(x=>[x.label,x]));
  placeList.innerHTML=places.map(x=>`<option value="${x.label.replace(/"/g,"&quot;")}"></option>`).join("");
  client=createEarthSignalClient({
    endpointUrl:cfg.earthSignals?.endpointUrl||"",
    publicActivationAllowed:cfg.earthSignals?.publicActive===true
  });
  if(client.config.enabled){
    mode.textContent="Earth Signals are open in a limited structured pilot.";
    submit.textContent="Share Earth Signal";
    nearWrap.hidden=false;
    pulseSection.hidden=false;
  }else{
    mode.textContent="Uploads are intentionally not active yet. This remains a local preview until verified deployment and explicit activation are complete.";
    submit.textContent="Preview locally";
    nearWrap.hidden=true;
    pulseSection.hidden=true;
  }
}

async function refreshPulse(){
  if(!client.config.enabled){pulseSection.hidden=true;return}
  const selected=byLabel.get(placeInput.value.trim());
  if(!selected){pulse.textContent="Choose a real ERN place first.";return}
  pulseRefresh.disabled=true;
  try{
    const response=await client.list(selected.placeId);
    if(!response.ok){pulse.textContent="Recent visitor signals are unavailable right now.";return}
    if(!response.signals.length){pulse.textContent="No recent visitor signals for this place.";return}
    pulse.innerHTML=response.signals.slice(0,12).map(s=>{
      const label=Object.entries(LABEL_TO_TYPE).find(([,type])=>type===s.type)?.[0]||"Visitor signal";
      const when=s.createdAt?new Date(s.createdAt).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}):"recently";
      const location=s.nearPlaceVerified?" · marked near this place":"";
      return `<p><strong>${label}</strong> · ${when}${location}<br><small>Visitor report · not independently verified</small></p>`;
    }).join("");
  }finally{pulseRefresh.disabled=false}
}
pulseRefresh?.addEventListener("click",refreshPulse);
placeInput?.addEventListener("change",()=>{if(client.config.enabled)refreshPulse()});

form?.addEventListener("submit",async e=>{
  e.preventDefault();
  result.textContent="";
  const label=placeInput.value.trim(), place=byLabel.get(label);
  const raw=document.getElementById("signalType").value;
  const type=LABEL_TO_TYPE[raw]||null;
  if(!place||!type||!EARTH_SIGNAL_TYPES.includes(type)){
    result.textContent="Choose a real ERN place and one structured signal.";
    return;
  }
  if(!client.config.enabled){
    showPreview({label:raw,type});
    return;
  }
  submit.disabled=true;
  try{
    const response=await client.submit({
      type,
      placeId:place.placeId,
      placeLabel:place.label,
      locationPermission:near?.checked===true,
      nearPlace:near?.checked===true
    });
    if(response.ok){
      showPreview({label:raw,type,live:true,expiresAt:response.signal?.expiresAt});
      result.textContent="Shared as a short-lived visitor signal. It is not independent verification.";
      await refreshPulse();
    }else{
      result.textContent="Signal was not sent: "+(response.reason||"request failed");
    }
  }finally{submit.disabled=false}
});
boot();
