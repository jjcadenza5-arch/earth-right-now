import assert from "node:assert/strict";
import fs from "node:fs";
const builder=fs.readFileSync(new URL("../scripts/build-destination-pages.mjs",import.meta.url),"utf8");
assert.match(builder,/sourceAvailabilityState/,"destination pages must inspect source availability schedules");
assert.match(builder,/Outside published live hours/,"scheduled-closed sources need a truthful public section");
assert.match(builder,/embedPlaybackProofCurrent/,"inside-ERN embeds need fresh playback proof on destination pages");
assert.match(builder,/PLAYBACK RECHECK DUE/,"expired playback proof must not retain a live label");
assert.match(builder,/Playback checked/,"inside-ERN destination cards should expose playback proof date separately from source verification");
assert.match(builder,/Open live source/,"verified external live destination cards should use positive live-source wording");
assert.match(builder,/const offers=currentItems\.length\?offerForPlace\(id\):\[\]/,"stale-only pages must not surface affiliate offers");
assert.match(builder,/currentTravelOffer/,"affiliate offers must pass current verification");
assert.match(builder,/activeAffiliatePartner/,"affiliate offers must require an active partner");
assert.match(builder,/Affiliate availability never affects ERN source ranking/,"affiliate ranking independence must be disclosed");
assert.match(builder,/These entries are not paid placements/,"reviewed local entries must remain explicitly non-paid");
assert.match(builder,/x\.address/,"reviewed local-place addresses should appear on destination pages when verified");
assert.match(builder,/const indexable=currentItems\.length>0\|\|scheduledClosedItems\.length>0/,"stale-only destination pages must be noindex");
assert.match(builder,/indexable\?"index,follow":"noindex,follow"/,"destination robots state must follow current/scheduled evidence");
assert.match(builder,/if\(indexable\)urls\.push/,"noindex destination pages must stay out of the sitemap");
assert.match(builder,/const primaryCta=currentItems\.length/,"destination primary CTA must depend on current truth");
assert.match(builder,/Explore current ERN windows/,"non-current destination pages need current-alternative CTA");
assert.match(builder,/const structuredRows=placeRows\.filter\(p=>p\.indexable\)/,"structured place directory must exclude reference-only rows");
assert.match(builder,/Number\(b\.indexable\)-Number\(a\.indexable\)/,"place directory should list current/scheduled destinations before reference-only rows");
assert.match(builder,/placeIndexable\(rows\)/,"related destination links should exclude reference-only stale places");
console.log("Destination pages preserve schedule, playback, local-place and commercial truth boundaries");

assert.match(builder,/Explore related places/,"Phase 6 destination pages should expose related discovery");
assert.match(builder,/never by payment/,"related destination discovery must disclose ranking independence");
assert.match(builder,/preferredCategories/,"related destination discovery should use category similarity");

assert.match(builder,/id="placeFilter"/,"Phase 6 Places directory should provide deterministic filtering");
assert.match(builder,/data-search=/,"Places directory rows should expose local filter text only");
assert.match(builder,/matching place/,"Places directory should report filtered result count accessibly");

assert.match(builder,/discoverDefinitions/,"Phase 6 should define deterministic crawlable discovery categories");
assert.match(builder,/discover\/index\.html/,"Phase 6 should build a crawlable Discover index");
assert.match(builder,/base\+"discover\/"\+def\.id/,"Phase 6 category pages should use stable canonical URLs");
assert.match(builder,/editorialCollectionRows\(structuredRows,def\)/,"Discovery category membership should use the shared deterministic collection engine");
assert.match(builder,/const rows=editorialCollectionRows\(structuredRows,def\)/,"Discovery category pages must only derive from indexable current\/schedule-verified places");
assert.match(builder,/Categories are editorial discovery paths; they never change source truth or paid ranking/,"Discovery index must preserve truth and ranking boundaries");
assert.match(builder,/\.\.\.discoverRows\.map\(x=>\(\{loc:x\.url,lastmod:x\.lastmod\}\)\)/,"Discovery category pages should be included in the sitemap");

