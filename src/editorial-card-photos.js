// Approved exact-place photographs cover discovery cards; viewers keep their source media.
export function approvedPhotoLicense(photo){
  const licenses={"CC BY-SA 2.5":"https://creativecommons.org/licenses/by-sa/2.5/","CC BY 4.0":"https://creativecommons.org/licenses/by/4.0/","CC BY-SA 4.0":"https://creativecommons.org/licenses/by-sa/4.0/","CC BY-SA 2.0":"https://creativecommons.org/licenses/by-sa/2.0/","CC BY 2.0":"https://creativecommons.org/licenses/by/2.0/"};
  return Object.hasOwn(licenses,photo?.license)&&licenses[photo.license]===photo.licenseUrl;
}
export function approvedPhotos(register){
  if(register?.publicActivationAllowed!==true||register.homepageActivationAllowed!==true)return new Map();
  return new Map((register.candidates||[]).filter(p=>p.publicActivationAllowed===true&&p.homepageActivationAllowed===true&&p.status==="APPROVED_EDITORIAL_DESTINATION_PAGE_ONLY"&&p.placeId&&p.creator&&approvedPhotoLicense(p)&&/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/.test(p.filePage)&&/^https:\/\/(upload|thumb)\.wikimedia\.org\//.test(p.imageUrl)).map(p=>[p.placeId,p]));
}
export function eligibleVisual(card){
  return card.querySelector('.result-visual[data-visual-kind]:not([data-visual-kind="editorial"]),.wander-visual[data-visual-kind]:not([data-visual-kind="editorial"]),.card-visual[data-visual-kind]:not([data-visual-kind="editorial"])');
}
function credit(photo){
  const p=document.createElement("p");p.className="photo-credit";p.append(photo.dateTaken?`Photo dated ${photo.dateTaken} · `:"Archival photo · ","Photo: ");
  for(const [label,url] of [[photo.creator,photo.filePage],[photo.license,photo.licenseUrl]]){
    const a=document.createElement("a");a.textContent=label;a.href=url;a.target="_blank";a.rel="noopener noreferrer";p.append(a," · ");
  }
  p.append("Display crop");return p;
}
async function start(){
  const response=await fetch(new URL("../data/destination-photo-rights-candidates.json",import.meta.url));
  if(!response.ok)return;
  const photos=approvedPhotos(await response.json()),attempted=new WeakSet();let queued=false;
  const scan=()=>{
    queued=false;
    document.querySelectorAll(".result-card[data-place],.wander-card[data-place],.window-card[data-place]").forEach(card=>{
      const photo=photos.get(card.dataset.place),visual=eligibleVisual(card);
      if(!photo||!visual||attempted.has(visual))return;
      attempted.add(visual);
      const img=new Image();img.alt=photo.alt||`Editorial photograph of ${photo.placeId.replaceAll("-"," ")}`;img.decoding="async";
      img.onload=()=>{
        if(!card.isConnected||!eligibleVisual(card))return;
        const wrapper=document.createElement("div");wrapper.className="editorial-card";
        card.before(wrapper);wrapper.append(card,credit(photo));
        visual.querySelectorAll("img").forEach(old=>old.remove());visual.append(img);visual.dataset.visualKind="editorial";
      };
      // An unavailable photo leaves the existing cover untouched.
      img.onerror=()=>{};img.src=photo.imageUrl;
    });
  };
  const observer=new MutationObserver(()=>{if(!queued){queued=true;requestAnimationFrame(scan)}});
  observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["data-visual-kind"]});scan();
}
if(typeof document!=="undefined")start().catch(()=>{});
