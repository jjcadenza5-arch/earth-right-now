import assert from "node:assert/strict";import fs from "node:fs";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.ok(app.includes("s.title,s.placeId,s.city,s.state,s.region,s.country,s.provider,s.story,s.categories,s.tags,s.aliases"),"browser search document must include destination metadata, tags and aliases");
assert.ok(app.includes("function sst("),"browser search must use the shared searchable destination document");
assert.ok(app.includes('matches=catalogMatches.filter(s=>guideEligible(s)||(s.health==="HEALTHY"&&!!safeExternalUrl(s.sourceUrl||s.officialUrl)))'),"known healthy destinations must remain discoverable when current verification lapses");
assert.ok(app.includes('reference-only'),"search status must disclose reference-only fallback");
assert.ok(app.includes("(guideEligible(b)?1:0)-(guideEligible(a)?1:0)"),"current source must win within a mixed destination group");
console.log("ERN browser search preserves destination discovery without faking currentness");

const {runInNewContext}=await import("node:vm");
const grouping=app.slice(app.indexOf("const matches=catalogMatches.filter"),app.indexOf("const groups=ag.slice"));
const rows=[{country:"Japan",id:"j1"},{country:"Japan",id:"j2"},{country:"Canada",id:"c1"},{country:"Taiwan",id:"t1"}];
const result=runInNewContext(grouping+"ag.map(g=>g[0].id)",{x:"",catalogMatches:rows,localIntent:false,guideEligible:()=>true,groupByPlace:items=>items.map(item=>[item]),baseScore:()=>0});
assert.deepEqual(Array.from(result),["j1","c1","t1","j2"],"empty search must interleave countries without throwing or dropping destinations");

// Execute the actual late-directory callback against a query changed while loading.
const directoryStart=app.indexOf('state.localDirectory.push(...x);');
const directoryEnd=app.indexOf('}}).catch',directoryStart);
assert.ok(directoryStart>=0&&directoryEnd>directoryStart);
const refreshed=[],directoryState={localDirectory:[]};
runInNewContext(app.slice(directoryStart,directoryEnd),{x:[{id:'late-reviewed-business'}],state:directoryState,renderLocalEarth(){},renderQuickSearches(){},renderSaved(){},$:()=>({value:'Flam Bakery'}),search:q=>refreshed.push(q)});
assert.equal(directoryState.localDirectory[0].id,'late-reviewed-business');
assert.deepEqual(refreshed,['Flam Bakery'],'late reviewed entries must refresh the latest typed query');

// Search currentness counts source evidence independently of featured/watch curation holds.
const currentClaim=app.match(/function currentTruthClaim\(s\)\{[^}]+\}/)[0];
const eligibility=app.match(/ds=s=>[^;]+,de=s=>[^;]+;/)[0];
const currentCount=app.match(/cp=ag\.filter[^,]+/)[0];
const source=(id,changes={})=>({id,truth:'LIVE_IMAGE',health:'HEALTHY',sourceUrl:'https://provider.example.test/view',age:1,window:72,featuredHold:true,watchHold:true,...changes});
const fresh=source('held-current'),stale=source('stale',{age:80}),failed=source('failed',{failure:true}),preview=source('preview',{truth:'PREVIEW'}),closed=source('closed',{availabilitySchedule:{},open:false}),offline=source('offline',{health:'OFFLINE'});
const count=runInNewContext(currentClaim+'const '+eligibility+'const '+currentCount+';cp',{ag:[[fresh],[stale],[failed],[preview],[closed],[offline],[source('other-current'),fresh]],safeExternalUrl:u=>u,currentTruthClaim:undefined,activePlaybackFailure:s=>!!s.failure,verificationAgeHours:s=>s.age,verificationWindowHours:s=>s.window,embedPlaybackCurrent:()=>true,scheduledNow:s=>s.open===true});
assert.equal(count,2,'fresh curated-out views count once per place, while stale, failed, preview, closed and offline views do not');
console.log('Search current-view counts preserve evidence gates and ignore presentation holds');
