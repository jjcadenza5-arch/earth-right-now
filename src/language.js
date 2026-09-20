const dictionaries={
 en:{home:"Home",explore:"Explore",atlas:"World Map",ambience:"Ambience",submit:"Submit Your Camera",watchLive:"Watch live",watchEarth:"Watch Earth",myEarth:"My Earth",nextLive:"Next live",chooseWindow:"Choose a Window",search:"Search Earth…",surprise:"Surprise me",close:"Close",previous:"Previous",next:"Next",source:"Source",share:"Share"},
 th:{home:"หน้าแรก",explore:"สำรวจ",atlas:"แผนที่โลก",ambience:"บรรยากาศ",submit:"ส่งกล้องของคุณ",watchLive:"ดูสด",watchEarth:"ดูโลก",myEarth:"โลกของฉัน",nextLive:"สดถัดไป",chooseWindow:"เลือกมุมมอง",search:"ค้นหาบนโลก…",surprise:"สุ่มดู",close:"ปิด",previous:"ก่อนหน้า",next:"ถัดไป",source:"แหล่งที่มา",share:"แชร์"},
};
export const supportedLanguages=Object.freeze([{code:"en",label:"English"},{code:"th",label:"ไทย"}]);
const KEY="ern:language";const baseCode=c=>String(c||"").toLowerCase().replace("_","-").split("-")[0];const supported=c=>supportedLanguages.some(x=>x.code===c);const normalizeCode=c=>{const x=baseCode(c);return supported(x)?x:"en"};
export function preferredLanguage(){try{if(typeof location!=="undefined"){const requested=new URLSearchParams(location.search).get("lang");if(requested&&supported(baseCode(requested)))return normalizeCode(requested)}const saved=localStorage.getItem(KEY);if(saved&&supported(saved))return saved}catch{}const langs=globalThis.navigator?.languages||[globalThis.navigator?.language];for(const l of langs||[]){const c=normalizeCode(l);if(c!=="en"||String(l||"").toLowerCase().startsWith("en"))return c}return"en"}
export function language(){return preferredLanguage()}
export function setLanguage(code){const c=normalizeCode(code);try{localStorage.setItem(KEY,c)}catch{}if(typeof document!=="undefined")document.documentElement.lang=c;return c}
export function hasTranslation(key,code){return Boolean(dictionaries[code]&&Object.prototype.hasOwnProperty.call(dictionaries[code],key)&&String(dictionaries[code][key]||"").trim())}
export function t(key,code=language()){return dictionaries[code]?.[key]||dictionaries.en[key]||key}
export function toggleLanguage(){const codes=supportedLanguages.map(x=>x.code),i=codes.indexOf(language());return setLanguage(codes[(i+1)%codes.length])}
export function languageOptions(){return supportedLanguages.map(x=>({...x}))}
