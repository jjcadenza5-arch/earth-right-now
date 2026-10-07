import fs from "node:fs";
const input=process.argv[2],output=process.argv[3];if(!input||!output)throw new Error("usage: analytics-owner-report <input.json> <output.md>");
const x=JSON.parse(fs.readFileSync(input,"utf8"));
const rows=(arr=[])=>arr.map(r=>`| ${String(r.value||"—").replace(/\|/g,"/")} | ${Number(r.count)||0} |`).join("\n")||"| — | 0 |";
const dailyRows=(arr=[])=>arr.map(r=>`| ${r.day||"—"} | ${Number(r.visitors)||0} | ${Number(r.pageViews)||0} |`).join("\n")||"| — | 0 | 0 |";
const total=arr=>(Array.isArray(arr)?arr:[]).reduce((n,r)=>n+(Number(r.count)||0),0);
const eventCount=name=>(x.events||[]).find(r=>r.value===name)?.count||0;
const referrers=Array.isArray(x.referrers)?x.referrers:[];
const referrerCount=matcher=>referrers.filter(r=>matcher(String(r.value||"").toLowerCase())).reduce((n,r)=>n+(Number(r.count)||0),0);
const facebookReferralViews=referrerCount(v=>v==="facebook.com"||v.endsWith(".facebook.com")||v==="fb.com"||v.endsWith(".fb.com"));
const googleReferralViews=referrerCount(v=>v==="google.com"||v.endsWith(".google.com"));
const v=x.visitors||{};
const md=`# ERN Analytics — Private Owner Report

Generated: ${x.generatedAt||"unknown"}  
Window: ${x.windowDays||30} days

## Owner snapshot
- Approximate unique visitors: **${v.approxUnique||0}**
- Page views: **${v.pageViews||0}**
- Place/window opens: **${eventCount("window_opened")+eventCount("place_opened")}**
- Searches: **${eventCount("earth_search")}**
- Zero-result searches: **${eventCount("earth_search_zero")}**
- Live-source outbound clicks: **${eventCount("external_source_opened")}**
- Verified commercial outbound clicks: **${eventCount("travel_option_opened")}**
- Destination shares/copies: **${eventCount("share_clicked")}**

## Daily visitors
| Day (UTC) | Visitors | Page views |
|---|---:|---:|
${dailyRows(x.daily)}

## Top destinations
| Place ID | Opens |
|---|---:|
${rows(x.places)}

Top-destination attribution uses clean v2 place-open counters. Older legacy place counters may have mixed other event types and are intentionally excluded here.

## Top searches
| Search | Count |
|---|---:|
${rows(x.searches)}

## Zero-result searches
| Missing search | Count |
|---|---:|
${rows(x.searchGaps)}

Zero-result terms are demand evidence, not automatic catalog instructions.

## Live-source clicks
| External source ID | Opens |
|---|---:|
${rows(x.externalSources)}

These are outbound opens to live/current provider sources, not proof that the provider stream actually played.

## Shared destinations
| Place ID | Shares/copies |
|---|---:|
${rows(x.sharePlaces)}

## Affiliate / commercial clicks
| Offer ID | Opens |
|---|---:|
${rows(x.commercialOffers)}

An outbound affiliate click is not a booking, conversion, transaction or revenue event.

## Referral sources
- Facebook-family page views: **${facebookReferralViews}**
- Google-family page views: **${googleReferralViews}**

| Referrer host | Page views |
|---|---:|
${rows(x.referrers)}

## Visitor baseline
- New visitors: **${v.new||0}**
- Returning visitors (approx.): **${v.returningApprox||0}**

## Coarse geography
| Country | Approx. page views |
|---|---:|
${rows(x.countries)}

## Device class
| Device | Page views |
|---|---:|
${rows(x.devices)}

## Privacy boundary
This report is derived from aggregate ERN counters. Raw IP addresses, precise coordinates and per-event rows are not retained. Search terms that look like email addresses, URLs or phone numbers are discarded from stored search text.
`;
fs.writeFileSync(output,md);console.log("Private ERN analytics owner report written.");
