import { t } from "../src/language.js";import { languageAudit,languageLabel } from "../src/language-audit.js";
const a=languageAudit(t);console.assert(a.ok&&a.missing.en.length===0&&a.missing.th.length===0);console.assert(languageLabel("th")==="ไทย"&&languageLabel("en")==="English");
console.log("ERN language audit smoke checks passed");
