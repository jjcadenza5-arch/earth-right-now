import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=mkdtempSync(join(tmpdir(),'ern-source-alternates-'));
const script=fileURLToPath(new URL('../scripts/search-supplemental-status.mjs',import.meta.url));
const core={id:'roof',placeId:'town',title:'Town',sourceUrl:'https://institution.example/camera'};
const alternative={id:'port',placeId:'town',title:'Port',sourceUrl:'https://port.example/panorama',alternateOfSourceId:'roof',health:'HEALTHY',featuredHold:true,watchHold:true,permission:'LINK_ONLY',truth:'LIVE_IMAGE',attribution:'Port camera',rightsBasis:'Official external handoff only',freshnessEvidence:'Dated rendered capture inspected',lastSuccessfulCheck:'2026-10-14T03:32:33Z'};
try{
 mkdirSync(join(root,'data'));writeFileSync(join(root,'data/search-supplemental-2.json'),'[]');
 const run=extra=>{writeFileSync(join(root,'data/sources.json'),JSON.stringify([core]));writeFileSync(join(root,'data/search-supplemental.json'),JSON.stringify(extra));return spawnSync(process.execPath,[script],{cwd:root,encoding:'utf8'});};
 const good=run([alternative]);assert.equal(good.status,0,good.stderr);const report=JSON.parse(good.stdout);assert.equal(report.combinedSearchablePlaces,1);assert.equal(report.existingPlaceAlternates,1);
 for(const patch of [{alternateOfSourceId:undefined},{alternateOfSourceId:'other'},{sourceUrl:core.sourceUrl},{placeId:'elsewhere'},{truth:'PREVIEW'},{freshnessEvidence:''},{permission:'EMBED_ALLOWED'},{id:'roof'}]){
  const r=run([{...alternative,...patch}]);assert.notEqual(r.status,0,JSON.stringify(patch));
 }
 const duplicate=run([alternative,{...alternative,id:'duplicate'}]);assert.notEqual(duplicate.status,0);
 const distinct=run([{...alternative,placeId:'new-town',alternateOfSourceId:undefined}]);assert.equal(distinct.status,0,distinct.stderr);assert.equal(JSON.parse(distinct.stdout).combinedSearchablePlaces,2);
}finally{rmSync(root,{recursive:true,force:true});}
console.log('Exact alternate cameras preserve source identity, permission and unique-place counts');
