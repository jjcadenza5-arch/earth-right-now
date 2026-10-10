import fs from "node:fs";
const html=fs.readFileSync("press.html","utf8");
const facts=JSON.parse(fs.readFileSync("data/public-brand-facts.json","utf8"));
console.assert(html.includes("See before you go."));
console.assert(html.includes("Payment never bypasses review or buys editorial ranking."));
console.assert(html.includes("Owner-verified public Page"));
console.assert(!/(^|[\\s>])@[A-Za-z][A-Za-z0-9_.-]{1,}/m.test(html),"Press kit must not invent visible social handles");
console.assert(!/mailto:/i.test(html),"Press kit must not invent a contact email");
console.assert(facts.socialAccountClaims.length===2&&facts.socialAccountClaims.some(x=>x.channel==="facebook")&&facts.socialAccountClaims.some(x=>x.channel==="instagram")&&facts.contactClaimed===false);
console.assert(facts.commercialRankingAffected===false);
console.log("Stage O media kit stays official, crawlable and free of invented contact/social claims");
import assert from "node:assert/strict";
import {socialAccountClaimFailures} from "../scripts/social-account-claims.mjs";
const channels=JSON.parse(fs.readFileSync("data/distribution-channels.json","utf8")).channels;
assert.deepEqual(socialAccountClaimFailures(facts.socialAccountClaims,channels),[]);
for(const patch of [{url:"https://www.facebook.com/profile.php?id=1"},{ownerVerified:false},{verifiedAt:"2099-01-01T00:00:00Z"},{channel:"instagram"},{url:"javascript:alert(1)"}])assert.ok(socialAccountClaimFailures([{...facts.socialAccountClaims[0],...patch}],channels).length);
assert.ok(socialAccountClaimFailures([...facts.socialAccountClaims,...facts.socialAccountClaims],channels).length);
assert.deepEqual(channels.filter(x=>x.state==="CONNECTED"),[]);
assert.ok(channels.every(x=>x.automaticPostingAllowed===false));

const instagram=facts.socialAccountClaims.find(x=>x.channel==="instagram");
assert.ok(html.includes(instagram.url));
for(const url of ["https://www.instagram.com/p/","https://www.instagram.com/earthrightnowapp/?redirect=x","https://www.instagram.com:444/earthrightnowapp/","https://www.instagram.com.evil.example/earthrightnowapp/","https://www.instagram.com/accounts/","https://www.instagram.com/earth..right/","https://www.instagram.com/earthrightnowapp./","https://www.instagram.com/reel/abc/","https://user@www.instagram.com/earthrightnowapp/","https://www.instagram.com/earthrightnowapp/#x"]){
 const fakeClaims=facts.socialAccountClaims.map(x=>x.channel==="instagram"?{...x,url}:x);
 const fakeChannels=channels.map(x=>x.id==="instagram"?{...x,publicAccount:{...x.publicAccount,url}}:x);
 assert.ok(socialAccountClaimFailures(fakeClaims,fakeChannels).length,"unsafe Instagram URL rejected even when proof matches");
}
assert.ok(socialAccountClaimFailures(facts.socialAccountClaims,channels.map(x=>x.id==="instagram"?{...x,publicAccount:{...x.publicAccount,ownerVerified:false}}:x)).length);
assert.ok(socialAccountClaimFailures(facts.socialAccountClaims.filter(x=>x.channel!=="instagram"),channels).length);
