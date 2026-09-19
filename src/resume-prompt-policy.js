export function resumePromptPolicy({hasExplicitRoute=false,offer=null}={}){
 if(hasExplicitRoute)return{show:false,reason:"EXPLICIT_ROUTE"};
 if(!offer?.show)return{show:false,reason:offer?.reason||"NO_OFFER"};
 return{...offer,show:true};
}
