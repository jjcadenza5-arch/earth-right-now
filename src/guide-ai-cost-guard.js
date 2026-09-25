export const GUIDE_AI_COST_POLICY=Object.freeze({
  maxQueryChars:500,
  maxOutputChars:1600,
  maxRequestsPerSessionPerHour:20,
  maxConcurrentRequestsPerSession:1,
  hardCostCeilingRequired:true,
  automaticCeilingIncreaseAllowed:false
});

export function guideAiCostEvidence(evidence={}){
  const ceiling=Number(evidence.monthlyCostCeilingUsd);
  const providerBudgetConfigured=Number.isFinite(ceiling)&&ceiling>0;
  return{
    ready:providerBudgetConfigured&&evidence.hardStopConfigured===true&&evidence.usageMetering===true,
    monthlyCostCeilingUsd:providerBudgetConfigured?ceiling:null,
    hardStopConfigured:evidence.hardStopConfigured===true,
    usageMetering:evidence.usageMetering===true,
    automaticCeilingIncreaseAllowed:false
  };
}
