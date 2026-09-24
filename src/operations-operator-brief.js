function fmtList(items=[],limit=5){return items.slice(0,limit).map(x=>`- ${x.metric}: ${x.previous} → ${x.current} (${x.delta>0?"+":""}${x.delta})`).join("\n")}
export function operationsOperatorBrief({snapshot,delta,availability,recovery,research,playbackHorizon,researchPreflight,availabilityContinuity}={}){
  const direction=delta?.direction||"BASELINE",lines=[];
  lines.push("# ERN Daily Operations Brief","");
  lines.push(`Generated: ${snapshot?.generatedAt||new Date().toISOString()}`);
  lines.push(`Trend: **${direction}**${Number.isFinite(delta?.score)?` (score ${delta.score})`:""}`,"");
  lines.push("## Current state");
  lines.push(`- Catalog: ${snapshot?.catalog?.healthy||0} healthy / ${snapshot?.catalog?.total||0} total; ${snapshot?.catalog?.degraded||0} degraded; ${snapshot?.catalog?.expired||0} expired.`);
  lines.push(`- Watch Earth: ${snapshot?.watchEarth?.strongCurrent||0} strong current; ${snapshot?.watchEarth?.insideCurrent||0} inside ERN; status ${snapshot?.watchEarth?.status||"UNKNOWN"}; recommended set size ${snapshot?.watchEarth?.recommendedLimit||0}.`);
  lines.push(`- Inside ERN: ${snapshot?.insideERN?.ready||0}/${snapshot?.insideERN?.targetReady||0} ready; shortfall ${snapshot?.insideERN?.readyShortfall||0}; recovery debt ${snapshot?.insideERN?.recoveryDebt||0}.`);
  lines.push(`- Providers: ${snapshot?.providers?.families||0}/${snapshot?.providers?.targetFamilies||0} embed families; dominant share ${Math.round((snapshot?.providers?.dominantShare||0)*100)}%; next goal ${snapshot?.providers?.nextGoal||"none"}.`);
  lines.push(`- Release blockers: ${snapshot?.release?.blockers||0}; source revalidation queue: ${snapshot?.maintenance?.sourceRevalidation||0}.`,"");
  if(delta?.improved?.length){lines.push("## Improved",fmtList(delta.improved),"")}
  if(delta?.regressed?.length){lines.push("## Regressed",fmtList(delta.regressed),"")}
  if(!delta?.improved?.length&&!delta?.regressed?.length)lines.push("## Change","- No scored operational movement yet; this run is a baseline or unchanged.","");
  const a=availability?.summary||snapshot?.availability;
  if(a){
    lines.push("## Source availability sample");
    lines.push(`- Sampled ${a.total??a.sampled??0}: ${a.reachable||0} reachable, ${a.missing||0} missing, ${a.blocked||0} blocked/inconclusive, ${a.temporaryError||0} temporary errors, ${a.timeout||0} timeouts, ${a.networkError||0} network errors.`);
    lines.push("- Availability is non-scoring evidence: a reachable page does not prove live playback.","");
  }
  if(availabilityContinuity?.summary){
    const q=availabilityContinuity.summary;
    lines.push("## Availability continuity");
    lines.push(`- ${q.persistentMissing||0} persistent missing; ${q.repeatedTransient||0} repeated transient; ${q.repeatedAccessLimitation||0} repeated access-limitation; ${q.newMissing||0} new missing; ${q.recovered||0} recovered.`);
    for(const item of (availabilityContinuity.incidents||[]).slice(0,5))lines.push(`- ${item.id}: ${item.state} — ${item.action}`);
    lines.push("- Continuity incidents are manual-review evidence only; they do not change catalog health automatically.","");
  }
  if(playbackHorizon?.summary){
    const h=playbackHorizon.summary;
    lines.push("## Inside-ERN playback evidence horizon");
    lines.push(`- ${h.current||0} current; ${h.due6h||0} due within 6h; ${h.due12h||0} due within 12h; ${h.expired||0} expired; ${h.missing||0} missing; ${h.held||0} held.`);
    for(const item of (playbackHorizon.urgent||[]).slice(0,5))lines.push(`- ${item.title||item.id}: ${item.state}${Number.isFinite(item.remainingHours)?` (${item.remainingHours}h)`:""}`);
    lines.push("");
  }
  if(recovery?.restorationCandidates?.length){
    lines.push("## Inside-ERN restoration queue");
    for(const item of recovery.restorationCandidates.slice(0,5))lines.push(`- ${item.title||item.id} — ${item.action||item.reason||"VERIFY"}${Number.isFinite(item.restorationScore)?` (score ${item.restorationScore})`:""}`);
    lines.push("");
  }
  if(recovery?.blocked?.length){
    lines.push("## Inside-ERN blockers");
    for(const item of recovery.blocked.slice(0,5))lines.push(`- ${item.title||item.id} — ${item.reason||item.action||"BLOCKED"}`);
    lines.push("");
  }
  if(research?.next?.length){
    const preflightById=new Map((researchPreflight?.rows||[]).map(x=>[x.id,x]));
    lines.push("## Second-provider research");
    for(const item of research.next.slice(0,3)){
      const p=preflightById.get(item.id);
      const technical=p?.technicalReady?"TECHNICALLY READY":p?.outcome||"PREFLIGHT PENDING";
      lines.push(`- ${item.provider||item.id} / ${item.id}: ${technical}; ${item.permissionReview||"permission review"} + ${item.playbackReview||"playback review"}`);
    }
    lines.push("");
  }
  lines.push("## Next operational focus");
  if((playbackHorizon?.summary?.due6h||0)>0||(playbackHorizon?.summary?.due12h||0)>0)lines.push("- Renew expiring inside-ERN HUMAN_PLAYBACK evidence before LIVE HERE eligibility lapses.");
  if((snapshot?.insideERN?.readyShortfall||0)>0)lines.push("- Restore strong inside-ERN windows with fresh HUMAN_PLAYBACK evidence.");
  if((snapshot?.providers?.families||0)<(snapshot?.providers?.targetFamilies||0))lines.push("- Continue review of a second embeddable provider family; do not promote candidates before permission and playback proof.");
  if((snapshot?.maintenance?.sourceRevalidation||0)>0)lines.push("- Work the highest-priority source revalidation items.");
  if((snapshot?.release?.blockers||0)>0)lines.push("- Keep release blockers visible; do not bypass them for presentation polish.");
  if((availabilityContinuity?.summary?.persistentMissing||0)>0)lines.push("- Review persistent PAGE_MISSING incidents manually before any catalog-health decision.");\n  else if((a?.missing||0)>0)lines.push("- Review new PAGE_MISSING observations manually; wait for repeat evidence before any catalog-health decision.");
  lines.push("","_Read-only operational summary. It does not mutate source truth, health, permissions, ranking or visitor content._");
  return lines.join("\n");
}
