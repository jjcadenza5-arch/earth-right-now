import assert from "node:assert/strict";import fs from "node:fs";import {destinationActionSemantics} from "../src/destination-action-semantics.js";
assert.equal(destinationActionSemantics({title:"A"},{windows:2,hasChoice:true},"").label,"Choose a view");
assert.equal(destinationActionSemantics({title:"A"},{windows:1,hasChoice:false},"").label,"Open view");
assert.equal(destinationActionSemantics({title:"A"},{windows:0,hasChoice:false},"").disabled,true);
const view=fs.readFileSync("src/destination-card-view.js","utf8");assert.ok(view.includes('" · multiple views"'));assert.ok(!view.includes('" · choose your view"'),"status copy should describe state, not duplicate the button action");
console.log("ERN destination card clarity checks passed");
