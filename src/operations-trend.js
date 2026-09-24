export function operationsTrendSnapshot(report,{availability=null}={}){
  const health=report?.health||{},balance=report?.watchEarthProductBalance||{},recovery=report?.insideERNRecovery||{},providers=report?.insideProviderResilience||{},maintenance=report?.maintenance||{},release=report?.release||{};
  return{
    schemaVersion:1,
    generatedAt:report?.generatedAt||new Date().toISOString(),
    catalog:{
      total:Number(health.total)||0,
      healthy:Number(health.healthy)||0,
      degraded:Number(health.degraded)||0,
      offline:Number(health.offline)||0,
      unknown:Number(health.unknown)||0,
      current:Number(health.current)||0,
      stale:Number(health.stale)||0,
      expired:Number(health.expired)||0
    },
    watchEarth:{
      strongCurrent:Number(balance.strongCurrent)||0,
      insideCurrent:Number(balance.insideCurrent)||0,
      externalCurrent:Number(balance.externalCurrent)||0,
      insideShortfall:Number(balance.insideShortfall)||0,
      recommendedLimit:Number(balance.recommendedLimit)||0,
      status:balance.status||"UNKNOWN"
    },
    insideERN:{
      ready:Number(recovery.ready)||0,
      targetReady:Number(recovery.targetReady)||0,
      readyShortfall:Number(recovery.readyShortfall)||0,
      recoveryDebt:Number(recovery.recoveryDebt)||0,
      degraded:Number(recovery.degraded)||0,
      held:Number(recovery.held)||0
    },
    providers:{
      families:Number(providers.providerFamilies)||0,
      targetFamilies:Number(providers.targetFamilies)||0,
      dominantShare:Number(providers.dominantProviderShare)||0,
      resilient:Boolean(providers.resilient),
      nextGoal:providers.nextGoal||null
    },
    release:{
      ready:Boolean(release.ready),
      blockers:Array.isArray(release.blockers)?release.blockers.length:0
    },
    maintenance:{
      sourceRevalidation:Number(maintenance?.sourceRevalidation?.total)||0,
      atlasUnmapped:Number(maintenance?.atlas?.unmapped)||0,
      atlasLegacy:Number(maintenance?.atlas?.legacy)||0
    },
    availability:availability?{
      sampled:Number(availability?.summary?.total)||0,
      reachable:Number(availability?.summary?.reachable)||0,
      missing:Number(availability?.summary?.missing)||0,
      blocked:Number(availability?.summary?.blocked)||0,
      temporaryError:Number(availability?.summary?.temporaryError)||0,
      timeout:Number(availability?.summary?.timeout)||0,
      networkError:Number(availability?.summary?.networkError)||0
    }:null
  };
}

const paths=[
 ["catalog.healthy",1],["catalog.current",1],["watchEarth.strongCurrent",1],["watchEarth.insideCurrent",2],["insideERN.ready",3],["providers.families",2],
 ["catalog.degraded",-2],["catalog.offline",-3],["catalog.expired",-1],["watchEarth.insideShortfall",-2],["insideERN.readyShortfall",-3],["insideERN.recoveryDebt",-1],["insideERN.degraded",-2],["providers.dominantShare",-2],["release.blockers",-3],["maintenance.sourceRevalidation",-1]
];
function get(obj,path){return path.split(".").reduce((v,k)=>v?.[k],obj)}
export function compareOperationsTrend(previous,current){
  if(!previous)return{direction:"BASELINE",score:0,improved:[],regressed:[],unchanged:[],observational:{availability:{previous:null,current:current?.availability||null,delta:null}},previousGeneratedAt:null,currentGeneratedAt:current?.generatedAt||null};
  const improved=[],regressed=[],unchanged=[];let score=0;
  for(const [path,weight] of paths){
    const a=Number(get(previous,path)),b=Number(get(current,path));
    if(!Number.isFinite(a)||!Number.isFinite(b)){unchanged.push({metric:path,previous:get(previous,path),current:get(current,path),delta:null});continue}
    const delta=Number((b-a).toFixed(3));
    if(delta===0){unchanged.push({metric:path,previous:a,current:b,delta});continue}
    const beneficial=weight>0?delta>0:delta<0;
    const magnitude=Math.min(3,Math.max(1,Math.abs(delta)));
    score+=beneficial?Math.abs(weight)*magnitude:-Math.abs(weight)*magnitude;
    (beneficial?improved:regressed).push({metric:path,previous:a,current:b,delta});
  }
  score=Number(score.toFixed(2));
  const direction=improved.length&&regressed.length?"MIXED":score>0?"IMPROVING":score<0?"REGRESSING":"UNCHANGED";
  const availabilityDelta=(previous?.availability&&current?.availability)?Object.fromEntries(["sampled","reachable","missing","blocked","temporaryError","timeout","networkError"].map(k=>[k,Number(((Number(current.availability[k])||0)-(Number(previous.availability[k])||0)).toFixed(3))])):null;
  return{direction,score,improved,regressed,unchanged,observational:{availability:{previous:previous?.availability||null,current:current?.availability||null,delta:availabilityDelta}},previousGeneratedAt:previous.generatedAt||null,currentGeneratedAt:current?.generatedAt||null};
}
