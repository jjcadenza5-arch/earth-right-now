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
