const target=process.argv[2]||"https://earthrightnow.app/";
const expectedImage="https://earthrightnow.app/assets/ern-social-card-v2.png?v=20261005-social3";
const expected={"og:title":"Earth Right Now — The Live Discovery Engine","og:description":"See before you go. Search real places and open truthful live and current views from around the world.","og:url":"https://earthrightnow.app/","og:image":expectedImage,"og:image:width":"1200","og:image:height":"630","og:image:alt":"Earth Right Now — The Live Discovery Engine. See before you go.","twitter:card":"summary_large_image","twitter:image":expectedImage};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function getWithRetry(url,tries=5){let last;for(let i=0;i<tries;i++){try{const r=await fetch(url,{redirect:"follow"});if(r.ok)return r;last=new Error(r.status+" "+r.statusText)}catch(e){last=e}if(i<tries-1)await sleep(5000)}throw last||new Error("request failed")}
const htmlRes=await getWithRetry(target,5);
const html=await htmlRes.text();
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
function meta(name,kind="property"){const e=esc(name);const a=new RegExp("<meta\\s+[^>]*"+kind+"=[\\\"\']"+e+"[\\\"\'][^>]*content=[\\\"\']([^\\\"\']+)[\\\"\'][^>]*>","i");const b=new RegExp("<meta\\s+[^>]*content=[\\\"\']([^\\\"\']+)[\\\"\'][^>]*"+kind+"=[\\\"\']"+e+"[\\\"\'][^>]*>","i");return html.match(a)?.[1]||html.match(b)?.[1]||null}
const actual={"og:title":meta("og:title"),"og:description":meta("og:description"),"og:url":meta("og:url"),"og:image":meta("og:image"),"og:image:width":meta("og:image:width"),"og:image:height":meta("og:image:height"),"og:image:alt":meta("og:image:alt"),"twitter:card":meta("twitter:card","name"),"twitter:image":meta("twitter:image","name")};
const errors=[];for(const [k,v] of Object.entries(expected))if(actual[k]!==v)errors.push(k+": expected "+JSON.stringify(v)+", got "+JSON.stringify(actual[k]));
const imageRes=await getWithRetry(expectedImage,5);
const type=(imageRes.headers.get("content-type")||"").toLowerCase();
if(!type.startsWith("image/png"))errors.push("social image content-type is "+(type||"(missing)"));
const buf=new Uint8Array(await imageRes.arrayBuffer());
if(buf.length<1000)errors.push("social image too small: "+buf.length+" bytes");
const sig=[137,80,78,71,13,10,26,10];if(!sig.every((v,i)=>buf[i]===v))errors.push("social image is not a valid PNG signature");
const u32=i=>((buf[i]<<24)|(buf[i+1]<<16)|(buf[i+2]<<8)|buf[i+3])>>>0;const dimensions={width:u32(16),height:u32(20)};
if(dimensions.width!==1200||dimensions.height!==630)errors.push("social image dimensions are "+dimensions.width+"x"+dimensions.height+", expected 1200x630");
console.log(JSON.stringify({target,status:htmlRes.status,actual,image:{url:expectedImage,status:imageRes.status,contentType:type,bytes:buf.length,...dimensions},ok:errors.length===0,errors},null,2));
if(errors.length)process.exit(1);
