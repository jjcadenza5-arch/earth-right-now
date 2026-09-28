import fs from "node:fs";
const m=JSON.parse(fs.readFileSync(new URL("../data/destination-opportunity-matrix.json",import.meta.url),"utf8"));
const fail=[];
if(m.rules?.commissionMaySetSourcePriority!==false) fail.push("commission may not set source priority");
if(m.rules?.programFitMayBreakTiesAfterQuality!==true) fail.push("program-fit tie-break rule missing");
if(m.rules?.sourceMustPassTruthPermissionCurrentnessQuality!==true) fail.push("source hard gate missing");
const names=new Set();
for(const r of m.rows||[]){
 if(!r.destination||names.has(r.destination)) fail.push(`invalid/duplicate destination: ${r.destination}`);
 names.add(r.destination);
 if(!r.visualCoverage||!r.visitorDecisionValue||!r.sourcePriority||!r.next) fail.push(`incomplete row: ${r.destination}`);
 if(!Array.isArray(r.nextStepIntents)||!Array.isArray(r.programFamilies)) fail.push(`missing intent/program arrays: ${r.destination}`);
}
console.log(JSON.stringify({ok:fail.length===0,destinations:m.rows?.length||0,priorities:(m.rows||[]).reduce((a,r)=>(a[r.sourcePriority]=(a[r.sourcePriority]||0)+1,a),{}),fail},null,2));
if(fail.length)process.exit(1);
