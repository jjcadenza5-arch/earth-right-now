import assert from "node:assert/strict";import { interpretEarthIntent } from "../src/earth-intent.js";
for(const q of ["อยากดูหมู่บ้านเล็กๆ","小さな町を見たい","我想看小镇","我想看小鎮"])assert.ok(interpretEarthIntent(q).intents.includes("local"),q);
for(const q of ["ดูสดตอนนี้","今すぐ見たい","北京现在怎么样","上海現在如何"])assert.equal(interpretEarthIntent(q).wantsCurrent,true,q);
for(const q of ["Brighton","locality","今治市"])assert.equal(interpretEarthIntent(q).wantsCurrent,false,q);
console.log("ERN natural compact-script intent checks passed");
