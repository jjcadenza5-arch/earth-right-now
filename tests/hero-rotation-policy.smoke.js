import { heroRotationPolicy } from "../src/hero-rotation-policy.js";
console.assert(heroRotationPolicy().rotate);console.assert(!heroRotationPolicy({visibility:"hidden"}).rotate);console.assert(heroRotationPolicy({reducedMotion:true}).reason==="REDUCED_MOTION");console.assert(heroRotationPolicy({viewerOpen:true}).reason==="ACTIVE_EXPERIENCE");
console.log("ERN hero rotation policy smoke checks passed");
