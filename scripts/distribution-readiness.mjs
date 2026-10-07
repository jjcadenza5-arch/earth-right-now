import fs from "node:fs";
const x=JSON.parse(fs.readFileSync("data/distribution-channels.json","utf8"));
const connected=(x.channels||[]).filter(c=>c.state==="CONNECTED");
const pending=(x.channels||[]).filter(c=>c.state!=="CONNECTED");
const websiteShareReady=x.website?.storyDeepLinks===true&&x.website?.nativeWebShare===true&&x.website?.copyLinkFallback===true;
const indexNowReady=x.aiSearch?.indexNowPublished===true&&String(x.aiSearch?.indexNowKeyLocation||"").startsWith("https://earthrightnow.app/");
const aiSearchReady=x.aiSearch?.robotsPublished===true&&x.aiSearch?.sitemapPublished===true&&x.aiSearch?.oaiSearchBotAllowed===true&&x.aiSearch?.structuredSiteIdentity===true&&indexNowReady;
const fail=[];
if(!websiteShareReady)fail.push("website share readiness incomplete");
if(!aiSearchReady)fail.push("AI/search discovery readiness incomplete");
if(x.safety?.inventAccountClaimsAllowed!==false)fail.push("invented account claims must remain disabled");
if(x.safety?.automaticAccountCreationAllowed!==false)fail.push("automatic account creation must remain disabled");
if(x.safety?.automaticPostingAllowed!==false)fail.push("automatic posting must remain disabled");
if(x.safety?.paidPromotionAssumed!==false)fail.push("paid promotion may not be assumed");
if(x.safety?.commercialRankingAffected!==false)fail.push("commercial relationships may not affect ranking");
for(const c of x.channels||[])if(c.state!=="CONNECTED"&&c.automaticPostingAllowed!==false)fail.push(c.id+": unconnected channel may not auto-post");
const report={
  phase:"PHASE_5_DISTRIBUTION_READINESS",
  websiteShareReady,
  aiSearchReady,
  indexNowReady,
  connectedChannels:connected.map(x=>x.id),
  externalConnectionRequired:pending.map(x=>x.id),
  safety:x.safety,
  next:pending.length?"HUMAN_GATE_SOCIAL_CONNECTION_DEFERRED_WEBSITE_AND_AI_SEARCH_READY":"OPERATE_CONNECTED_CHANNELS",
  ok:fail.length===0,
  fail,
  note:"Phase 5 distribution readiness: website sharing and AI/search discovery may operate without social accounts. NOT_CONNECTED social channels are a separate human gate, not unfinished autonomous work. No social account is created or posted to automatically."
};
console.log(JSON.stringify(report,null,2));
if(fail.length)process.exit(1);
