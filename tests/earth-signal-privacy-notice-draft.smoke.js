import assert from "node:assert/strict";
import {EARTH_SIGNAL_PRIVACY_NOTICE_DRAFT,earthSignalPrivacyDraftStatus} from "../src/earth-signal-privacy-notice-draft.js";

const status=earthSignalPrivacyDraftStatus();
assert.equal(status.contentReady,true);
assert.equal(status.published,false);
assert.equal(status.activationSatisfied,false);
assert.equal(status.status,"DRAFT_NOT_PUBLISHED");
assert.equal(EARTH_SIGNAL_PRIVACY_NOTICE_DRAFT.retentionMinutes,45);
assert.equal(EARTH_SIGNAL_PRIVACY_NOTICE_DRAFT.publicLocationScope,"PLACE_ONLY");
assert.equal(EARTH_SIGNAL_PRIVACY_NOTICE_DRAFT.preciseCoordinatesPublic,false);
assert.equal(EARTH_SIGNAL_PRIVACY_NOTICE_DRAFT.freeTextAccepted,false);
assert.match(status.truth,/not the same as a published privacy notice/);

const published=earthSignalPrivacyDraftStatus({...EARTH_SIGNAL_PRIVACY_NOTICE_DRAFT,status:"PUBLISHED"});
assert.equal(published.contentReady,true);
assert.equal(published.published,true);
assert.equal(published.activationSatisfied,true);

console.log("Earth Signal privacy notice wording is content-complete but remains explicitly unpublished");
