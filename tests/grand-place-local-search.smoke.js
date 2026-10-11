import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const runtime=fs.readFileSync('src/app-lite.js','utf8');
const start=runtime.indexOf('function localDirectoryMatch(q)'),end=runtime.indexOf('function localDirectoryCard',start);
const locals=[...JSON.parse(fs.readFileSync('data/local-directory.json','utf8')),...JSON.parse(fs.readFileSync('data/local-directory-supplemental.json','utf8'))];
const context={approvedLocalPlaces:()=>locals,normalizeSearch:s=>String(s).toLowerCase().replace(/[-–—]/g,' ').replace(/\s+/g,' ').trim()};vm.createContext(context);vm.runInContext(runtime.slice(start,end),context);
for(const q of ['Grand Place','Brussels Grand Place','Grand Place Brussels']){
 const rows=context.localDirectoryMatch(q);assert.equal(rows.length,6,q);assert.ok(rows.every(x=>x.placeId==='brussels-grand-place'),q);
}
assert.ok(context.localDirectoryMatch('local place').length>0,'generic local discovery remains available');
assert.equal(context.localDirectoryMatch('Grand Hotel Vilnius')[0]?.id,'local-grand-hotel-vilnius');
assert.equal(context.localDirectoryMatch('Maison Dandoy')[0]?.id,'local-brussels-dandoy-beurre');
console.log('Grand-Place local search retains the named destination without broad Grand-hotel matches');
