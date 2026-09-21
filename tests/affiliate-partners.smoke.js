import { affiliatePartner,activeAffiliatePartner,partnerDisclosure } from "../src/affiliate-partners.js";
const p=affiliatePartner({id:"hotel-x",name:"Hotel X",intent:"stay",baseUrl:"https://example.com/",affiliate:true,enabled:true,verifiedAt:"2026-09-01",expiresAt:"2026-10-01"});
console.assert(activeAffiliatePartner(p,{now:Date.parse("2026-09-19")}));
console.assert(partnerDisclosure(p)==="Affiliate");
console.assert(!activeAffiliatePartner({...p,expiresAt:"2026-09-10"},{now:Date.parse("2026-09-19")}));
console.assert(affiliatePartner({...p,baseUrl:"javascript:alert(1)"})===null);
console.log("ERN affiliate partner smoke checks passed");

console.assert(affiliatePartner({...p,id:""})===null);
console.assert(affiliatePartner({...p,name:""})===null);
console.assert(!activeAffiliatePartner({...p,verifiedAt:"2026-10-02",expiresAt:"2026-10-01"},{now:Date.parse("2026-09-19")}));
console.assert(affiliatePartner({...p,baseUrl:"https://user:pass@example.com/"})===null);

const now=Date.parse("2026-09-19T12:00:00Z");
console.assert(activeAffiliatePartner({...p,verifiedAt:"2026-09-19T12:04:00Z",expiresAt:"2026-10-01"},{now}));
console.assert(!activeAffiliatePartner({...p,verifiedAt:"2026-09-19T12:06:00Z",expiresAt:"2026-10-01"},{now}));

for(const baseUrl of ["https://localhost/","https://127.0.0.1/","https://10.0.0.4/","https://192.168.1.8/","https://172.16.0.2/","https://[::1]/"])console.assert(affiliatePartner({...p,baseUrl})===null,`private affiliate URL must be rejected: ${baseUrl}`);
