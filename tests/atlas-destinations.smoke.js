import { atlasDestinationResults } from "../src/atlas-destinations.js";
const now=new Date().toISOString();
const rows=[
 {id:"a",placeId:"p",title:"Place A",country:"X",health:"HEALTHY",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",playback:"EXTERNAL",sourceUrl:"https://example.test/a",checkedAt:now,lastSuccessfulCheck:now},
 {id:"b",placeId:"p",title:"Place A alt",country:"X",health:"HEALTHY",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",playback:"EMBED",sourceUrl:"https://example.test/b",embedUrl:"https://www.youtube.com/embed/b",checkedAt:now,lastSuccessfulCheck:now},
 {id:"c",placeId:"q",title:"Place Q",country:"Y",health:"UNKNOWN",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",playback:"EXTERNAL",sourceUrl:"https://example.test/c"}
];
console.assert(atlasDestinationResults(rows).length===2,"Atlas results should group windows by destination");
console.assert(atlasDestinationResults(rows,{inside:true}).length===1,"inside filter should require a current inside-ERN window");
console.assert(atlasDestinationResults(rows,{current:true}).length===1,"current filter should use ERN strict-current policy");
console.assert(atlasDestinationResults(rows,{},"Place A").length===1,"Atlas search should return matching destinations rather than duplicate windows");
console.log("ERN Atlas destination results smoke checks passed");
