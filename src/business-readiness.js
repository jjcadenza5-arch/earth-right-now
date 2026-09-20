export function businessReadiness({travelBridge=true,disclosures=true,offerVerification=true,submissionValidation=true,submissionReviewGate=true,submissionTransportContract=true,affiliateRegistryContract=true,submissionTransport=false,affiliateInventory=false,partnerReviewWorkflow=true}={}){
 const checks={travelBridge,disclosures,offerVerification,submissionValidation,submissionReviewGate,submissionTransportContract,affiliateRegistryContract,partnerReviewWorkflow,submissionTransport,affiliateInventory};
 const foundational=["travelBridge","disclosures","offerVerification","submissionValidation","submissionReviewGate","submissionTransportContract","affiliateRegistryContract","partnerReviewWorkflow"],activation=["submissionTransport","affiliateInventory"];
 const passed=Object.entries(checks).filter(([,v])=>v).map(([k])=>k);
 return{score:Math.round(100*passed.length/Object.keys(checks).length),stage:activation.every(k=>checks[k])?"ACTIVE":foundational.every(k=>checks[k])?"FOUNDATION_READY":"FOUNDATION_INCOMPLETE",foundationReady:foundational.every(k=>checks[k]),commerciallyActive:activation.every(k=>checks[k]),passed,remaining:Object.keys(checks).filter(k=>!checks[k])}
}
