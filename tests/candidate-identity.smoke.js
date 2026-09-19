import { candidateIdentity,evidenceCandidateMatch } from "../src/candidate-identity.js";
const x=candidateIdentity({commit:"abc123",manifest:{generatedAt:"2026-09-19T12:00:00Z"},origin:"https://beta.example.com/path"});
console.assert(x.identified&&x.origin==="https://beta.example.com");
console.assert(evidenceCandidateMatch(x,{commit:"abc123",origin:"https://beta.example.com"}).ok);
console.assert(evidenceCandidateMatch(x,{commit:"different"}).reason==="COMMIT_MISMATCH");
console.log("ERN candidate identity smoke checks passed");
