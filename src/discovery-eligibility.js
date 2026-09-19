import { playbackCapability } from "./playback-capability.js";import { recencyState } from "./source-recency.js";
export function discoverableSource(source){return!!source&&source.id!=="recovery-placeholder"&&source.health!=="OFFLINE"&&playbackCapability(source).action!=="UNAVAILABLE"}
export function currentSource(source,options={}){return discoverableSource(source)&&source.health==="HEALTHY"&&source.permission!=="UNKNOWN"&&recencyState(source,options)==="CURRENT_CHECK"}
export function discoveryPool(sources){return sources.filter(discoverableSource)}
export function currentDiscoveryPool(sources,options={}){return sources.filter(source=>currentSource(source,options))}
