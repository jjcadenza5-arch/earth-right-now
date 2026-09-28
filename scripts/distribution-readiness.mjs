import fs from "node:fs";
const x=JSON.parse(fs.readFileSync("data/distribution-channels.json","utf8"));
const connected=(x.channels||[]).filter(c=>c.state==="CONNECTED");
const pending=(x.channels||[]).filter(c=>c.state!=="CONNECTED");
console.log(JSON.stringify({
  phase:"STAGE_N_ORGANIC_DISTRIBUTION",
  websiteShareReady:x.website?.storyDeepLinks===true&&x.website?.nativeWebShare===true&&x.website?.copyLinkFallback===true,
  aiSearchReady:x.aiSearch?.robotsPublished===true&&x.aiSearch?.sitemapPublished===true&&x.aiSearch?.oaiSearchBotAllowed===true,
  connectedChannels:connected.map(x=>x.id),
  externalConnectionRequired:pending.map(x=>x.id),
  safety:x.safety,
  next:pending.length?"CONNECT_OFFICIAL_CHANNELS_WHEN_ACCOUNTS_EXIST":"OPERATE_CONNECTED_CHANNELS",
  note:"Readiness only. NOT_CONNECTED never implies an ERN account exists, and no social account is created or posted to automatically."
},null,2));
