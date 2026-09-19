import { writeFile } from "node:fs/promises";
import { releaseEvidenceMarkdown } from "../src/release-evidence-plan.js";
const out=new URL("../release-checklist.md",import.meta.url);
await writeFile(out,releaseEvidenceMarkdown()+"\n","utf8");
console.log("Wrote release-checklist.md");
