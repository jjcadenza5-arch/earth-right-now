export function destinationActionSemantics(place,summary,choice){
 const title=place?.title||"destination";if(!summary?.windows)return{label:"Unavailable",disabled:true,aria:"Unavailable for "+title};
 const label=summary.hasChoice?"Choose a view":"Open view";return{label,disabled:false,aria:label+" for "+title+(choice?" — "+choice:"")};
}
