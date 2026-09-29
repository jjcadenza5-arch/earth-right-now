const DEFAULT_MANIFEST_URL="./data/viator-api-deployment.json";

export async function loadViatorPublicConfig({manifestUrl=DEFAULT_MANIFEST_URL,fetchImpl=fetch}={}){
  try{
    const response=await fetchImpl(manifestUrl,{cache:"no-store",headers:{accept:"application/json"}});
    if(!response.ok)return{enabled:false,reason:"MANIFEST_UNAVAILABLE"};
    const manifest=await response.json();
    const endpoint=String(manifest?.endpointUrl||"").replace(/\/$/,"");
    let url=null;try{url=new URL(endpoint)}catch{}
    const deployedState=new Set(["DEPLOYED_GATED","DEPLOYED_AUTH_CONFIRMED_PUBLIC_OFF","DEPLOYED_VALIDATED_PUBLIC_OFF","DEPLOYED_PUBLIC"]).has(String(manifest?.status||""));
    const enabled=deployedState&&manifest?.publicActivationAllowed===true&&url?.protocol==="https:";
    return{
      enabled,
      reason:enabled?"READY":"PUBLIC_ACTIVATION_OFF",
      endpoint:enabled?url.toString().replace(/\/$/,""):"",
      taxonomyVerified:manifest?.taxonomyVerified===true,
      productSearchVerified:manifest?.productSearchVerified===true,
      affiliateAttributionVerified:manifest?.affiliateAttributionVerified===true
    };
  }catch{return{enabled:false,reason:"MANIFEST_UNAVAILABLE"}}
}

export async function fetchViatorProducts(placeId,{language="en-US",currency="USD",count=6,config,fetchImpl=fetch}={}){
  const cfg=config||await loadViatorPublicConfig({fetchImpl});
  if(!cfg?.enabled)return{ok:false,reason:cfg?.reason||"PUBLIC_ACTIVATION_OFF",products:[]};
  if(!cfg.taxonomyVerified||!cfg.productSearchVerified||!cfg.affiliateAttributionVerified)return{ok:false,reason:"VERIFICATION_INCOMPLETE",products:[]};
  const id=String(placeId||"").trim();
  if(!id)return{ok:false,reason:"MISSING_PLACE_ID",products:[]};
  try{
    const response=await fetchImpl(cfg.endpoint+"/api/viator/products",{
      method:"POST",
      mode:"cors",
      credentials:"omit",
      cache:"no-store",
      headers:{"content-type":"application/json","accept":"application/json"},
      body:JSON.stringify({placeId:id,language,currency,count})
    });
    const body=await response.json().catch(()=>({}));
    if(!response.ok||body?.ok!==true)return{ok:false,reason:String(body?.reason||("HTTP_"+response.status)),products:[]};
    const products=Array.isArray(body.products)?body.products.filter(x=>x&&x.productCode&&x.title&&x.productUrl):[];
    return{ok:true,placeId:id,destination:body.destination||null,products};
  }catch{return{ok:false,reason:"NETWORK_ERROR",products:[]}}
}
