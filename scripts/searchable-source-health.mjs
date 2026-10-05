import {readFile,writeFile,mkdir} from "node:fs/promises";
import {runSearchableSourceHealth} from "../src/searchable-source-health.js";

const statePath=process.argv[2]||"ern-history/searchable-source-health-state.json";
const read=async p=>JSON.parse(await readFile(p,"utf8"));
const optional=async p=>{try{return await read(p)}catch(e){if(e?.code==="ENOENT"||e instanceof SyntaxError)return{};throw e}};
const [core,supplemental,previousState]=await Promise.all([
  read(new URL("../data/sources.json",import.meta.url)),
  read(new URL("../data/search-supplemental.json",import.meta.url)),
  optional(statePath)
]);
const report=await runSearchableSourceHealth(core,supplemental,{previousState,now:new Date(),cycleDays:7,concurrency:6,timeoutMs:7000});
await mkdir(new URL("../ern-history/",import.meta.url),{recursive:true}).catch(()=>{});
await writeFile(statePath,JSON.stringify(report.state,null,2)+"\n");
const publicReport={...report};
delete publicReport.state;
console.log(JSON.stringify(publicReport,null,2));
