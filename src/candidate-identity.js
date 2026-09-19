export function candidateIdentity({commit="",manifest=null,origin=""}={}){
 const sha=String(commit||"").trim(),generatedAt=String(manifest?.generatedAt||"").trim();
 let url=null;try{const u=new URL(String(origin||""));if(u.protocol==="https:")url=u.origin}catch{}
 return{commit:sha||null,generatedAt:generatedAt||null,origin:url,identified:Boolean(sha&&generatedAt)};
}
export function evidenceCandidateMatch(identity,{commit="",origin=""}={}){
 if(!identity?.identified)return{ok:false,reason:"CANDIDATE_UNIDENTIFIED"};
 if(commit&&identity.commit!==commit)return{ok:false,reason:"COMMIT_MISMATCH"};
 if(origin&&identity.origin!==origin)return{ok:false,reason:"ORIGIN_MISMATCH"};
 return{ok:true,reason:null};
}
