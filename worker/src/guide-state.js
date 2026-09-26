import {DurableObject} from "cloudflare:workers";

const json=(x,status=200)=>new Response(JSON.stringify(x),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});
const month=t=>new Date(t).toISOString().slice(0,7);
const day=t=>new Date(t).toISOString().slice(0,10);

export class GuideState extends DurableObject{
  constructor(ctx,env){super(ctx,env);this.ctx=ctx}
  async fetch(request){
    let b;try{b=await request.json()}catch{return json({ok:false,reason:"INVALID_STATE_REQUEST"},400)}
    const now=Date.now(),op=b?.op,subject=String(b?.subject||"");
    if(op==="rate-begin"){
      const key="rate:"+subject,row=await this.ctx.storage.get(key)||{events:[],activeUntil:0};
      row.events=row.events.filter(x=>x>now-3600000);
      if(row.activeUntil>now)return json({allowed:false,reason:"CONCURRENT_REQUEST_LIMIT"});
      if(row.events.length>=20)return json({allowed:false,reason:"RATE_LIMIT"});
      row.events.push(now);row.activeUntil=now+60000;await this.ctx.storage.put(key,row);
      return json({allowed:true,remaining:20-row.events.length});
    }
    if(op==="rate-end"){const key="rate:"+subject,row=await this.ctx.storage.get(key);if(row){row.activeUntil=0;await this.ctx.storage.put(key,row)}return json({ended:true})}
    if(op==="idem-begin"){
      const key="idem:"+subject+":"+b.requestId,row=await this.ctx.storage.get(key);
      if(row&&now-row.at<900000&&row.state==="COMPLETE")return json({ok:true,replay:true,response:row.response});
      if(row&&now-row.at<120000&&row.state==="IN_FLIGHT")return json({ok:false,reason:"REQUEST_ALREADY_IN_PROGRESS"});
      await this.ctx.storage.put(key,{state:"IN_FLIGHT",at:now,response:null});return json({ok:true,replay:false});
    }
    if(op==="idem-complete"){await this.ctx.storage.put("idem:"+subject+":"+b.requestId,{state:"COMPLETE",at:now,response:b.response||null});return json({ok:true})}
    if(op==="idem-abort"){await this.ctx.storage.delete("idem:"+subject+":"+b.requestId);return json({ok:true})}
    if(op==="cost-allow"){
      const ceiling=+b.ceiling,reservation=+b.reservation,key="cost:"+month(now),row=await this.ctx.storage.get(key)||{spent:0,held:0};
      if(!Number.isFinite(ceiling)||!Number.isFinite(reservation)||ceiling<=0||reservation<=0)return json({allowed:false,reason:"COST_POLICY_INVALID"});
      if(ceiling-row.spent-row.held<reservation)return json({allowed:false,reason:"MONTHLY_COST_CEILING_REACHED",used:row.spent,held:row.held,ceiling});
      row.held+=reservation;await this.ctx.storage.put(key,row);return json({allowed:true,reservedUsd:reservation,used:row.spent,held:row.held,ceiling});
    }
    if(op==="cost-commit"){
      const ceiling=+b.ceiling,reservation=+b.reservation,cost=+b.cost,key="cost:"+month(now),row=await this.ctx.storage.get(key)||{spent:0,held:0};
      row.held=Math.max(0,row.held-reservation);
      if(!Number.isFinite(cost)||cost<0||cost>reservation){row.spent=Math.min(ceiling,row.spent+reservation);await this.ctx.storage.put(key,row);return json({allowed:false,reason:"USAGE_EXCEEDS_REQUEST_RESERVATION",estimatedCostUsd:cost,used:row.spent,held:row.held,ceiling})}
      if(row.spent+cost>ceiling){row.spent=ceiling;await this.ctx.storage.put(key,row);return json({allowed:false,reason:"MONTHLY_COST_CEILING_REACHED",estimatedCostUsd:cost,used:row.spent,held:row.held,ceiling})}
      row.spent+=cost;await this.ctx.storage.put(key,row);return json({allowed:true,estimatedCostUsd:cost,used:row.spent,held:row.held,ceiling});
    }
    if(op==="cost-release"||op==="cost-forfeit"){
      const ceiling=+b.ceiling,reservation=+b.reservation,key="cost:"+month(now),row=await this.ctx.storage.get(key)||{spent:0,held:0};
      row.held=Math.max(0,row.held-reservation);if(op==="cost-forfeit")row.spent=Math.min(ceiling,row.spent+reservation);await this.ctx.storage.put(key,row);
      return json(op==="cost-forfeit"?{forfeited:true,forfeitedUsd:reservation,used:row.spent,held:row.held,ceiling}:{released:true,used:row.spent,held:row.held,ceiling});
    }
    if(op==="metric"){
      const allowed=new Set(["requests","success","fallback","rateLimited","costBlocked","modelError","truthRejected","inputRejected"]),type=String(b.event?.type||"");
      if(!allowed.has(type))return json({ok:false,reason:"EVENT_TYPE_NOT_ALLOWED"});
      const key="metrics:"+day(now),row=await this.ctx.storage.get(key)||{counters:{},estimatedCostUsd:0};
      row.counters[type]=(row.counters[type]||0)+1;if(Number.isFinite(+b.event?.estimatedCostUsd))row.estimatedCostUsd+=Math.max(0,+b.event.estimatedCostUsd);await this.ctx.storage.put(key,row);return json({ok:true});
    }
    if(op==="cost-status"){const ceiling=+b.ceiling,key="cost:"+month(now),row=await this.ctx.storage.get(key)||{spent:0,held:0};return json({ok:true,month:month(now),ceiling,used:row.spent,held:row.held,remaining:Math.max(0,ceiling-row.spent-row.held)})}
    return json({ok:false,reason:"UNKNOWN_STATE_OPERATION"},400)
  }
}
