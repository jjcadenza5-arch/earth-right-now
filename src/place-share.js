import { placeHref,windowHref } from "./place-routing.js";
import { canonicalUrl } from "./canonical-url.js";
export function placeShareUrl(placeId,env={}){const href=placeHref(placeId);return href?canonicalUrl(href,env):null}
export function windowShareUrl(sourceId,placeId,env={}){const href=windowHref(sourceId,placeId);return href?canonicalUrl(href,env):null}
export function placeShareText(place){return place?.title?`${place.title} — explore this place and its current-source status on Earth Right Now`:"Explore this place and its current-source status on Earth Right Now"}
