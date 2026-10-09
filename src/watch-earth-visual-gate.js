// Beauty/interest is an editorial quality gate, not a daylight rule.
// Known weak scenes stay held explicitly; strong night views are allowed.
export function premiumVisualEligible(s){
 return !!s&&s.watchHold!==true&&s.featuredHold!==true&&Number(s.quality)>=84&&Number(s.moment)>=80;
}
