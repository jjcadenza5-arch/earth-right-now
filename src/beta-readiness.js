import { catalogBalance } from "./catalog-balance.js";import { evidenceExpiry } from "./release-evidence.js";
const EVIDENCE=["browser","mobile","providerPlayback","accessibility","performance","rollback"];
export function betaReadiness(rows,evidence={},{now=Date.now()}={}){
 const b=catalogBalance(rows),passed=EVIDENCE.filter(k=>{const row=evidence?.[k]||{},expiry=evidenceExpiry(row.checkedAt,{now});return row.ok===true&&String(row.note||"").trim().length>0&&expiry.valid&&!expiry.expired}),evidenceRatio=passed.length/EVIDENCE.length;
 const catalogRatio=Math.min(1,b.sources/40),insideRatio=Math.min(1,b.playback.insideERN/10),countryRatio=Math.min(1,b.countries/15),providerRatio=Math.min(1,b.providers/15);
 const product=.35,catalog=.2*(.45*catalogRatio+.25*insideRatio+.15*countryRatio+.15*providerRatio),verification=.25*evidenceRatio,business=.1,operations=.1;
 const score=Math.round(100*(product+catalog+verification+business+operations));
 return{score,passedEvidence:passed,remainingEvidence:EVIDENCE.filter(k=>!passed.includes(k)),metrics:{sources:b.sources,countries:b.countries,providers:b.providers,insideERN:b.playback.insideERN,external:b.playback.external},note:"Planning indicator only; evidence counts only when fresh, noted and explicitly passed. Publication still requires every formal release gate."}
}
