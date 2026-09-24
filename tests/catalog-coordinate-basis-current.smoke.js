import assert from "node:assert/strict";import fs from "node:fs";import {guardCatalog} from "../src/catalog-guard.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const g=guardCatalog(rows);
assert.equal(g.rejected.length,0,JSON.stringify(g.rejected.map(x=>({id:x.row?.id,errors:x.errors}))));
assert.equal(g.valid.length,rows.length);
for(const id of ["san-diego-zoo","chamonix-mont-blanc","whistler-blackcomb","chihshang-paradise-road","st-johns-harbour","skeikampen-ski","diano-marina","farm-tomita","waikiki-beach","sottomarina-chioggia","chidori-sakura","rio-copacabana-earthcam","torres-del-paine-rio-serrano"]){
  const row=rows.find(x=>x.id===id);assert.equal(row?.coordinateBasis,"PLACE_REFERENCE",id);
}
console.log("ERN catalog coordinate basis contract is clean");
