import {events} from "./telemetry.js";

let offersPromise=null;
async function offers(){
  if(!offersPromise)offersPromise=fetch("./data/travel-offers.json",{cache:"no-store"}).then(r=>r.ok?r.json():[]).catch(()=>[]);
  const list=await offersPromise;
  return Array.isArray(list)?list:[];
}
function currentVerified(offer){
  if(!offer||offer.verified!==true||!offer.id||!offer.placeId||!offer.intent)return false;
  const t=Date.parse(offer.verifiedAt||"");
  if(!Number.isFinite(t)||t>Date.now()+300000)return false;
  return (Date.now()-t)/86400000<=90;
}
document.addEventListener("click",async event=>{
  const link=event.target?.closest?.("a[data-offer-id]");
  if(!link)return;
  const id=String(link.dataset.offerId||"");
  if(!id)return;
  const offer=(await offers()).find(x=>String(x?.id||"")===id);
  if(!currentVerified(offer))return;
  events.travelOption(offer);
},{capture:true});
