export const GUIDE_AI_OBSERVABILITY_POLICY=Object.freeze({
  rawPromptLogging:false,
  rawResponseLogging:false,
  rawNetworkIdentifiersStored:false,
  visitorProfiling:false,
  permittedCounters:["requests","success","fallback","rateLimited","costBlocked","modelError","truthRejected","inputRejected"],
  permittedMeasurements:["latencyMs","inputChars","outputChars","estimatedCostUsd"]
});

export function guideAiOperationalEvent(input={}){
  const type=String(input.type||"");
  if(!GUIDE_AI_OBSERVABILITY_POLICY.permittedCounters.includes(type))return{ok:false,reason:"EVENT_TYPE_NOT_ALLOWED"};
  const event={
    type,
    at:input.at||new Date().toISOString(),
    latencyMs:Number.isFinite(input.latencyMs)?Math.max(0,Math.round(input.latencyMs)):null,
    inputChars:Number.isFinite(input.inputChars)?Math.max(0,Math.round(input.inputChars)):null,
    outputChars:Number.isFinite(input.outputChars)?Math.max(0,Math.round(input.outputChars)):null,
    estimatedCostUsd:Number.isFinite(input.estimatedCostUsd)?Math.max(0,input.estimatedCostUsd):null
  };
  return{ok:true,event};
}

export function createInMemoryGuideAiMetrics(){
  const events=[];
  return{
    async record(input){
      const parsed=guideAiOperationalEvent(input);
      if(!parsed.ok)return parsed;
      events.push(parsed.event);return{ok:true};
    },
    snapshot(){return events.map(x=>({...x}))}
  };
}
