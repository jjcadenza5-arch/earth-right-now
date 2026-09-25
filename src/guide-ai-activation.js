import {GUIDE_AI_CAPABILITIES} from "./guide-ai-capabilities.js";

const REQUIRED=["transport","secretIsolation","trustedContext","costGuard","rateLimits","idempotency","observability","safetyBoundary","privacyNotice"];

export function guideAiActivation(capabilities=GUIDE_AI_CAPABILITIES){
  const checks=Object.fromEntries(REQUIRED.map(k=>[k,capabilities?.[k]===true]));
  const blockers=REQUIRED.filter(k=>!checks[k]);
  const ready=blockers.length===0&&capabilities?.deterministicFallback===true;
  return{
    ready,
    mode:ready?"GENERATIVE_ENABLED":"DETERMINISTIC_ONLY",
    checks,
    blockers,
    deterministicFallback:capabilities?.deterministicFallback===true,
    truth:"The deterministic ERN Guide remains the fallback. Generative mode cannot activate from client code alone."
  };
}
