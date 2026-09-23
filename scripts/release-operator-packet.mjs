import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { releaseOperatorPacket,releaseOperatorMarkdown } from "../src/release-operator-packet.js";
const arg=process.argv[2]||"";
let candidate=arg.trim();
if(!candidate){try{candidate=execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim()}catch{}}
let previous="";try{previous=execFileSync("git",["rev-parse","HEAD^"],{encoding:"utf8"}).trim()}catch{}
const sources=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
const releaseEvidence=JSON.parse(await readFile(new URL("../data/release-evidence.json",import.meta.url),"utf8"));
let providerObservations=[];try{providerObservations=JSON.parse(await readFile(new URL("../data/provider-observations.json",import.meta.url),"utf8"))}catch(error){if(error?.code!=="ENOENT")throw error}
const domain=(await readFile(new URL("../CNAME",import.meta.url),"utf8")).trim();
const packet=releaseOperatorPacket({sources,providerObservations,releaseEvidence,candidateCommit:candidate,previousCommit:previous,origin:"https://"+domain});
const format=process.argv.includes("--json")?"json":"markdown";
console.log(format==="json"?JSON.stringify(packet,null,2):releaseOperatorMarkdown(packet));
