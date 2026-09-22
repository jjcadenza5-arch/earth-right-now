import { interpretEarthIntent } from "../src/earth-intent.js";
for(const q of ["Chiang Mai live","Chiang Mai right now","เชียงใหม่ สด","เชียงใหม่ ตอนนี้","Berlin jetzt","Paris en direct","Madrid ahora","東京 今","北京 现在"])console.assert(interpretEarthIntent(q).wantsCurrent,q+" should request near-now evidence");
for(const q of ["서울 지금"])console.assert(!interpretEarthIntent(q).wantsCurrent,q+" is outside the currently supported interface languages");
console.log("ERN supported-language current-intent checks passed");
