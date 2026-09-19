export function heroRotationPolicy({visibility="visible",reducedMotion=false,viewerOpen=false,drawerOpen=false}={}){
 if(visibility!=="visible")return{rotate:false,reason:"HIDDEN"};
 if(reducedMotion)return{rotate:false,reason:"REDUCED_MOTION"};
 if(viewerOpen||drawerOpen)return{rotate:false,reason:"ACTIVE_EXPERIENCE"};
 return{rotate:true,reason:null};
}
