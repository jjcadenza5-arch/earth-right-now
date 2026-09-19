const KEYS=["explore","atlas","ambience","submit","watchLive","watchEarth","myEarth","nextLive","chooseWindow","search"];
export function languageAudit(t,hasTranslation=null){const missing={};for(const code of["en","th"]){missing[code]=KEYS.filter(k=>hasTranslation?!hasTranslation(k,code):!String(t(k,code)||"").trim()||t(k,code)===k)}return{ok:!missing.en.length&&!missing.th.length,missing}}
export function languageLabel(code){return code==="th"?"ไทย":"English"}
