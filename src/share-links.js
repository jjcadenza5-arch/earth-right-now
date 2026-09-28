export function ernStoryUrl(id,{origin="https://earthrightnow.app"}={}){
  const u=new URL("/stories.html",origin);
  if(id)u.searchParams.set("story",String(id));
  return u.toString();
}
export function ernStorySharePayload(story,{origin="https://earthrightnow.app"}={}){
  const question=String(story?.question||"What is Earth showing right now?").trim();
  return{
    title:"Earth Right Now — ERN Stories",
    text:question+" See the real current window on Earth Right Now.",
    url:ernStoryUrl(story?.id,{origin})
  };
}
export async function shareOrCopy(payload,{navigatorLike=globalThis.navigator}={}){
  if(typeof navigatorLike?.share==="function"){
    try{await navigatorLike.share(payload);return{ok:true,method:"WEB_SHARE"}}catch(error){
      if(error?.name==="AbortError")return{ok:false,method:"WEB_SHARE",reason:"CANCELLED"};
    }
  }
  if(typeof navigatorLike?.clipboard?.writeText==="function"){
    await navigatorLike.clipboard.writeText(payload.url);
    return{ok:true,method:"COPY_LINK"};
  }
  return{ok:false,method:"NONE",reason:"SHARE_UNAVAILABLE"};
}
