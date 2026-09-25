function monthKey(date){return date.toISOString().slice(0,7)}

export function createInMemoryGuideAiCostGuard({monthlyCeilingUsd,maxRequestReservationUsd,now=()=>new Date()}={}){
  const ceiling=Number(monthlyCeilingUsd),reservation=Number(maxRequestReservationUsd);
  if(!Number.isFinite(ceiling)||ceiling<=0)throw new Error("MONTHLY_COST_CEILING_REQUIRED");
  if(!Number.isFinite(reservation)||reservation<=0||reservation>ceiling)throw new Error("MAX_REQUEST_RESERVATION_REQUIRED");
  const spent=new Map(),reserved=new Map();

  function state(date=now()){
    const month=monthKey(date),used=spent.get(month)||0,held=reserved.get(month)||0;
    return{month,ceiling,used,held,remaining:Math.max(0,ceiling-used-held)};
  }

  return{
    async allow(){
      const s=state();
      if(s.remaining<reservation)return{allowed:false,reason:"MONTHLY_COST_CEILING_REACHED",...s};
      reserved.set(s.month,s.held+reservation);
      return{allowed:true,reservedUsd:reservation,...state()};
    },
    async commit({usage}={}){
      const s=state(),held=Math.max(0,s.held-reservation);
      reserved.set(s.month,held);
      const estimated=Number(usage?.estimatedCostUsd);
      if(!Number.isFinite(estimated)||estimated<0)return{allowed:false,reason:"USAGE_COST_REQUIRED",...state()};
      if(estimated>reservation)return{allowed:false,reason:"USAGE_EXCEEDS_REQUEST_RESERVATION",estimatedCostUsd:estimated,...state()};
      const next=(spent.get(s.month)||0)+estimated;
      if(next>ceiling)return{allowed:false,reason:"MONTHLY_COST_CEILING_REACHED",estimatedCostUsd:estimated,...state()};
      spent.set(s.month,next);
      return{allowed:true,estimatedCostUsd:estimated,...state()};
    },
    async release(){
      const s=state();reserved.set(s.month,Math.max(0,s.held-reservation));return{released:true,...state()};
    },
    async forfeit(){
      const s=state(),forfeitedUsd=Math.min(reservation,s.held);
      if(forfeitedUsd<=0)return{forfeited:false,forfeitedUsd:0,...s};
      reserved.set(s.month,Math.max(0,s.held-forfeitedUsd));
      spent.set(s.month,(spent.get(s.month)||0)+forfeitedUsd);
      return{forfeited:true,forfeitedUsd,...state()};
    },
    snapshot(){return state()}
  };
}
