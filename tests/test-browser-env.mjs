class FakeElement{
 constructor(tag="div"){this.tagName=String(tag).toUpperCase();this.children=[];this.parentNode=null;this.className="";this.attributes={};this.style={};this._text="";this.disabled=false;this.isConnected=true}
 set textContent(v){this._text=String(v??"");this.children=[]}
 get textContent(){return this._text+this.children.map(x=>x.textContent).join("")}
 set innerHTML(v){this.children=[];this._text="";for(const m of String(v).matchAll(/<(iframe|video|audio|img|source)\b[^>]*>/gi))this.append(new FakeElement(m[1]))}
 append(...xs){for(const x of xs){if(x==null)continue;x.parentNode=this;this.children.push(x)}}
 appendChild(x){this.append(x);return x}
 replaceChildren(...xs){this.children=[];this.append(...xs)}
 setAttribute(k,v){this.attributes[k]=String(v)}
 getAttribute(k){return this.attributes[k]??null}
 removeAttribute(k){delete this.attributes[k]}
 remove(){if(this.parentNode)this.parentNode.children=this.parentNode.children.filter(x=>x!==this);this.isConnected=false}
 matches(sel){if(sel.startsWith("."))return this.className.split(/\s+/).includes(sel.slice(1));return this.tagName===sel.toUpperCase()}
 querySelectorAll(selector){const sels=String(selector).split(",").map(x=>x.trim()),out=[];const walk=n=>{for(const c of n.children){if(sels.some(s=>c.matches(s)))out.push(c);walk(c)}};walk(this);return out}
 querySelector(selector){return this.querySelectorAll(selector)[0]||null}
}
export function installTestBrowser(){
 globalThis.document={createElement:tag=>new FakeElement(tag),querySelectorAll:()=>[]};
 const data=new Map();
 globalThis.localStorage={getItem:k=>data.has(k)?data.get(k):null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k),clear:()=>data.clear()};
 return{FakeElement,data};
}
installTestBrowser();
