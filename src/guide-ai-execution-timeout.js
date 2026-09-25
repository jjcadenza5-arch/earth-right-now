export const GUIDE_AI_EXECUTION_POLICY=Object.freeze({
  defaultModelTimeoutMs:12000,
  minModelTimeoutMs:3000,
  maxModelTimeoutMs:20000,
  abortSignalRequired:true
});

function boundedTimeout(value){
  const n=Number(value);
  if(!Number.isFinite(n))return GUIDE_AI_EXECUTION_POLICY.defaultModelTimeoutMs;
  return Math.max(GUIDE_AI_EXECUTION_POLICY.minModelTimeoutMs,Math.min(GUIDE_AI_EXECUTION_POLICY.maxModelTimeoutMs,Math.round(n)));
}

export async function guideAiRunModelWithTimeout(run,{timeoutMs}={}){
  if(typeof run!=="function")return{ok:false,reason:"MODEL_RUNNER_REQUIRED"};
  const ms=boundedTimeout(timeoutMs),controller=new AbortController();
  let timer=null;
  const task=Promise.resolve().then(()=>run({signal:controller.signal})).then(
    value=>({ok:true,value,timedOut:false,timeoutMs:ms}),
    error=>({ok:false,reason:controller.signal.aborted?"MODEL_TIMEOUT":"MODEL_GENERATION_FAILED",error,timedOut:controller.signal.aborted,timeoutMs:ms})
  );
  const timeout=new Promise(resolve=>{
    timer=setTimeout(()=>{
      controller.abort();
      resolve({ok:false,reason:"MODEL_TIMEOUT",timedOut:true,timeoutMs:ms});
    },ms);
  });
  const result=await Promise.race([task,timeout]);
  if(timer)clearTimeout(timer);
  return result;
}
