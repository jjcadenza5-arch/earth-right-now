import { applyHeroPoster } from "../src/hero-poster-view.js";
function classes(){const s=new Set();return{set:s,api:{add:x=>s.add(x),remove:(...xs)=>xs.forEach(x=>s.delete(x))}}}
const cl=classes(),attrs=new Map(),media={classList:cl.api,style:{removeProperty(){}},querySelector(){return null},setAttribute:(k,v)=>attrs.set(k,v),prepend(x){this.img=x}},img={setAttribute(){},addEventListener(n,fn){this.fail=fn},remove(){this.removed=true}};
const s={categories:["Beautiful Earth"],thumbnailUrl:"https://example.test/a.jpg"};const r=applyHeroPoster(media,s,{imageFactory:()=>img});console.assert(r.kind==="remote"&&img.loading==="eager"&&img.fetchPriority==="high"&&media.img===img);img.fail();console.assert(img.removed&&attrs.get("data-poster-fallback")==="true");
console.log("ERN hero poster view smoke checks passed");
