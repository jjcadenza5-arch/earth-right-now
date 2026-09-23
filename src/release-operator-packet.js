import { releaseEvidencePlan } from "./release-evidence-plan.js";
import { candidateEvidenceStatus, RELEASE_EVIDENCE_KEYS } from "./release-evidence.js";
import { providerPlaybackEvidenceStatus } from "./provider-playback-evidence.js";

const SHA=/^[0-9a-f]{40}$/;
function cleanOrigin(origin=""){const x=String(origin||"").trim().replace(/\/+$/,"");return x&&/^https:\/\//.test(x)?x:"";}
function evidenceState(evidence={},candidateCommit=""){
  const binding=candidateEvidenceStatus(evidence,candidateCommit);
  return RELEASE_EVIDENCE_KEYS.map(key=>{
    const row=evidence[key]||{},bound=binding.rows.find(x=>x.key===key)?.matches===true;
    return {key,ok:row.ok===true,bound,note:String(row.note||"").trim()||null,checkedAt:row.checkedAt||null,commit:row.commit||null,status:row.ok===true&&bound?"PASS":row.ok===true&&!bound?"WRONG_CANDIDATE":"NEEDS_EVIDENCE"};
  });
}
export function releaseOperatorPacket({sources=[],providerObservations=[],releaseEvidence={},candidateCommit="",origin="",previousCommit=""}={}){
  const candidate=String(candidateCommit||"").trim().toLowerCase();
  const previous=String(previousCommit||"").trim().toLowerCase();
  const candidateValid=SHA.test(candidate),previousValid=SHA.test(previous),site=cleanOrigin(origin);
  const provider=providerPlaybackEvidenceStatus(sources,providerObservations);
  const evidence=evidenceState(releaseEvidence,candidate);
  const plan=releaseEvidencePlan().map(x=>({...x,status:evidence.find(y=>y.key===x.key)?.status||"NEEDS_EVIDENCE"}));
  const providerChecks=provider.providers.flatMap(p=>p.representatives.map(x=>({
    provider:p.provider,id:x.id,title:x.title,health:x.health,humanPlayback:x.humanPlayback,
    url:site?site+"/#window="+encodeURIComponent(x.id):null,
    recordCommand:`npm run provider:record -- ${x.id} 200 HUMAN_PLAYBACK "" "<browser + deployed-origin playback note>"`
  })));
  const recordCommands=candidateValid?RELEASE_EVIDENCE_KEYS.map(key=>`npm run release:record -- ${key} <pass|fail> ${candidate} "<what was checked, where, and the result>"`):[];
  return {
    candidate:{commit:candidate||null,valid:candidateValid,origin:site||null,previousCommit:previous||null,previousCommitValid:previousValid},
    release:{readyForHumanEvidence:candidateValid&&Boolean(site),evidence,remaining:evidence.filter(x=>x.status!=="PASS").map(x=>x.key),recordCommands},
    provider:{ready:provider.ready,insideERN:provider.insideERN,providerFamilies:provider.providerFamilies,providerFamiliesReady:provider.providerFamiliesReady,representativeChecks:providerChecks.length,completed:providerChecks.filter(x=>x.humanPlayback).length,remaining:providerChecks.filter(x=>!x.humanPlayback).map(x=>({provider:x.provider,id:x.id,title:x.title,health:x.health,url:x.url,recordCommand:x.recordCommand}))},
    rollback:{candidateCommit:candidateValid?candidate:null,previousCommit:previousValid?previous:null,readyToVerify:candidateValid&&previousValid},
    plan,
    rules:["CI is engineering evidence, not real-world release evidence.","HTTP reachability or iframe load is not playback proof.","Record PASS only for the exact candidate commit actually checked.","Do not change source truth, permission, health or playback labels merely to clear release gates."]
  };
}
export function releaseOperatorMarkdown(packet){
  const p=packet||{},lines=["# ERN release operator packet",""];
  lines.push("**Candidate:** "+(p.candidate?.commit||"INVALID OR MISSING"));
  lines.push("**Origin:** "+(p.candidate?.origin||"MISSING"));
  lines.push("**Previous known-good:** "+(p.candidate?.previousCommit||"MISSING"),"");
  lines.push("> CI does not complete these real-world checks. Record only what was actually observed on the candidate.","");
  for(const item of p.plan||[])lines.push("## "+item.title+" — "+item.status,"",...(item.steps||[]).map(s=>"- [ ] "+s),"","**Pass condition:** "+item.pass,"");
  lines.push("## Provider playback representatives","",`Completed: ${p.provider?.completed||0}/${p.provider?.representativeChecks||0} · Provider families ready: ${p.provider?.providerFamiliesReady||0}/${p.provider?.providerFamilies||0}`,"");
  for(const x of p.provider?.remaining||[]){lines.push(`- [ ] ${x.provider} · ${x.title} · ${x.id} · ${x.health}`);if(x.url)lines.push("  - Open: "+x.url);lines.push("  - Record: `"+x.recordCommand+"`");}
  lines.push("","## Evidence recording commands","");
  for(const x of p.release?.recordCommands||[])lines.push("- `"+x+"`");
  lines.push("","## Rollback","","- [ ] Candidate SHA is the exact deployed build.","- [ ] Previous known-good SHA is identified.","- [ ] Host rollback/redeploy procedure is documented and verified.","- [ ] Rollback preserves source-truth data and labels.","");
  return lines.join("\n");
}
