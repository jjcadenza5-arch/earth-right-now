import {analyticsConfig,analyticsReady} from "../src/analytics-config.js";import {installAnalytics} from "../src/analytics-adapter.js";
console.assert(analyticsReady(),"explicitly approved first-party analytics should be ready");
const doc={head:{append(x){this.last=x}},createElement(){return{dataset:{},setAttribute(k,v){this[k]=v}}}};
let r=installAnalytics(doc);console.assert(r.enabled&&r.provider==="ERN_FIRST_PARTY"&&r.scriptInjected===false&&!doc.head.last,"first-party analytics must not inject a third-party beacon");
r=installAnalytics(doc,{enabled:true,provider:"CLOUDFLARE_WEB_ANALYTICS",siteToken:"test-token",endpoint:"https://example.test"});console.assert(!r.enabled&&r.reason==="NOT_CONFIGURED","legacy provider should not become ready through first-party readiness policy");
console.log("ERN analytics adapter smoke checks passed");
