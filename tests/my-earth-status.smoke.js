import "./test-browser-env.mjs";
import { myEarthStatusState,setMyEarthStatus,clearMyEarthImportStatus,hasMyEarthImportStatus } from "../src/my-earth-status.js";
console.assert(myEarthStatusState({availabilityMessage:"2 unavailable"}).kind==="AVAILABILITY");
console.assert(myEarthStatusState({importMessage:"Imported",availabilityMessage:"2 unavailable"}).message==="Imported","import result must take precedence");
const el=document.createElement("p");setMyEarthStatus(el,{importMessage:"Imported"});console.assert(el.textContent==="Imported"&&hasMyEarthImportStatus(el));clearMyEarthImportStatus(el);console.assert(!hasMyEarthImportStatus(el));
console.log("ERN My Earth status smoke checks passed");
