import assert from "node:assert/strict";
import { providerHostIntegrity } from "../src/provider-host-integrity.js";

const same=providerHostIntegrity({playback:"EMBED",sourceUrl:"https://example.com/live",embedUrl:"https://embed.example.com/view",officialUrl:"https://example.com/"});
assert.equal(same.ok,true);assert.equal(same.crossProvider,false);

const unsafe=providerHostIntegrity({playback:"EMBED",sourceUrl:"javascript:alert(1)",embedUrl:"http://example.com/embed"});
assert.equal(unsafe.ok,false);assert.ok(unsafe.issues.includes("UNSAFE_SOURCE_URL"));assert.ok(unsafe.issues.includes("UNSAFE_EMBED_URL"));

const cross=providerHostIntegrity({sourceUrl:"https://example.com/live",officialUrl:"https://other.org/"});
assert.equal(cross.crossProvider,true);assert.equal(cross.ok,true);assert.equal(cross.reviewRequired,true);

const suffix=providerHostIntegrity({sourceUrl:"https://cams.example.co.uk/live",officialUrl:"https://example.co.uk/"});
assert.equal(suffix.crossProvider,false);

const unrelatedSuffix=providerHostIntegrity({sourceUrl:"https://one.co.uk/live",officialUrl:"https://two.co.uk/"});
assert.equal(unrelatedSuffix.crossProvider,true);
console.log("provider host integrity passed");

for(const sourceUrl of ["https://localhost/live","https://127.0.0.1/live","https://10.0.0.4/live","https://192.168.1.8/live","https://172.16.0.2/live","https://[::1]/live"]){const r=providerHostIntegrity({sourceUrl});assert.equal(r.ok,false);assert.ok(r.issues.includes("UNSAFE_SOURCE_URL"));}
