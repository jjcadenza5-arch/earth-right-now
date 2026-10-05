import assert from "node:assert/strict";
import {operationsOperatorBrief} from "../src/operations-operator-brief.js";
const brief=operationsOperatorBrief({
 snapshot:{generatedAt:"2026-10-06T12:55:00Z",catalog:{healthy:1,total:1},watchEarth:{strongCurrent:1,insideCurrent:1,status:"CURATED",recommendedLimit:5},insideERN:{ready:5,targetReady:5,readyShortfall:0,recoveryDebt:0},providers:{families:2,targetFamilies:2,dominantShare:.5,nextGoal:"none"},release:{blockers:0},maintenance:{sourceRevalidation:0}},
 delta:{direction:"UNCHANGED",improved:[],regressed:[]},
 organicDistributionObservation:{
  latestOrganicDistributionEvent:{id:"2026-10-05-facebook-groups-organic-wave-01"},
  observation:{approximateUniqueVisitors:55,pageViews:310,facebookReferralViews:30,facebookReferralShareOfPageViews:.0968,earthSearches:31,zeroResultSearches:7,windowOpens:224,externalSourceOpens:46},
  sinceBaseline:{elapsedHours:26,phase:"POST_24H",nextMilestoneHours:72,deltas:{approximateUniqueVisitors:12,pageViews:53,facebookReferralViews:8,earthSearches:9,windowOpens:31,externalSourceOpens:8}},
  exploration:{currentTopSearches:[{value:"new york",count:5}],currentTopPlaces:[{value:"kyoto-hanamikoji",count:31}]}
 }
});
assert.match(brief,/Organic distribution observation/);
assert.match(brief,/POST_24H/);
assert.match(brief,/Facebook referral views \+8/);
assert.match(brief,/searches \+9/);
assert.match(brief,/place\/window opens \+31/);
assert.match(brief,/Top aggregate searches: new york \(5\)/);
assert.match(brief,/do not identify visitors as nomads or prove Facebook caused/);
console.log("Operator brief exposes organic distribution exploration deltas without causal claims");
