import { supportedLanguages } from "./language.js";
const KEYS=["guideSearch","heroWelcome","heroPromise","heroDeck","chooseWindowTitle","chooseWindowCopy","watchEarthNow","somewhereBeautiful","guideTitle","guideIntro","home","explore","atlas","ambience","submit","watchLive","watchEarth","myEarth","nextLive","chooseWindow","search","surprise","close","previous","next","source","share"];
export function languageAudit(t,hasTranslation=null){const missing={};for(const {code} of supportedLanguages)missing[code]=KEYS.filter(k=>hasTranslation?!hasTranslation(k,code):!String(t(k,code)||"").trim()||t(k,code)===k);return{ok:Object.values(missing).every(rows=>!rows.length),missing}}
export function languageLabel(code){return supportedLanguages.find(x=>x.code===code)?.label||"English"}
