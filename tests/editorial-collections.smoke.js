import assert from "node:assert/strict";
import {EDITORIAL_COLLECTIONS,editorialCollectionById,editorialCollectionMatches,editorialCollectionRows,EDITORIAL_COLLECTION_SAFETY} from "../src/editorial-collections.js";
assert.ok(EDITORIAL_COLLECTIONS.length>=5);
for(const x of EDITORIAL_COLLECTIONS){assert.ok(x.id&&x.title&&x.description&&x.query);assert.ok(Array.isArray(x.terms)&&x.terms.length)}
assert.equal(editorialCollectionById("beaches-water")?.title,"Beaches & Water");
const beach={title:"Meads Bay",country:"Anguilla",categories:["beach","water"]};
const city={title:"City Square",country:"X",categories:["city","street"]};
assert.equal(editorialCollectionMatches(beach,editorialCollectionById("beaches-water")),true);
assert.equal(editorialCollectionMatches(city,editorialCollectionById("beaches-water")),false);
assert.deepEqual(editorialCollectionRows([beach,city],editorialCollectionById("beaches-water")),[beach]);
assert.equal(EDITORIAL_COLLECTION_SAFETY.changesSourceTruth,false);
assert.equal(EDITORIAL_COLLECTION_SAFETY.changesPlaybackEligibility,false);
assert.equal(EDITORIAL_COLLECTION_SAFETY.paidRankingAllowed,false);
assert.equal(EDITORIAL_COLLECTION_SAFETY.requiresAnalytics,false);
assert.equal(EDITORIAL_COLLECTION_SAFETY.requiresSocialAccount,false);
console.log("Phase 8 editorial collections are deterministic and truth-neutral");

const lakes=editorialCollectionById('lakes-waterfalls-fjords');
assert.ok(lakes);
for(const title of ['Oeschinensee — Mountain & Lake Views','Niagara Falls waterfall','Flåm & Aurlandsfjord'])assert.equal(editorialCollectionMatches({title},lakes),true,title);
assert.equal(editorialCollectionMatches({title:'City of Lakewood',categories:['city']},lakes),false,'lake substring alone must not classify a city as a lake');
assert.equal(editorialCollectionMatches(city,lakes),false);
const {DISCOVERY_LOCALES,localizedCollection}=await import('../src/editorial-collections-l10n.js');
for(const locale of DISCOVERY_LOCALES){const copy=localizedCollection(lakes.id,locale);assert.ok(copy?.title&&copy?.description,locale+' requires collection copy');}
console.log('Lakes/waterfalls/fjords matching and all seven language entries passed');

const harbours=editorialCollectionById("harbours-waterfronts");
assert.ok(harbours);
for(const title of ["Dublin Port", "Auckland Viaduct Harbour", "Nida Marina", "Waterfront city view"])assert.equal(editorialCollectionMatches({title},harbours),true,title);
for(const title of ["Queenstown Airport", "Passport office", "Sports centre"])assert.equal(editorialCollectionMatches({title},harbours),false,title);
for(const locale of DISCOVERY_LOCALES){const copy=localizedCollection(harbours.id,locale);assert.ok(copy?.title&&copy?.description,locale);}

const islands=editorialCollectionById("islands-coastal-escapes");
for(const title of ["Malolo Lailai — Mamanuca Islands","Izu Oshima Island","Ogasawara harbour"])assert.equal(editorialCollectionMatches({title},islands),true,title);
for(const title of ["Iceland city skyline","Mainland station","Highland ski area"])assert.equal(editorialCollectionMatches({title},islands),false,title);
for(const locale of DISCOVERY_LOCALES)assert.ok(localizedCollection(islands.id,locale)?.description);
