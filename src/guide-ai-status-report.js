import {GUIDE_AI_CAPABILITIES} from "./guide-ai-capabilities.js";
import {guideAiActivation} from "./guide-ai-activation.js";
import {guideAiDeploymentReadiness} from "./guide-ai-deployment-readiness.js";

export function guideAiStatusReport(capabilities=GUIDE_AI_CAPABILITIES,{deploymentEvidence={}}={}){
  const activation=guideAiActivation(capabilities);
  const deployment=guideAiDeploymentReadiness(deploymentEvidence);
  const ready=activation.ready&&deployment.ready;
  return{
    feature:"Generative ERN Guide",
    mode:ready?"GENERATIVE_ENABLED":"DETERMINISTIC_ONLY",
    ready,
    deterministicFallback:true,
    deployment:{state:deployment.state,ready:deployment.ready,missing:deployment.missing,cost:deployment.cost,costDecisionRequired:!deployment.cost.ready},
    activation:{ready:activation.ready,blockers:activation.blockers},
    publicGenerativeActive:false,
    next:ready?"HUMAN_GATE_PUBLIC_GENERATIVE_GUIDE_DEFERRED_BACKEND_READY":"COMPLETE_BACKEND_READINESS_WITHOUT_PUBLIC_ACTIVATION",
    truth:"Backend/capability readiness is not public activation. The public Guide remains deterministic until a separate human activation decision is recorded."
  };
}
