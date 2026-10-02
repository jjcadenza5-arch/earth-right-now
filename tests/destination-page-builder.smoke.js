import assert from "node:assert/strict";
import fs from "node:fs";
const builder=fs.readFileSync(new URL("../scripts/build-destination-pages.mjs",import.meta.url),"utf8");
assert.match(builder,/sourceAvailabilityState/,"destination pages must inspect source availability schedules");
assert.match(builder,/Outside published live hours/,"scheduled-closed sources need a truthful public section");
assert.match(builder,/embedPlaybackProofCurrent/,"inside-ERN embeds need fresh playback proof on destination pages");
assert.match(builder,/PLAYBACK RECHECK DUE/,"expired playback proof must not retain a live label");
assert.match(builder,/Playback checked/,"inside-ERN destination cards should expose playback proof date separately from source verification");
assert.match(builder,/const offers=currentItems\.length\?offerForPlace\(id\):\[\]/,"stale-only pages must not surface affiliate offers");
assert.match(builder,/currentTravelOffer/,"affiliate offers must pass current verification");
assert.match(builder,/activeAffiliatePartner/,"affiliate offers must require an active partner");
assert.match(builder,/Affiliate availability never affects ERN source ranking/,"affiliate ranking independence must be disclosed");
assert.match(builder,/These entries are not paid placements/,"reviewed local entries must remain explicitly non-paid");
assert.match(builder,/x\.address/,"reviewed local-place addresses should appear on destination pages when verified");
assert.match(builder,/const indexable=currentItems\.length>0\|\|scheduledClosedItems\.length>0/,"stale-only destination pages must be noindex");
assert.match(builder,/indexable\?"index,follow":"noindex,follow"/,"destination robots state must follow current/scheduled evidence");
assert.match(builder,/if\(indexable\)urls\.push/,"noindex destination pages must stay out of the sitemap");
assert.match(builder,/const primaryCta=currentItems\.length/,"destination primary CTA must depend on current truth");
assert.match(builder,/Explore current ERN windows/,"non-current destination pages need current-alternative CTA");
assert.match(builder,/const structuredRows=placeRows\.filter\(p=>p\.indexable\)/,"structured place directory must exclude reference-only rows");
assert.match(builder,/Number\(b\.indexable\)-Number\(a\.indexable\)/,"place directory should list current/scheduled destinations before reference-only rows");
assert.match(builder,/placeIndexable\(rows\)/,"related destination links should exclude reference-only stale places");
console.log("Destination pages preserve schedule, playback, local-place and commercial truth boundaries");

assert.match(builder,/Explore related places/,"Phase 6 destination pages should expose related discovery");
assert.match(builder,/never by payment/,"related destination discovery must disclose ranking independence");
assert.match(builder,/preferredCategories/,"related destination discovery should use category similarity");

assert.match(builder,/id="placeFilter"/,"Phase 6 Places directory should provide deterministic filtering");
assert.match(builder,/data-search=/,"Places directory rows should expose local filter text only");
assert.match(builder,/matching place/,"Places directory should report filtered result count accessibly");

assert.match(builder,/discoverDefinitions/,"Phase 6 should define deterministic crawlable discovery categories");
assert.match(builder,/discover\/index\.html/,"Phase 6 should build a crawlable Discover index");
assert.match(builder,/base\+"discover\/"\+def\.id/,"Phase 6 category pages should use stable canonical URLs");
assert.match(builder,/categoryMatch\(p,def\)/,"Discovery category membership should be deterministic");
assert.match(builder,/structuredRows\.filter\(p=>categoryMatch\(p,def\)\)/,"Discovery category pages must only use indexable current\/schedule-verified places");
assert.match(builder,/Categories are editorial discovery paths; they never change source truth or paid ranking/,"Discovery index must preserve truth and ranking boundaries");
assert.match(builder,/\.\.\.discoverRows\.map\(x=>\(\{loc:x\.url,lastmod:x\.lastmod\}\)\)/,"Discovery category pages should be included in the sitemap");

assert.match(builder,/EDITORIAL_COLLECTIONS/,"Phase 8 Discover pages should use the shared editorial collection registry");
assert.match(builder,/editorialCollectionRows/,"Phase 8 collection membership should come from the shared deterministic engine");
assert.match(builder,/Share this collection/,"Phase 8 crawlable collection pages should expose channel-neutral sharing");
assert.match(builder,/navigator\.share/,"Collection sharing should prefer native Web Share");
assert.match(builder,/navigator\.clipboard/,"Collection sharing should retain a copy-link fallback");
