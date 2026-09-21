export function guideTransientState(action,{hasPlace=false}={}){
 if(!action)return{clearResults:false,clearStatus:false,clearFollowUps:false};
 if(action.type==="MISSING_CONTEXT")return{clearResults:true,clearStatus:true,clearFollowUps:true};
 if(["PRICE","QUIET"].includes(action.type))return{clearResults:!hasPlace,clearStatus:true,clearFollowUps:!hasPlace};
 return{clearResults:false,clearStatus:false,clearFollowUps:false};
}
