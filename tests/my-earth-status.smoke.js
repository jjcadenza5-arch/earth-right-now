import "./test-browser-env.mjs";
import { myEarthStatusState,setMyEarthStatus,clearMyEarthImportStatus } from "../src/my-earth-status.js";
console.assert(myEarthStatusState({availabilityMessage:"2 unavailable"}).kind==="AVAILABILITY");
console.assert(myEarthStatusState({importMessage:"Imported",availabilityMessage:"2 unavailable"}).message==="Imported","import result must take precedence");
const el=document.createElement("p");setMyEarthStatus(el,{importMessage:"Imported"});console.assert(el.textContent==="Imported"&&el.dataset.importStatus==="true");clearMyEarthImportStatus(el);console.assert(!el.dataset.importStatus);
console.log("ERN My Earth status smoke checks passed");
