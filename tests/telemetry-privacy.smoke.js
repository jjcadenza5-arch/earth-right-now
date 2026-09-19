import { telemetryEnvelope,telemetryPolicy } from "../src/telemetry-policy.js";
const p=telemetryPolicy();console.assert(p.defaultEnabled===false&&p.forbidden.includes("precise location"));
console.assert(telemetryEnvelope("unknown",{email:"x@y.test"})===null,"unknown events must fail closed");
const x=telemetryEnvelope("earth_search",{length:42,query:"private words",contact:"x@y.test"});
console.assert(x.data.length===42&&!Object.hasOwn(x.data,"query")&&!Object.hasOwn(x.data,"contact"),"search content and contact data must not enter telemetry");
const y=telemetryEnvelope("window_opened",{sourceId:"cam",placeId:"p",lat:18.7,lon:98.9});
console.assert(y.data.sourceId==="cam"&&!Object.hasOwn(y.data,"lat")&&!Object.hasOwn(y.data,"lon"),"precise coordinates must not enter telemetry");
console.log("ERN telemetry privacy smoke checks passed");