assert.match(builder,/EDITORIAL_COLLECTIONS/,"Phase 8 Discover pages should use the shared editorial collection registry");
assert.match(builder,/editorialCollectionRows/,"Phase 8 collection membership should come from the shared deterministic engine");
assert.match(builder,/Share this collection/,"Phase 8 crawlable collection pages should expose channel-neutral sharing");
assert.match(builder,/navigator\.share/,"Collection sharing should prefer native Web Share");
assert.match(builder,/navigator\.clipboard/,"Collection sharing should retain a copy-link fallback");

assert.match(builder,/search-supplemental\.json/,"crawlable destination build must include the lazy supplemental Search catalog");
assert.match(builder,/const sources=\[\.\.\.coreSources,\.\.\.searchSupplemental\]/,"supplemental Search places should gain destination pages without changing startup catalog loading");

assert.match(builder,/ERN source provider/,"structured destination facts should expose provider");
assert.match(builder,/ERN playback mode/,"structured destination facts should expose playback mode");
assert.match(builder,/ERN last checked/,"structured destination facts should expose reliable verification time when available");
assert.match(builder,/relatedLink/,"related destination links should also be machine-readable");
assert.match(builder,/place-search-aliases\.json/,"crawlable destination pages must consume multilingual alias sidecar");
assert.match(builder,/safe\(s\.officialUrl\|\|s\.sourceUrl\)/,"crawlable destination source and citation links must prefer official provider pages over raw current-image endpoints");
console.log("Destination understanding enrichment contract passed");

