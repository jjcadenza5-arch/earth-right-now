const norm=q=>String(q||"").trim().toLowerCase().replace(/\s+/g," ");
const simple=/^(show|find|open|take me to|surprise me|something)\b/;
const complex=/\b(compare|versus|vs|why|which|recommend|suggest|help me|i want|i need|i have|before|after|without|but|except|instead|prefer|should i|where should|what would|good for|better for)\b/;

export function guideAiEscalationDecision({query,deterministic}={}){
  const q=norm(query),tokens=q.split(" ").filter(Boolean);
  if(!q||tokens.length<3)return{eligible:false,reason:"TOO_SIMPLE"};
  if(deterministic?.link||Array.isArray(deterministic?.locals)&&deterministic.locals.length)return{eligible:false,reason:"DIRECT_ERN_ACTION"};
  const items=Array.isArray(deterministic?.items)?deterministic.items:[];
  if(items.length&&tokens.length<=8&&simple.test(q)&&!complex.test(q))return{eligible:false,reason:"DETERMINISTIC_ENOUGH"};
  const noMatch=!items.length;
  const nuanced=complex.test(q)||q.length>=80||tokens.length>=13||/[?].*[?]/.test(q);
  if(noMatch&&tokens.length>=4)return{eligible:true,reason:"DETERMINISTIC_NO_MATCH"};
  if(items.length&&nuanced)return{eligible:true,reason:"NUANCED_SELECTION"};
  return{eligible:false,reason:"DETERMINISTIC_ENOUGH"};
}
