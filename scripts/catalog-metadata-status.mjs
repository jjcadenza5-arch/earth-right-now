import fs from "node:fs";import { catalogMetadataAudit } from "../src/catalog-metadata-audit.js";
const rows=JSON.parse(fs.readFileSync(new URL("../data/sources.json",import.meta.url),"utf8")),a=catalogMetadataAudit(rows);console.log(JSON.stringify(a,null,2));if(a.incomplete)process.exitCode=1;
