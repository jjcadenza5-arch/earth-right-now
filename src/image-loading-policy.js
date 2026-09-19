export function loadingPriority({surface="",index=0}={}){
 if(surface==="hero")return{eager:true,priority:"high"};
 if(index<2&&["live","windows"].includes(surface))return{eager:false,priority:"auto"};
 return{eager:false,priority:"low"};
}
export function posterLoadingAttrs(options={}){
 const p=loadingPriority(options);
 return{loading:p.eager?"eager":"lazy",fetchpriority:p.priority,decoding:"async"};
}
