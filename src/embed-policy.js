const ALLOW=new Set(["www.youtube.com","youtube.com","www.youtube-nocookie.com","couchtourist.com","www.couchtourist.com","webcam-lapalma.de","www.webcam-lapalma.de"]);
export function embedHost(value){try{return new URL(value,"https://ern.invalid/").hostname.toLowerCase()}catch{return""}}
export function allowedEmbedUrl(value){try{const u=new URL(value,"https://ern.invalid/");return u.protocol==="https:"&&!u.username&&!u.password&&ALLOW.has(u.hostname.toLowerCase())?u.toString():null}catch{return null}}
export function allowedResearchEmbedUrl(value){
  const normal=allowedEmbedUrl(value);if(normal)return normal;
  try{
    const u=new URL(value,"https://ern.invalid/"),host=u.hostname.toLowerCase().replace(/^www\./,"");
    if(u.protocol!=="https:"||u.username||u.password)return null;
    if(host==="explore.org"&&u.pathname.startsWith("/livecams/player/"))return u.toString();
    if(host==="webcam-lapalma.de"&&u.pathname.startsWith("/embed/"))return u.toString();
    return null;
  }catch{return null}
}
export function embedSandbox(source){
  const host=embedHost(source?.embedUrl).replace(/^www\./,"");
  if(host.endsWith("youtube.com")||host==="youtube-nocookie.com")return"allow-scripts allow-same-origin allow-presentation";
  if(host==="couchtourist.com")return"allow-scripts allow-same-origin allow-presentation allow-popups";
  if(host==="webcam-lapalma.de")return"allow-scripts allow-same-origin allow-presentation";
  if(host==="explore.org")return"allow-scripts allow-same-origin allow-presentation";
  if(host==="webcam-lapalma.de")return"allow-scripts allow-same-origin allow-presentation";
  return"";
}
