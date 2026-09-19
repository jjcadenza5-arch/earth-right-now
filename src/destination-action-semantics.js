export function destinationActionSemantics(place,summary,choice){
 const title=place?.title||"destination";if(!summary?.windows)return{label:"Unavailable",disabled:true,aria:"Unavailable for "+title};
 const label=summary.hasChoice?"Choose a window":"Open window";return{label,disabled:false,aria:label+" for "+title+(choice?" — "+choice:"")};
}
