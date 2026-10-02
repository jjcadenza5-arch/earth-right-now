export const EDITORIAL_COLLECTIONS=Object.freeze([
  {id:"beaches-water",title:"Beaches & Water",description:"Explore current and schedule-verified ERN places by the sea, coast, beach, harbour and water.",terms:["beach","water","sea","coast","surf","harbour","harbor","island"],query:"beaches & water"},
  {id:"mountains-snow",title:"Mountains & Snow",description:"Explore current and schedule-verified mountain, alpine, snow, ski and volcano places on ERN.",terms:["mountain","snow","ski","volcano","alps","alpine"],query:"mountains"},
  {id:"cities-streets",title:"Cities & Streets",description:"Explore current and schedule-verified city, street, skyline, square and urban places on ERN.",terms:["city","cities","street","urban","skyline","square","harbour","harbor","culture"],query:"cities"},
  {id:"wildlife-nature",title:"Wildlife & Nature",description:"Explore current and schedule-verified wildlife, animal, zoo, aquarium, forest, park and nature places on ERN.",terms:["wildlife","animal","zoo","aquarium","bird","forest","park","nature"],query:"wildlife"},
  {id:"calm-scenic",title:"Calm & Scenic Earth",description:"Explore current and schedule-verified scenic, peaceful, nature, mountain, beach and water places on ERN.",terms:["beautiful","scenic","nature","mountain","beach","water","park","forest","island"],query:"somewhere peaceful"}
]);

const fold=v=>String(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

export function editorialCollectionById(id){
  return EDITORIAL_COLLECTIONS.find(x=>x.id===String(id||""))||null;
}

export function editorialCollectionMatches(item,definition){
  if(!item||!definition)return false;
  const hay=fold([...(item.categories||[]),item.title,item.story,item.region,item.country].filter(Boolean).join(" "));
  return (definition.terms||[]).some(term=>hay.includes(fold(term)));
}

export function editorialCollectionRows(rows,definition){
  return (rows||[]).filter(row=>editorialCollectionMatches(row,definition));
}

export function editorialCollectionSummary(rows){
  return EDITORIAL_COLLECTIONS.map(def=>({...def,count:editorialCollectionRows(rows,def).length}));
}

export const EDITORIAL_COLLECTION_SAFETY=Object.freeze({
  changesSourceTruth:false,
  changesPlaybackEligibility:false,
  paidRankingAllowed:false,
  requiresAnalytics:false,
  requiresSocialAccount:false
});
