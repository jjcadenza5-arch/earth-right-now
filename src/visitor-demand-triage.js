import {foldEarthSearchText as fold} from './earth-intent.js';
import {searchEarth} from './search-engine.js';
import {nearNowEvidence} from './now-evidence.js';
import {embedPlaybackProofCurrent} from './playback-proof.js';
import {currentLocalDirectoryEntry} from './local-directory-status.js';
export function visitorDemandTriage(analytics,{sources=[],locals=[],research={},now=new Date()}={}){
 const approved=locals.filter(r=>currentLocalDirectoryEntry(r,{now})),byId=new Map(approved.map(r=>[r.id,r]));
 const current=s=>nearNowEvidence(s,{now})&&embedPlaybackProofCurrent(s,{now});
 const localMatch=q=>{const terms=fold(q).split(/\s+/).filter(Boolean);return approved.filter(r=>{const h=fold([r.name,r.place,r.country,r.type,r.summary,...(r.tags||[])].join(' '));return terms.length&&terms.every(t=>h.includes(t))})};
 const strict=q=>searchEarth(sources,q,{now}).filter(s=>{const h=fold([s.title,s.region,s.city,s.country,...(s.aliases||[])].filter(Boolean).join(' '));return fold(q).split(/\s+/).filter(Boolean).every(t=>h.includes(t))});
 const existing=research.searchDemandGaps?.items||[],rows=[];
 for(const r of analytics.searches||[]){const q=String(r.value||'').trim(),count=Math.max(0,Number(r.count)||0),matched=localMatch(q),views=strict(q);if(!q||!count)continue;rows.push({query:q,searchCount:count,informationIds:matched.map(x=>x.id),sourceIds:views.map(x=>x.id),state:views.some(current)?'CURRENT_VIEW_AVAILABLE':matched.length?'INFORMATION_ONLY':views.length?'SOURCE_RECHECK_REQUIRED':'NO_MATCH',interpretation:'CURRENT_CATALOG_REPLAY_NOT_HISTORICAL_RESULT_PROOF'})}
 const opens=(analytics.places||[]).filter(r=>byId.has(r.value)).map(r=>({informationId:r.value,placeId:byId.get(r.value).placeId,count:Math.max(0,Number(r.count)||0),currentViewForExactInformationPlaceVerified:false}));
 const targets=new Map();
 for(const r of rows.filter(r=>r.state!=='CURRENT_VIEW_AVAILABLE')){
  const keys=r.informationIds.length?r.informationIds:[fold(r.query)];
  for(const key of keys){const t=targets.get(key)||{key,queries:[],searchCount:0,resultOpens:0};t.queries.push(r.query);t.searchCount+=r.searchCount;targets.set(key,t)}
 }
 for(const o of opens){const t=targets.get(o.informationId)||{key:o.informationId,queries:[],searchCount:0,resultOpens:0};t.resultOpens+=o.count;targets.set(o.informationId,t)}
 const items=[...targets.values()].map(t=>{const prior=existing.find(r=>t.queries.some(q=>fold(q)===fold(r.query))),lead=!!prior?.sourceEvidenceUrl,unresolved=prior&&!/CLOSED_BY_PRODUCT_FIX/.test(prior.priority||'');return {...t,placeId:byId.get(t.key)?.placeId||null,existingResearchQuery:prior?.query||null,credibleCameraLeadRequiresReview:lead,action:unresolved?'HOLD_PENDING_NEW_SOURCE_EVIDENCE':(byId.has(t.key)||fold(t.key).length>4)&&(t.searchCount>=3||t.resultOpens>=3)?'REVIEW_EXISTING_RESEARCH_WORKFLOW':'MONITOR',automaticSourceActivationAllowed:false}}).sort((a,b)=>(b.searchCount+b.resultOpens)-(a.searchCount+a.resultOpens));
 return {schemaVersion:1,rows,informationResultOpens:opens,items,informationOnlySearchEvents:rows.filter(r=>r.state==='INFORMATION_ONLY').reduce((n,r)=>n+r.searchCount,0),measurement:{searchesAndOpensAreIndependentAggregateSignals:true,countsAreNotUniqueVisitors:true,resultStateAtEventTimeKnown:false,missingOpenCountsMeanUnobservedNotZero:true},safety:{newResearchQueueCreated:false,automaticSourceActivationAllowed:false,paidRankingAllowed:false,publicSubmissionsAllowed:false}};
}
