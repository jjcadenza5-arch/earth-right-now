import fs from "node:fs";
const input=process.argv[2],output=process.argv[3];if(!input||!output)throw new Error("usage: analytics-owner-report <input.json> <output.md>");
const x=JSON.parse(fs.readFileSync(input,"utf8"));
const rows=(arr=[])=>arr.map(r=>`| ${String(r.value||"—").replace(/\|/g,"/")} | ${Number(r.count)||0} |`).join("\n")||"| — | 0 |";
const v=x.visitors||{};
const md=`# ERN Soft Launch Analytics — Private Owner Report

Generated: ${x.generatedAt||"unknown"}  
Window: ${x.windowDays||30} days

## Visitor baseline
- Approximate unique visitors: **${v.approxUnique||0}**
- New visitors: **${v.new||0}**
- Returning visitors (approx.): **${v.returningApprox||0}**
- Page views: **${v.pageViews||0}**

## Search demand
| Search | Count |
|---|---:|
${rows(x.searches)}

## Zero-result search gaps
| Missing search | Count |
|---|---:|
${rows(x.searchGaps)}

Zero-result terms are demand evidence, not automatic catalog instructions. Repeated gaps should be researched under ERN truth, permission, currentness and quality gates.

## Most-opened ERN places
| Place ID | Opens |
|---|---:|
${rows(x.places)}

## Verified commercial outbound actions
| Offer ID | Opens |
|---|---:|
${rows(x.commercialOffers)}

An outbound affiliate click is not a booking, conversion, transaction or revenue event.

## Coarse geography
| Country | Approx. page views |
|---|---:|
${rows(x.countries)}

## Device class
| Device | Page views |
|---|---:|
${rows(x.devices)}

## Referrer host
| Referrer | Page views |
|---|---:|
${rows(x.referrers)}

## Privacy boundary
This report is derived from aggregate ERN counters. Raw IP addresses, precise coordinates and per-event rows are not retained by the analytics service. Search terms that look like email addresses, URLs or phone numbers are discarded from stored search text.
`;
fs.writeFileSync(output,md);console.log("Private ERN analytics owner report written.");
