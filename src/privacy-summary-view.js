import { element } from "./safe-dom.js";
import { privacySummary } from "./privacy-summary.js";
export function privacySummaryView(){
 const model=privacySummary(),details=element("details",{className:"privacy-summary"}),summary=element("summary",{text:model.title}),list=element("ul");
 for(const point of model.points)list.append(element("li",{text:point}));
 details.append(summary,list);return details;
}
