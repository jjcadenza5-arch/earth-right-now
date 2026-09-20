import { writeFile } from "node:fs/promises";
import { releaseEvidenceMarkdown } from "../src/release-evidence-plan.js";
const out=new URL("../release-checklist.md",import.meta.url);
const candidateCommit=String(process.env.GITHUB_SHA||process.env.ERN_COMMIT_SHA||process.argv[2]||"").trim();
await writeFile(out,releaseEvidenceMarkdown({candidateCommit})+"\n","utf8");
console.log("Wrote release-checklist.md"+(candidateCommit?" for "+candidateCommit:""));
