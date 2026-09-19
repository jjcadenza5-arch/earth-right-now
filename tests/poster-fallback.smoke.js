import "./test-browser-env.mjs";
import { installPosterFallback,posterFailureState } from "../src/poster-fallback.js";
const classes=new Set(["has-poster"]),attrs=new Map(),container={hidden:false,classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x)},setAttribute:(k,v)=>attrs.set(k,v)},img={isConnected:true,addEventListener:(name,fn)=>{img.fire=fn},remove:()=>{img.isConnected=false}};
installPosterFallback(img,container,{id:"x"},{fallbackClass:"poster-water"});img.fire();console.assert(!img.isConnected&&classes.has("poster-water")&&!classes.has("has-poster"));console.assert(attrs.get("data-poster-kind")==="generated"&&attrs.get("data-poster-fallback")==="true");const x=posterFailureState({id:"x"},{hadRemoteImage:true});console.assert(x.fallback&&x.reason==="REMOTE_POSTER_FAILED");
console.log("ERN poster fallback smoke checks passed");
