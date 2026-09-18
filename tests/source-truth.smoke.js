import { validateSource } from "../src/source-validator.js";import { sourceStatus } from "../src/health-policy.js";
const base={id:"x",placeId:"p",title:"X",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",health:"HEALTHY",playback:"EMBED",sourceUrl:"https://example.test",embedUrl:"https://example.test/embed"};
console.assert(validateSource(base).length===0,"valid source passes");
console.assert(validateSource({...base,embedUrl:null}).some(x=>x.includes("embedUrl")),"invalid embed caught");
console.assert(sourceStatus({...base,health:"UNKNOWN"}).live===false,"unknown health never displays live");
console.log("ERN truth smoke checks passed");
