import assert from "node:assert/strict";
import {EARTH_SIGNAL_PRIVACY_NOTICE_DRAFT,earthSignalPrivacyDraftStatus} from "../src/earth-signal-privacy-notice-draft.js";

const status=earthSignalPrivacyDraftStatus();
assert.equal(status.contentReady,true);
assert.equal(status.published,true);
assert.equal(status.activationSatisfied,true);
assert.equal(status.status,"PUBLISHED");
assert.equal(EARTH_SIGNAL_PRIVACY_NOTICE_DRAFT.retentionMinutes,45);
assert.equal(EARTH_SIGNAL_PRIVACY_NOTICE_DRAFT.publicLocationScope,"PLACE_ONLY");
assert.equal(EARTH_SIGNAL_PRIVACY_NOTICE_DRAFT.preciseCoordinatesPublic,false);
assert.equal(EARTH_SIGNAL_PRIVACY_NOTICE_DRAFT.freeTextAccepted,false);
assert.match(status.truth,/verified at the live public privacy URL/);

const published=earthSignalPrivacyDraftStatus({...EARTH_SIGNAL_PRIVACY_NOTICE_DRAFT,status:"PUBLISHED"});
assert.equal(published.contentReady,true);
assert.equal(published.published,true);
assert.equal(published.activationSatisfied,true);

console.log("Earth Signal privacy notice wording is content-complete and published, while contribution remains deployment-gated");