// Exercise real generated HTML with bounded fixtures, independent of wall-clock freshness.
const {mkdtempSync,rmSync,mkdirSync,writeFileSync,readFileSync}=fs;
const {tmpdir}=await import('node:os');
const {join}=await import('node:path');
const {spawnSync}=await import('node:child_process');
const {fileURLToPath}=await import('node:url');
const fixture=mkdtempSync(join(tmpdir(),'ern-destination-local-'));
try{
  mkdirSync(join(fixture,'data'));
  const realSources=JSON.parse(readFileSync(new URL('../data/sources.json',import.meta.url),'utf8'));
  const original=realSources.find(s=>s.placeId==='rovaniemi-santa-claus-village');
  assert.ok(original,'fixture destination must exist');
  const current={...original,checkedAt:'2026-10-10T03:00:00Z',lastSuccessfulCheck:'2026-10-10T03:00:00Z',playbackVerifiedAt:'2026-10-10T03:01:00Z'};
  const lake={...realSources.find(s=>s.placeId==='oeschinensee'),checkedAt:current.checkedAt,lastSuccessfulCheck:current.lastSuccessfulCheck};
  const held={...current,id:'fixture-security-hold',placeId:'fixture-security-hold',health:'DEGRADED',sourceLinkHold:true,sourceUrl:'https://www.utsav.gov.in/livedarshan',officialUrl:undefined};
  const stale={...current,id:'fixture-stale',placeId:'fixture-stale',checkedAt:'2025-01-01T00:00:00Z',lastSuccessfulCheck:'2025-01-01T00:00:00Z',playbackVerifiedAt:'2025-01-01T00:00:00Z'};
  const good=JSON.parse(readFileSync(new URL('../data/local-directory-supplemental.json',import.meta.url),'utf8')).find(x=>x.id==='local-santa-claus-office');
  const row=(id,changes={})=>({...good,id,name:id,...changes});
  const inputs={'sources.json':[current,stale,lake],'source-security-holds.json':[held],'search-supplemental.json':[],'place-search-aliases.json':{places:{}},'travel-offers.json':[],'affiliate-partners.json':[],'destination-photo-rights-candidates.json':JSON.parse(readFileSync(new URL('../data/destination-photo-rights-candidates.json',import.meta.url),'utf8')),'local-directory.json':[], 'local-directory-supplemental.json':[row('Supplemental visitor help'),...Array.from({length:5},(_,i)=>row('Venue '+i)),row('Official arrival help',{type:'visitor information'}),row('Expired arrival help',{type:'visitor information',verifiedAt:'2025-01-01T00:00:00Z'}),row('Expired local help',{verifiedAt:'2025-01-01T00:00:00Z'}),row('Paid local help',{paidPlacement:true}),row('Affiliate local help',{affiliate:true}),row('Unapproved local help',{status:'PENDING'}),row('Wrong destination help',{placeId:'elsewhere'}),row('Stale source local help',{placeId:'fixture-stale'})]};
  for(const [name,value]of Object.entries(inputs))writeFileSync(join(fixture,'data',name),JSON.stringify(value));
  const builderPath=fileURLToPath(new URL('../scripts/build-destination-pages.mjs',import.meta.url));
  const code=`const NativeDate=Date;globalThis.Date=class extends NativeDate{constructor(...a){super(...(a.length?a:['2026-10-10T05:00:00Z']))}static now(){return NativeDate.parse('2026-10-10T05:00:00Z')}};await import(${JSON.stringify(builderPath)});`;
  const result=spawnSync(process.execPath,['--input-type=module','-e',code],{cwd:fixture,encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);
  const html=readFileSync(join(fixture,'places',current.placeId,'index.html'),'utf8');
  assert.ok(html.includes('EDITORIAL PHOTO · NOT LIVE'),'approved matched photo must keep a truthful editorial label');
  assert.ok(html.includes('Moskenes'),'photographer attribution must be visible');
  assert.ok(html.includes('https://creativecommons.org/licenses/by-sa/4.0/'),'license link must be visible');
  assert.ok(html.includes('Santa_Claus_Village_11.jpg'),'exact source file must be linked');
  assert.ok(html.includes('Supplemental visitor help'),'approved supplemental help must reach the generated destination');
  assert.ok(html.includes('id="before-you-go"'),'arrival guidance must have a reachable section');
  assert.ok(html.includes('Official arrival help'),'arrival information must survive the venue display limit');
  assert.ok(html.includes('href="#before-you-go"'),'destination navigation must lead to arrival advice');
  assert.ok(html.includes('Visitor information reviewed'),'visitor review date must be distinguished from playback verification');
  for(const name of ['Expired arrival help','Expired local help','Paid local help','Affiliate local help','Unapproved local help','Wrong destination help'])assert.ok(!html.includes(name),name+' must stay excluded');
  const lakeHtml=readFileSync(join(fixture,'places','oeschinensee','index.html'),'utf8');
  for(const text of ['Paolo Sgarbanti','2021-06-30','Oeschinensee_lake.jpg','width="960" height="525"','EDITORIAL PHOTO · NOT LIVE'])assert.ok(lakeHtml.includes(text),'matched lake photo must expose '+text);
  assert.ok(!lakeHtml.includes('Santa_Claus_Village_11.jpg'),'lake page must not inherit another destination photo');
  const heldHtml=readFileSync(join(fixture,'places','fixture-security-hold','index.html'),'utf8');
  assert.ok(heldHtml.includes('Provider link paused pending security review'));
  assert.ok(!heldHtml.includes('href="https://www.utsav.gov.in/livedarshan"'),'security-held provider URL must not be clickable');
  assert.ok(heldHtml.includes('noindex,follow'),'security-held source cannot produce an indexable current page');
  const staleHtml=readFileSync(join(fixture,'places','fixture-stale','index.html'),'utf8');
  assert.ok(!staleHtml.includes('EDITORIAL PHOTO · NOT LIVE'),'unrelated destination must not inherit another place photo');
  assert.ok(!staleHtml.includes('Stale source local help'),'stale source pages must not activate local planning');
  const photoInput=inputs['destination-photo-rights-candidates.json'];
  for(const change of [{publicActivationAllowed:false},{status:'PENDING'},{license:'UNVERIFIED'}]){
    const held={...photoInput,candidates:photoInput.candidates.map(p=>({...p,...change}))};
    writeFileSync(join(fixture,'data','destination-photo-rights-candidates.json'),JSON.stringify(held));
    const rerun=spawnSync(process.execPath,['--input-type=module','-e',code],{cwd:fixture,encoding:'utf8'});
    assert.equal(rerun.status,0,rerun.stderr);
    assert.ok(!readFileSync(join(fixture,'places',current.placeId,'index.html'),'utf8').includes('EDITORIAL PHOTO · NOT LIVE'),'held or unverified photo must not render');
  }
  console.log('Generated destination HTML includes supplemental help while preserving review, place and source gates');
}finally{rmSync(fixture,{recursive:true,force:true});}
