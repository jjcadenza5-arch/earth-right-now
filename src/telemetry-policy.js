const ALLOWED=new Set(["page_view","window_opened","place_opened","watch_earth_started","earth_search","earth_search_zero","external_source_opened","travel_option_opened","share_clicked"]);
const SEARCH_EVENTS=new Set(["earth_search","earth_search_zero"]);
function safeSearch(v){
 const s=String(v||"").normalize("NFKC").replace(/\s+/g," ").trim().slice(0,80);
 if(s.length<2)return"";
 if(/@|https?:\/\/|www\./i.test(s))return"";
 if(/(?:\+?\d[\d\s().-]{6,}\d)/.test(s))return"";
 return s.toLocaleLowerCase();
}
function clean(name,data={}){
 const out={};
 for(const [k,v] of Object.entries(data||{})){
  if(k==="query"&&SEARCH_EVENTS.has(name)){const q=safeSearch(v);if(q)out.query=q;continue}
  if(!["sourceId","placeId","truth","playback","provider","length","resultCount","offerId","intent","linkScope","affiliate","sponsored","route"].includes(k))continue;
  if(typeof v==="number")out[k]=Math.max(0,Math.min(v,1000));
  else if(typeof v==="string")out[k]=v.slice(0,k==="route"?120:120);
  else if(typeof v==="boolean")out[k]=v;
 }
 return out;
}
export function telemetryEnvelope(name,data={},at=new Date().toISOString()){
 if(!ALLOWED.has(name))return null;return{name,data:clean(name,data),at};
}
export function telemetryPolicy(){return{
 defaultEnabled:false,
 allowedEvents:[...ALLOWED],
 searchTerms:{allowedOnlyFor:[...SEARCH_EVENTS],maxLength:80,obviousEmailUrlPhoneLikeTermsDropped:true,aggregateStorageOnly:true},
 forbidden:["precise location","raw IP storage","contact email","business submission fields","My Earth favorites/recents","booking status","transaction value","revenue","commission amount","payment details","advertising profile","cross-site identifier"]
}}
