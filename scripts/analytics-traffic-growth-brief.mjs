import fs from "node:fs";
const input=process.argv[2],eventsPath=process.argv[3],output=process.argv[4];
if(!input||!eventsPath||!output)throw new Error("usage: analytics-traffic-growth-brief <analytics.json> <distribution-events.json> <output.md>");
const x=JSON.parse(fs.readFileSync(input,"utf8"));
const d=JSON.parse(fs.readFileSync(eventsPath,"utf8"));
const n=v=>Number(v)||0;
const eventCount=name=>n((x.events||[]).find(r=>r.value===name)?.count);
const refCount=test=>(x.referrers||[]).filter(r=>test(String(r.value||"").toLowerCase())).reduce((a,r)=>a+n(r.count),0);
const google=refCount(v=>v==="google.com"||v.endsWith(".google.com")||/^google\.[a-z.]+$/.test(v));
const facebook=refCount(v=>v==="facebook.com"||v.endsWith(".facebook.com")||v==="fb.com"||v.endsWith(".fb.com"));
const topPlaces=(x.places||[]).slice(0,6),topSearches=(x.searches||[]).slice(0,6),gaps=(x.searchGaps||[]).slice(0,5);
const direct=(x.referrers||[]).find(r=>r.value==="direct")?.count||0;
const shares=eventCount("share_clicked"),planning=eventCount("travel_option_opened");
const searches=eventCount("earth_search"),zeros=eventCount("earth_search_zero"),zeroRate=searches?zeros/searches:0;
const latest=[...(d.events||[])].sort((a,b)=>String(b.date||"").localeCompare(String(a.date||"")))[0]||null;
const placeLines=topPlaces.length?topPlaces.map((r,i)=>`${i+1}. \`${r.value}\` — ${n(r.count)} opens`).join("\n"):"No destination-open data yet.";
const searchLines=topSearches.length?topSearches.map((r,i)=>`${i+1}. \`${r.value}\` — ${n(r.count)} searches`).join("\n"):"No search data yet.";
const gapLines=gaps.length?gaps.map(r=>`- \`${r.value}\` — ${n(r.count)} zero-result searches`).join("\n"):"- No repeated search gaps in this window.";
const actions=[];
if(topPlaces.length)actions.push("Use destination-specific deep links for the strongest current places rather than repeatedly sharing only the homepage.");
if(zeroRate>=0.25)actions.push("Zero-result search share is materially high; prioritize repeated genuine gaps for source research, but never publish weak substitutes merely to capture search traffic.");
if(google>0)actions.push("Protect crawlable place/country pages and source-derived freshness; Google is already sending measurable referrals.");
if(facebook>0)actions.push("Continue selective manual social sharing, rotating destination and editorial-collection deep links so aggregate referral quality can be compared across entry pages.");
if(shares===0)actions.push("Share instrumentation is newly enabled; wait for genuine visitor actions before inferring which pages are naturally shareable.");
else actions.push("Use aggregate share counts together with place opens to identify pages that people actively pass along.");
if(planning>0)actions.push("Keep planning links downstream from Earth discovery; outbound planning intent exists, so optimize relevance before increasing commercial density.");
const md=`# ERN Traffic Growth Brief — Private Owner View

Generated: ${x.generatedAt||new Date().toISOString()}  
Window: ${x.windowDays||30} days

## Traffic pulse
- Approx. unique visitors: **${n(x.visitors?.approxUnique)}**
- Page views: **${n(x.visitors?.pageViews)}**
- Google-family referrals: **${google}**
- Facebook-family referrals: **${facebook}**
- Direct/unknown referrals: **${n(direct)}**
- Earth searches: **${searches}**
- Zero-result searches: **${zeros}** (${(zeroRate*100).toFixed(1)}%)
- Destination shares/copies: **${shares}**
- Travel-option opens: **${planning}**

## Strongest destination demand
${placeLines}

Destination ranking uses clean v2 place-open attribution; older mixed legacy place counters are excluded.

## Search demand
${searchLines}

## Search gaps to research, not auto-publish
${gapLines}

## Next organic-growth actions
${actions.map(x=>"- "+x).join("\n")}

## Distribution context
Latest recorded manual distribution event: **${latest?.id||"none"}**. This is context only; ERN does not infer impressions, individual audience identity, causation, bookings or revenue from referral movement.

## Guardrails
Traffic never overrides source truth, currentness, rights, health or editorial ranking. Commercial payout never changes destination prominence. Aggregate analytics remain privacy-preserving; this brief contains no raw IP addresses, precise locations or per-person event history.
`;
fs.writeFileSync(output,md);console.log("Private ERN traffic growth brief written.");
