export const GITHUB_PAGES_A=["185.199.108.153","185.199.109.153","185.199.110.153","185.199.111.153"];
export const GITHUB_PAGES_AAAA=["2606:50c0:8000::153","2606:50c0:8001::153","2606:50c0:8002::153","2606:50c0:8003::153"];
const norm=x=>String(x||"").trim().replace(/\.$/,"").toLowerCase();
const sorted=x=>[...new Set((x||[]).map(norm).filter(Boolean))].sort();
function diff(actual,expected){const a=sorted(actual),e=sorted(expected);return{missing:e.filter(x=>!a.includes(x)),extra:a.filter(x=>!e.includes(x)),matches:e.every(x=>a.includes(x))&&a.every(x=>e.includes(x))}}
export function pagesDnsAssessment({host="",a=[],aaaa=[],cname=[],caa=[],githubUser="jjcadenza5-arch"}={}){
 const h=norm(host),apex=h.split(".").length===2,target=norm(githubUser)+".github.io";
 const aCheck=diff(a,GITHUB_PAGES_A),aaaaCheck=diff(aaaa,GITHUB_PAGES_AAAA);
 const cn=sorted(cname),cnameMatches=cn.includes(target);
 const caaRows=(caa||[]).map(x=>String(x||"").toLowerCase()),caaPresent=caaRows.length>0,caaAllowsLetsEncrypt=!caaPresent||caaRows.some(x=>x.includes("letsencrypt.org"));
 let dnsState="OK",recommended=[];
 if(apex){
   const hasExpectedA=aCheck.matches||aCheck.extra.length===0&&aCheck.missing.length<GITHUB_PAGES_A.length;
   if(!hasExpectedA){dnsState="APEX_A_MISMATCH";recommended.push("Set apex A records to the four GitHub Pages IPv4 addresses and remove conflicting apex A records.");}
   if(aaaa.length&&!aaaaCheck.matches){if(dnsState==="OK")dnsState="APEX_AAAA_MISMATCH";recommended.push("Either use all four GitHub Pages IPv6 addresses or remove conflicting apex AAAA records.");}
 }else if(h.startsWith("www.")){
   if(!cnameMatches){dnsState="WWW_CNAME_MISMATCH";recommended.push(`Point www CNAME to ${target}.`);}
 }
 if(!caaAllowsLetsEncrypt){if(dnsState==="OK")dnsState="CAA_BLOCKS_LETS_ENCRYPT";recommended.push("Allow letsencrypt.org in CAA records so GitHub Pages can provision HTTPS.");}
 return {host:h,apex,githubPagesTarget:target,dnsState,a:{actual:sorted(a),expected:GITHUB_PAGES_A,...aCheck},aaaa:{actual:sorted(aaaa),expected:GITHUB_PAGES_AAAA,...aaaaCheck},cname:{actual:cn,expected:apex?null:target,matches:apex?null:cnameMatches},caa:{actual:caaRows,present:caaPresent,allowsLetsEncrypt:caaAllowsLetsEncrypt},recommended};
}
export function domainNextAction({state="OK",dns={}}={}){
 if(dns.dnsState&&dns.dnsState!=="OK")return dns.recommended?.[0]||"Repair DNS to match GitHub Pages before retrying HTTPS provisioning.";
 if(state==="PAGES_CUSTOM_CERT_NOT_PROVISIONED")return "GitHub Pages is serving its generic *.github.io certificate for this hostname. Check that the custom domain is set to this repository in Settings → Pages, allow certificate provisioning, then re-add the domain if it remains stuck.";
 if(state==="TLS_HOSTNAME_MISMATCH")return "DNS points somewhere reachable, but the certificate does not cover this hostname. Confirm Pages custom-domain settings; after DNS is correct, remove and re-add the custom domain if GitHub certificate provisioning remains stuck.";
 if(state==="TLS_HANDSHAKE_FAILED")return "Confirm DNS reaches GitHub Pages and that GitHub Pages HTTPS provisioning has completed.";
 if(state==="HTTPS_REQUEST_FAILED")return "TLS is present but the HTTPS request failed; inspect Pages deployment/origin response before changing application code.";
 if(state==="DNS_UNRESOLVED")return "Create the required GitHub Pages DNS records for this hostname.";
 return "No domain remediation required.";
}

export function certificateCoverage({host="",certificate="",dnsState="OK"}={}){
 const h=norm(host);
 const names=[...String(certificate).matchAll(/DNS:([^,\s]+)/g)].map(match=>norm(match[1]));
 const covers=names.some(name=>name===h||name.startsWith("*.")&&h.endsWith(name.slice(1))&&h.split(".").length===name.split(".").length);
 if(covers)return "OK";
 if(dnsState==="OK"&&names.includes("*.github.io"))return "PAGES_CUSTOM_CERT_NOT_PROVISIONED";
 return "TLS_HOSTNAME_MISMATCH";
}
