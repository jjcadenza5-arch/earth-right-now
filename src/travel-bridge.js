export function travelContext(place){return {placeId:place.id,title:place.title,region:place.region,country:place.country,coordinates:Number.isFinite(place.lat)&&Number.isFinite(place.lon)?{lat:place.lat,lon:place.lon}:null,intents:["stay","eat","transport","tickets"]}}
export function bridgeReady(place){return Boolean(place&&place.country&&(place.region||place.title))}
