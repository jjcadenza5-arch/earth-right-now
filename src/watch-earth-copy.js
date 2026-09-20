import { watchEarthMomentLabel } from "./watch-earth-moment-copy.js";
export function journeyCopy(state,{now=new Date()}={}){if(!state?.source)return {counter:"",action:"Watch Earth",moment:""};return {counter:`${state.index+1} / ${state.total}`,action:state.playing?"Pause journey":"Continue journey",title:state.source.title,moment:watchEarthMomentLabel(state.source,now)}}
