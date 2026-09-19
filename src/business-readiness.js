export function businessReadiness({travelBridge=true,disclosures=true,offerVerification=true,submissionValidation=true,submissionTransport=false,affiliateInventory=false,partnerReviewWorkflow=false}={}){
 const checks={travelBridge,disclosures,offerVerification,submissionValidation,submissionTransport,affiliateInventory,partnerReviewWorkflow};
 const foundational=["travelBridge","disclosures","offerVerification","submissionValidation"],activation=["submissionTransport","affiliateInventory","partnerReviewWorkflow"];
 const passed=Object.entries(checks).filter(([,v])=>v).map(([k])=>k);
 return{score:Math.round(100*passed.length/Object.keys(checks).length),foundationReady:foundational.every(k=>checks[k]),commerciallyActive:activation.every(k=>checks[k]),passed,remaining:Object.keys(checks).filter(k=>!checks[k])}
}
