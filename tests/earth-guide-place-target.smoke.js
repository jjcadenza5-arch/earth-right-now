import assert from "node:assert/strict";import {guidePlaceTarget,focusGuidePlaceTarget} from "../src/earth-guide-place-target.js";
assert.equal(guidePlaceTarget("NEARBY",{nearbyCount:2}).target,"placeNearby");assert.equal(guidePlaceTarget("NEARBY",{nearbyCount:0}).target,"placeWindows");
const node=({hidden=false,aria=null,child=null,tab=false}={})=>({hidden,getAttribute:k=>k==="aria-hidden"?aria:null,scrollIntoView(){this.scrolled=true},querySelector:()=>child,matches:()=>tab,focus(){this.focused=true}});
let child=node(),el=node({child}),doc={getElementById:()=>el};assert.equal(focusGuidePlaceTarget(doc,"x"),true);assert.equal(child.focused,true);
el=node({hidden:true,child:node()});assert.equal(focusGuidePlaceTarget({getElementById:()=>el},"x"),false);
el=node({aria:"true",child:node()});assert.equal(focusGuidePlaceTarget({getElementById:()=>el},"x"),false);
el=node();assert.equal(focusGuidePlaceTarget({getElementById:()=>el},"x"),false);assert.equal(el.scrolled,true);
console.log("ERN Guide focus accessibility checks passed");
