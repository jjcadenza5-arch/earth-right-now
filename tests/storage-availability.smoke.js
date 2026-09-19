import { storageAvailability,localDataNotice } from "../src/storage-availability.js";
const ok={setItem(){},removeItem(){}};console.assert(storageAvailability(ok).ok&&localDataNotice(storageAvailability(ok))==="");
const blocked={setItem(){throw new Error("blocked")},removeItem(){}};const state=storageAvailability(blocked);console.assert(!state.ok&&state.reason==="BLOCKED"&&localDataNotice(state).includes("may not persist"));
console.assert(storageAvailability(null).reason==="UNAVAILABLE");
console.log("ERN storage availability smoke checks passed");
