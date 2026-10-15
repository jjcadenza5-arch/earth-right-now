// Lazy camera catalog only; never bypass source truth or currentness gates.
export const SUPPLEMENTAL_FILES=Object.freeze(["search-supplemental.json","search-supplemental-2.json"]);
export const SUPPLEMENTAL_PART_LIMIT=500;
export function mergeSupplementalParts(parts){
 const ids=new Set(),rows=[];
 for(const part of parts){
  if(!Array.isArray(part)||part.length>SUPPLEMENTAL_PART_LIMIT)throw new Error("Invalid supplemental catalog part");
  for(const row of part){
   if(!row?.id||ids.has(row.id))throw new Error("Missing or duplicate supplemental source id");
   ids.add(row.id);rows.push(row);
  }
 }
 return rows;
}
export async function loadSupplemental(fetcher=fetch,base="./data/"){
 const parts=await Promise.all(SUPPLEMENTAL_FILES.map(file=>fetcher(base+file,{cache:"no-store"}).then(r=>r.ok?r.json():[]).catch(()=>[])));
 return mergeSupplementalParts(parts);
}
export async function loadSearchExtras(fetcher=fetch){
 return Promise.all([loadSupplemental(fetcher),fetcher("./data/place-search-aliases.json",{cache:"no-store"}).then(r=>r.ok?r.json():{}).catch(()=>({}))]);
}
