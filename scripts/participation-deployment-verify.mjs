const args=process.argv.slice(2);
const target=args[0],base=String(args[1]||"").replace(/\/$/,"");
if(!["earth-signals","submissions"].includes(target)||!/^https:\/\//.test(base)){
  console.error(JSON.stringify({ok:false,reason:"USAGE",usage:"node scripts/participation-deployment-verify.mjs <earth-signals|submissions> <https-endpoint>"},null,2));
  process.exit(2);
}
let response,body;
try{
  response=await fetch(base+"/health",{headers:{accept:"application/json","user-agent":"ERN-Participation-Verify/1.0"}});
  body=await response.json();
}catch(error){
  console.error(JSON.stringify({ok:false,target,endpoint:base,reason:"HEALTH_UNREACHABLE",detail:String(error?.message||error)},null,2));
  process.exit(1);
}
const common={
  httpsEndpoint:base.startsWith("https://"),
  healthOk:response.ok&&body?.ok===true,
  secretValuesExposed:body?.secretValuesExposed===false,
  rawNetworkIdentifiersStored:body?.rawNetworkIdentifiersStored===false,
  durableStorage:body?.durableStorage===true
};
let checks,publicActivationOff;
if(target==="earth-signals"){
  checks={
    ...common,
    service:body?.service==="ERN Earth Signals API",
    rateSubjectSecretConfigured:body?.rateSubjectSecretConfigured===true,
    reviewTokenConfigured:body?.reviewTokenConfigured===true
  };
  publicActivationOff=body?.contributionsEnabled===false;
}else{
  checks={
    ...common,
    service:body?.service==="ERN Submission API",
    rateSubjectSecretConfigured:body?.rateSubjectSecretConfigured===true,
    reviewTokenConfigured:body?.reviewTokenConfigured===true,
    retentionBounded:Number(body?.retentionDays)>=1&&Number(body?.retentionDays)<=30,
    automaticPublishAllowed:body?.automaticPublishAllowed===false,
    automaticApprovalAllowed:body?.automaticApprovalAllowed===false
  };
  publicActivationOff=body?.submissionEnabled===false;
}
const ok=Object.values(checks).every(Boolean)&&publicActivationOff;
console.log(JSON.stringify({
  ok,
  target,
  endpoint:base,
  observedAt:new Date().toISOString(),
  publicActivationOff,
  checks,
  health:body,
  truth:"Health verification is deployment evidence only. It does not authorize visitor-facing activation or mutate ERN manifests."
},null,2));
if(!ok)process.exitCode=1;
