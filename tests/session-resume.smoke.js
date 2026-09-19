import { sessionResume,validateSessionResume } from "../src/session-resume.js";
const now=Date.parse("2026-09-19T12:00:00Z");const x=sessionResume({placeId:"chiang-mai",sourceId:"cam",surface:"explore",updatedAt:"2026-09-19T11:00:00Z"});console.assert(validateSessionResume(x,{now}).ok);
console.assert(!validateSessionResume({...x,updatedAt:"2026-09-17T11:00:00Z"},{now}).ok);console.assert(validateSessionResume({version:1,placeId:null,sourceId:null,updatedAt:"2026-09-19T11:00:00Z"},{now}).reason==="EMPTY");
console.log("ERN session resume smoke checks passed");
