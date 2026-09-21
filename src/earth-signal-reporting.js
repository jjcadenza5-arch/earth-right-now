import {earthSignalReport} from "./earth-signal-moderation.js";
export const EARTH_SIGNAL_REPORT_STATES=Object.freeze(["OPEN","RESOLVED_REMOVE","RESOLVED_KEEP"]);
export function earthSignalReportCase(input={}){
 const built=earthSignalReport(input);if(!built.ok)return built;
 return{ok:true,case:{...built.report,state:"OPEN",resolvedAt:null,resolution:null}};
}
export function resolveEarthSignalReport(reportCase={},resolution,{at=new Date().toISOString()}={}){
 if(reportCase.state!=="OPEN")return{ok:false,reason:"NOT_OPEN"};
 if(!["REMOVE","KEEP"].includes(resolution))return{ok:false,reason:"INVALID_RESOLUTION"};
 return{ok:true,case:{...reportCase,state:resolution==="REMOVE"?"RESOLVED_REMOVE":"RESOLVED_KEEP",resolvedAt:at,resolution}};
}
export function earthSignalVisibilityAfterReport(reportCase={}){
 return reportCase.state==="RESOLVED_KEEP";
}
