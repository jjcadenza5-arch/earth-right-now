import assert from "node:assert/strict";import {atlasCoordinateLabel,atlasCoordinateDisclosure} from "../src/atlas-coordinate-copy.js";
assert.equal(atlasCoordinateLabel({coordinateBasis:"CAMERA_EXACT"}),"Camera position");
assert.equal(atlasCoordinateLabel({coordinateBasis:"PLACE_REFERENCE"}),"Place reference point");
assert.match(atlasCoordinateDisclosure({coordinateBasis:"PLACE_REFERENCE"}),/not necessarily the exact camera position/);
assert.equal(atlasCoordinateLabel({}),"Map position");
console.log("ERN Atlas coordinate disclosure passed");