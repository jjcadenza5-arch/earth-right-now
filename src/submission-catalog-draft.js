import { validateSource } from "./source-validator.js";
import { submissionCanPublish } from "./submission-review.js";

export function submissionCatalogDraft(reviewed,{id,placeId,title,country="",region=""}={}){
 if(!submissionCanPublish(reviewed))return{ok:false,errors:["Submission must be approved before catalog drafting"]};
 const draft={
  id:String(id||"").trim(),placeId:String(placeId||"").trim(),title:String(title||reviewed.placeName||"").trim(),
  country:String(country||"").trim(),region:String(region||"").trim(),
  truth:"PREVIEW",permission:"UNKNOWN",health:"UNKNOWN",playback:"PREVIEW",
  sourceUrl:reviewed.sourceUrl,rightsBasis:"Submitted by claimed authorized representative; ERN verification pending.",
  checkedAt:"",lastSuccessfulCheck:"",categories:[]
 };
 const errors=validateSource(draft);
 return{ok:errors.length===0,draft,errors};
}
