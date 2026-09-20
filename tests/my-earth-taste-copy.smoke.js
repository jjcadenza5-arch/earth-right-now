import { myEarthTasteCopy } from "../src/my-earth-view-model.js";
console.assert(myEarthTasteCopy({signals:0}).includes("stays in this browser"),"empty My Earth should explain local-only learning");
const copy=myEarthTasteCopy({signals:3,categories:[{name:"Beaches & Water"}],countries:[{name:"Thailand"}]});
console.assert(copy.includes("3 local signals")&&copy.includes("Beaches & Water")&&copy.includes("Thailand"),"taste copy should explain broad personalization");
console.assert(copy.includes("truth and currentness always rank first"),"personalization explanation must preserve truth priority");
console.log("ERN My Earth taste-copy checks passed");
