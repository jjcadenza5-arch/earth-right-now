import assert from "node:assert/strict";
import { attributionModel } from "../src/embed-attribution.js";

const x=attributionModel({provider:"Provider",permission:"EMBED_ALLOWED",sourceUrl:"https://example.test"});
assert.equal(x.required,true);
assert.equal(x.provider,"Provider");
assert.ok(x.href.startsWith("https://"));

const laPalma=attributionModel({
 provider:"Webcam La Palma",
 attribution:"Webcam La Palma — webcam-lapalma.de",
 attributionUrl:"https://webcam-lapalma.de/",
 permission:"EMBED_ALLOWED",
 sourceUrl:"https://webcam-lapalma.de/webcam-aridane-tal/"
});
assert.equal(laPalma.label,"Webcam La Palma — webcam-lapalma.de");
assert.equal(laPalma.href,"https://webcam-lapalma.de/");

console.log("ERN embed attribution supports source-specific required attribution links");
