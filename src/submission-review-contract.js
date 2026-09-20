export const SUBMISSION_REVIEW_CHECKS=Object.freeze([
 {id:"rights",label:"Authority or permission confirmed"},
 {id:"public",label:"Source is publicly reachable without private-network access"},
 {id:"truth",label:"Truth type classified"},
 {id:"quality",label:"Visual quality and travel usefulness reviewed"},
 {id:"embed",label:"Embed versus provider-link behavior confirmed"},
 {id:"currentness",label:"Successful source check completed before live/current promotion"}
]);
export const SUBMISSION_REVIEW_CHECK_IDS=Object.freeze(SUBMISSION_REVIEW_CHECKS.map(x=>x.id));
