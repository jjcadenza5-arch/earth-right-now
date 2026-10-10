// Serialized into the static Places page; no homepage dependency or catalog fetch.
export function placeDirectoryRuntime(){
  const input=document.getElementById("placeFilter"),availability=document.getElementById("placeAvailability"),status=document.getElementById("placeFilterStatus"),empty=document.getElementById("placeFilterEmpty"),more=document.getElementById("placeSearchMore");
  if(!input||!availability||!status)return;
  // Fold Latin accents only: Thai and other scripts retain meaningful marks.
  const fold=value=>String(value||"").normalize("NFC").toLowerCase().split(/(\s+)/).map(token=>/[a-zÀ-ž]/i.test(token)?token.normalize("NFD").replace(/[\u0300-\u036f]/g,"").normalize("NFC"):token).join("");
  const rows=[...document.querySelectorAll("#placeGrid>li")].map(row=>({row,text:fold(row.dataset.search)}));
  const run=()=>{
    const q=input.value.trim(),tokens=fold(q).split(/\s+/).filter(Boolean),mode=availability.value;
    let shown=0,current=0,scheduled=0,reference=0;
    for(const {row,text}of rows){
      const state=row.dataset.viewState;
      const ok=tokens.every(t=>text.includes(t))&&(mode==="current"?state==="current":mode==="verified"?state==="current"||state==="scheduled":true);
      row.hidden=!ok;
      if(ok){shown++;if(state==="current")current++;else if(state==="scheduled")scheduled++;else reference++;}
    }
    status.textContent=shown+" matching place"+(shown===1?"":"s")+" · "+current+" current · "+scheduled+" outside published live hours · "+reference+" awaiting recheck or recovery";
    if(empty)empty.hidden=shown!==0;
    if(more)more.href="https://earthrightnow.app/?q="+encodeURIComponent(q);
  };
  const params=new URLSearchParams(location.search);
  input.value=params.get("q")||"";
  const mode=params.get("availability");
  if(["all","current","verified"].includes(mode))availability.value=mode;
  input.addEventListener("input",run);availability.addEventListener("change",run);run();
}
