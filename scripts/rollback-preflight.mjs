import fs from "node:fs";
const proof=JSON.parse(fs.readFileSync("data/rollback-proof.json","utf8"));
const fail=[],must=(ok,msg)=>{if(!ok)fail.push(msg)};
const sha=String(proof.previousKnownGoodCommit||"").trim().toLowerCase();
must(/^[0-9a-f]{40}$/.test(sha),"previous known-good commit must be a 40-char SHA");
must(String(proof.rehearsalBranch||"").trim()==="rollback-proof-20260923","rollback rehearsal branch name changed");
must(proof.verified===true,"rollback proof must be explicitly verified");
must(Number.isFinite(Date.parse(proof.verifiedAt||"")),"rollback proof timestamp missing");
must(Array.isArray(proof.procedure)&&proof.procedure.length>=4,"rollback procedure is incomplete");
must(/non-destructive rollback rehearsal/i.test(String(proof.method||"")),"rollback rehearsal method missing");
const candidate=String(process.env.GITHUB_SHA||"").trim().toLowerCase();
if(candidate)must(candidate!==sha,"candidate and rollback commit must differ");
if(fail.length){console.error(JSON.stringify({ok:false,fail},null,2));process.exit(1)}
console.log(JSON.stringify({ok:true,previousKnownGoodCommit:sha,rehearsalBranch:proof.rehearsalBranch,verifiedAt:proof.verifiedAt,candidate:candidate||null},null,2));
