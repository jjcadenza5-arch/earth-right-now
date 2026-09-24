function fmtList(items=[],limit=5){return items.slice(0,limit).map(x=>`- ${x.metric}: ${x.previous} → ${x.current} (${x.delta>0?"+":""}${x.delta})`).join("\n")}
export function operationsOperatorBrief({snapshot,delta,availability,recovery,research,playbackHorizon,researchPreflight,availabilityContinuity,commercialInventory,commercialOnboarding,submissionTransport,commercialVerificationHorizon,playbackEvidenceConsistency,providerFamilyResearch,operatorReviewQueue}={}){
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
  if(operatorReviewQueue?.items?.length){
    const primary=operatorReviewQueue.primaryItems?.length?operatorReviewQueue.primaryItems:operatorReviewQueue.items;
    lines.push("## Operator playback review queue");
    lines.push(`- Inside target: ${operatorReviewQueue.ready??0}/${operatorReviewQueue.targetReady??0}; shortfall ${operatorReviewQueue.readyShortfall??0}. Primary batch: ${operatorReviewQueue.renewalCount||0} renewal + ${operatorReviewQueue.recommendedRestorationCount??Math.min(operatorReviewQueue.restorationCount||0,operatorReviewQueue.readyShortfall||0)} restoration review(s).`);
    for(const item of primary.slice(0,5))lines.push(`- ${item.title||item.id} — ${item.reviewMode||"REVIEW"}${item.reason?` / ${item.reason}`:""}${Number.isFinite(item.remainingHours)?` (${item.remainingHours}h remaining)`:""}`);
    if(operatorReviewQueue.backlogItems?.length)lines.push(`- Backlog retained: ${operatorReviewQueue.backlogItems.length} additional prioritized candidate(s).`);
    lines.push("- Queue ordering is advisory and non-mutating; human playback review is still required.","");
  }
  if(playbackEvidenceConsistency?.summary){
    lines.push("## Playback evidence consistency");
    lines.push(`- Catalog markers: ${playbackEvidenceConsistency.summary.catalogMarkers||0}; HUMAN_PLAYBACK observations: ${playbackEvidenceConsistency.summary.humanObservations||0}; fresh human observations: ${playbackEvidenceConsistency.summary.freshHumanObservations||0}; issues: ${playbackEvidenceConsistency.summary.issues||0}.`);
    for(const item of (playbackEvidenceConsistency.issues||[]).slice(0,5))lines.push(`- ${item.id||"unknown"} — ${item.code}`);
    lines.push("- Consistency audit is read-only; it never creates or refreshes playback proof.","");
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
  if(providerFamilyResearch?.items?.length){
    lines.push("## Provider-family research");
    for(const item of providerFamilyResearch.items.slice(0,5))lines.push(`- ${item.provider||item.id} — ${item.permissionStatus||"permission review"}; ${item.technicalStatus||"technical review"}; next: ${item.nextAction||"manual research"}.`);
    lines.push("- Research-family entries are not public sources and cannot confirm permission, playback or catalog eligibility.","");
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
  if(commercialInventory){
    lines.push("## Commercial staging");
    lines.push(`- Stage: ${commercialInventory.stage||"UNKNOWN"}; public activation ${commercialInventory.publicActivationAllowed?"allowed":"off"}.`);
    lines.push(`- Affiliate partners: ${commercialInventory.partnerRegistry?.active||0} active / ${commercialInventory.partnerRegistry?.total||0} staged; travel offers: ${commercialInventory.travelOfferRegistry?.current||0} current / ${commercialInventory.travelOfferRegistry?.total||0} staged; place coverage ${commercialInventory.travelOfferRegistry?.placeCoverage||0}.`);
    lines.push("- Commercial inventory remains separate from Watch Earth ranking; payment never buys prominence.","");
  }
  if(commercialVerificationHorizon?.summary){
    const h=commercialVerificationHorizon.summary,p=h.partners||{},o=h.offers||{};
    lines.push("## Commercial verification horizon");
    lines.push(`- Partners: ${p.current||0} current; ${p.due30||0} due within 30d; ${p.due14||0} due within 14d; ${p.due7||0} due within 7d; ${p.expired||0} expired; ${p.reviewRequired||0} need review; ${p.inactive||0} inactive.`);
    lines.push(`- Offers: ${o.current||0} current; ${o.due30||0} due within 30d; ${o.due14||0} due within 14d; ${o.due7||0} due within 7d; ${o.expired||0} expired; ${o.reviewRequired||0} need review.`);
    for(const item of (commercialVerificationHorizon.urgent||[]).slice(0,5))lines.push(`- ${item.kind}: ${item.name||item.id} — ${item.state}${Number.isFinite(item.remainingDays)?` (${item.remainingDays}d)`:""}`);
    lines.push("- Verification warnings are maintenance only; nothing is renewed, activated or ranked automatically.","");
  }
  if(commercialOnboarding?.items?.length){
    lines.push("## Commercial onboarding research");
    for(const item of commercialOnboarding.items.slice(0,5))lines.push(`- ${item.title} · ${item.country||"Unknown"} — ${item.recommendedAction} (content-readiness ${item.score})`);
    lines.push("- This is an editorial research queue only; it is not visitor-demand, conversion, or revenue ranking.","");
  }
  if(submissionTransport){
    lines.push("## Submission transport");
    lines.push(`- Status: ${submissionTransport.status||"UNKNOWN"}; delivery ${submissionTransport.active?"ready":"off"}.`);
    if(submissionTransport.missing?.length)lines.push(`- Missing: ${submissionTransport.missing.join(", ")}.`);
    lines.push("- Delivery readiness never implies approval or publication; review remains manual and separate.","");
  }
  lines.push("## Next operational focus");
  if((operatorReviewQueue?.renewalCount||0)>0)lines.push("- Work the operator playback renewal queue before proof expires.");
  else if((playbackHorizon?.summary?.due6h||0)>0||(playbackHorizon?.summary?.due12h||0)>0)lines.push("- Renew expiring inside-ERN HUMAN_PLAYBACK evidence before LIVE HERE eligibility lapses.");
  if((playbackEvidenceConsistency?.summary?.issues||0)>0)lines.push("- Resolve playback-evidence ledger/catalog drift before treating new LIVE HERE proof as authoritative.");
  if((snapshot?.insideERN?.readyShortfall||0)>0)lines.push("- Restore strong inside-ERN windows with fresh HUMAN_PLAYBACK evidence.");
  if((snapshot?.providers?.families||0)<(snapshot?.providers?.targetFamilies||0))lines.push("- Continue review of a second embeddable provider family; do not promote candidates before permission and playback proof.");
  if(providerFamilyResearch?.items?.length&&providerFamilyResearch.items.some(x=>x.technicalStatus==="SPECIFIC_EMBED_URL_REQUIRED"))lines.push("- Identify a current specific player URL for promising provider-family research before deployed playback testing.");
  if((snapshot?.maintenance?.sourceRevalidation||0)>0)lines.push("- Work the highest-priority source revalidation items.");
  if((snapshot?.release?.blockers||0)>0)lines.push("- Keep release blockers visible; do not bypass them for presentation polish.");
  if((availabilityContinuity?.summary?.persistentMissing||0)>0)lines.push("- Review persistent PAGE_MISSING incidents manually before any catalog-health decision.");
  else if((a?.missing||0)>0)lines.push("- Review new PAGE_MISSING observations manually; wait for repeat evidence before any catalog-health decision.");
  if((commercialVerificationHorizon?.summary?.attention||0)>0)lines.push("- Review commercial verification warnings before partner or offer evidence becomes stale; never auto-renew.");
  if(commercialInventory?.stage==="EMPTY_STAGING")lines.push("- Keep the public experience non-commercial until real verified partner inventory exists.");
  if(commercialOnboarding?.items?.length)lines.push("- Research real travel options for the highest content-ready destinations without contacting or listing invented partners.");
  if(submissionTransport&&!submissionTransport.active)lines.push("- Keep camera/place submission delivery closed until a real HTTPS review endpoint, privacy notice and retention window are configured.");
  lines.push("","_Read-only operational summary. It does not mutate source truth, health, permissions, ranking or visitor content._");
  return lines.join("\n");
}
