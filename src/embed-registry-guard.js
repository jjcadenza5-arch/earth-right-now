import { allowedEmbedUrl } from "./embed-policy.js";
export function validateEmbedRegistry(rows){
 const errors=[];
 for(const s of rows||[]){
  if(s?.playback!=="EMBED")continue;
  if(!allowedEmbedUrl(s.embedUrl))errors.push({id:s.id||null,error:"EMBED_URL_NOT_ALLOWED"});
  if(!["EMBED_ALLOWED","PARTNER_PERMISSION"].includes(s.permission))errors.push({id:s.id||null,error:"EMBED_PERMISSION_MISSING"});
 }
 return errors;
}
