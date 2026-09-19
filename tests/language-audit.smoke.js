import { t,hasTranslation } from "../src/language.js";import { languageAudit,languageLabel } from "../src/language-audit.js";
const a=languageAudit(t,hasTranslation);console.assert(a.ok&&a.missing.en.length===0&&a.missing.th.length===0);console.assert(languageLabel("th")==="ไทย"&&languageLabel("en")==="English");
const fallback=(key,code)=>code==="th"?"English fallback":"English";const raw=(key,code)=>code==="en";
const masked=languageAudit(fallback,raw);console.assert(!masked.ok&&masked.missing.th.length>0,"raw audit must detect missing Thai even when translator falls back");
console.log("ERN language audit smoke checks passed");
