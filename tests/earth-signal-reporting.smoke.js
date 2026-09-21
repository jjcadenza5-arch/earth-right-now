import assert from "node:assert/strict";import {earthSignalReportCase,resolveEarthSignalReport,earthSignalVisibilityAfterReport} from "../src/earth-signal-reporting.js";
const opened=earthSignalReportCase({signalId:"s1",reason:"PRIVACY",createdAt:"2026-09-21T12:00:00Z"});
assert.equal(opened.ok,true);assert.equal(opened.case.state,"OPEN");assert.equal(earthSignalVisibilityAfterReport(opened.case),false);
const removed=resolveEarthSignalReport(opened.case,"REMOVE",{at:"2026-09-21T12:05:00Z"});assert.equal(removed.case.state,"RESOLVED_REMOVE");assert.equal(earthSignalVisibilityAfterReport(removed.case),false);
const kept=resolveEarthSignalReport(opened.case,"KEEP",{at:"2026-09-21T12:05:00Z"});assert.equal(kept.case.state,"RESOLVED_KEEP");assert.equal(earthSignalVisibilityAfterReport(kept.case),true);
assert.equal(resolveEarthSignalReport(kept.case,"REMOVE").reason,"NOT_OPEN");
console.log("Earth Signal reporting lifecycle checks passed");
