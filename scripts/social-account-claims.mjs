export function socialAccountClaimFailures(claims,channels,{now=Date.now()}={}){
  if(!Array.isArray(claims))return ["social account claims must be an array"];
  const failures=[],seen=new Set();
  for(const claim of claims){
    const channel=channels.find(x=>x.id===claim?.channel),proof=channel?.publicAccount;
    let safe=false;
    try{
      const u=new URL(claim.url),clean=u.protocol==="https:"&&!u.port&&!u.hash&&!u.username&&!u.password;
      const facebook=claim.channel==="facebook"&&u.hostname==="www.facebook.com"&&u.pathname==="/profile.php"&&/^\d+$/.test(u.searchParams.get("id")||"")&&[...u.searchParams.keys()].length===1;
      const handle=u.pathname.slice(1,-1),instagram=claim.channel==="instagram"&&u.hostname==="www.instagram.com"&&/^\/[A-Za-z0-9_][A-Za-z0-9_.]{0,29}\/$/.test(u.pathname)&&!u.search&&!handle.endsWith(".")&&!handle.includes("..")&&!["accounts","p","reel","reels","explore","direct","stories"].includes(handle.toLowerCase());
      safe=clean&&(facebook||instagram);
    }catch{}
    const reviewed=Date.parse(claim?.verifiedAt);
    if(!safe||seen.has(claim.channel)||!proof||claim.ownerVerified!==true||proof.ownerVerified!==true||claim.verificationBasis!=="OWNER_REPORT_AND_SCREENSHOT"||proof.verificationBasis!==claim.verificationBasis||claim.url!==proof.url||claim.verifiedAt!==proof.verifiedAt||!Number.isFinite(reviewed)||reviewed>now+300000)failures.push("unverified or mismatched social account claim");
    seen.add(claim?.channel);
  }
  for(const channel of channels)if(channel.publicAccount&&!claims.some(x=>x.channel===channel.id))failures.push("reviewed public account missing brand claim");
  for(const channel of channels)if(channel.state==="CONNECTED"&&!claims.some(x=>x.channel===channel.id))failures.push("connected channel lacks reviewed identity");
  return failures;
}
