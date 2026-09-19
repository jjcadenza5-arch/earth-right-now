import { placeHref,windowHref } from "./place-routing.js";
function baseUrl({origin=typeof location!=="undefined"?location.origin:"",pathname=typeof location!=="undefined"?location.pathname:"/"}={}){return(origin||"")+(pathname||"/")}
export function placeShareUrl(placeId,env={}){const href=placeHref(placeId);return href?baseUrl(env)+href:null}
export function windowShareUrl(sourceId,placeId,env={}){const href=windowHref(sourceId,placeId);return href?baseUrl(env)+href:null}
export function placeShareText(place){return place?.title?`${place.title} — explore this place and its current-source status on Earth Right Now`:"Explore this place and its current-source status on Earth Right Now"}
