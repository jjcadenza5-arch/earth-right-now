export function destinationCoverage(places=[]){
 const countries=new Set(),regions=new Set();let current=0,windows=0,choices=0;
 for(const p of places){if(p?.country)countries.add(p.country);if(p?.region)regions.add(p.region);const ss=p?.sources||[];windows+=ss.length;if(ss.length>1)choices++;if(ss.some(s=>s?.checkedAt||s?.lastSuccessfulCheck))current++}
 return{destinations:places.length,windows,countries:countries.size,regions:regions.size,multiWindowDestinations:choices,checkedDestinations:current};
}
export function destinationCoverageCopy(places=[]){const x=destinationCoverage(places);return x.destinations?x.destinations+" destinations · "+x.windows+" windows · "+x.countries+" countries":"No destinations in this view"}
