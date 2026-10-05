import {readFile} from "node:fs/promises";
const path=process.argv[2];
if(!path)throw new Error("usage: node scripts/searchable-source-health-summary.mjs <report>");
const r=JSON.parse(await readFile(path,"utf8"));
const c=r.coverage||{},s=r.summary||{},q=r.repairQueue||[];
const lines=[
  "",
  "## Searchable Source Health",
  `- Rotating coverage: ${c.checkedSources||0}/${c.eligibleSources||0} searchable sources in today's cohort (${c.checkedUniqueUrls||0}/${c.eligibleUniqueUrls||0} unique URLs); full target cycle: ${c.cycleDays||7} days.`,
  `- Reachable: ${s.reachable||0}; missing: ${s.missing||0}; blocked: ${s.blocked||0}; temporary/network: ${s.temporaryOrNetwork||0}; recovered: ${s.recovered||0}.`,
  `- Repair queue: ${s.repair||0} repair, ${s.review||0} review, ${s.watch||0} watch.`,
  "- Reachability never proves the camera is live; media/currentness still requires separate evidence."
];
for(const x of q.slice(0,8))lines.push(`- ${x.severity}: ${x.title||x.id} — ${x.reason} → ${x.action}`);
console.log(lines.join("\n"));
