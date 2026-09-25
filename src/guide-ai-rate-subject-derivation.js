export const GUIDE_AI_RATE_SUBJECT_POLICY=Object.freeze({
  rawIdentifierStored:false,
  derivedPrefix:"anon_",
  minDigestChars:24,
  maxDigestChars:90,
  derivation:"KEYED_ONE_WAY_DIGEST_REQUIRED"
});

export async function deriveGuideAiRateSubject(rawValue,{digest}={}){
  const raw=String(rawValue||"").trim();
  if(!raw)return{ok:false,reason:"RAW_RATE_INPUT_REQUIRED"};
  if(raw.length>512)return{ok:false,reason:"RAW_RATE_INPUT_TOO_LONG"};
  if(typeof digest!=="function")return{ok:false,reason:"RATE_SUBJECT_DIGEST_REQUIRED"};
  let value;
  try{value=String(await digest(raw)||"").replace(/[^A-Za-z0-9_-]/g,"")}
  catch{return{ok:false,reason:"RATE_SUBJECT_DIGEST_FAILED"}}
  if(value.length<GUIDE_AI_RATE_SUBJECT_POLICY.minDigestChars)return{ok:false,reason:"RATE_SUBJECT_DIGEST_INVALID"};
  const subject=GUIDE_AI_RATE_SUBJECT_POLICY.derivedPrefix+value.slice(0,GUIDE_AI_RATE_SUBJECT_POLICY.maxDigestChars);
  return{ok:true,subject,rawStored:false};
}
