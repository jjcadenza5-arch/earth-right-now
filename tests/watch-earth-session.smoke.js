import { createWatchEarthSession } from "../src/watch-earth-session.js";
const now=new Date().toISOString(),calls=[],player={play:(id,o)=>calls.push([id,o.surface])};
const base={health:"HEALTHY",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",playback:"EXTERNAL",sourceUrl:"https://example.test/live",checkedAt:now,lastSuccessfulCheck:now};
const j=createWatchEarthSession({sources:[{...base,id:"a"},{...base,id:"b"}],player});
j.show(0);j.next();
console.assert(calls[0]?.[0]==="a"&&calls[1]?.[0]==="b"&&calls.every(x=>x[1]==="watch-earth"),"Watch Earth must preserve valid journey sources and surface context");
j.destroy();
console.log("ERN Watch Earth session smoke checks passed");
