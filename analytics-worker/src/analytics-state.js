const MAX_DAYS=90;
function json(status,body){return new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}})}
const dayOf=ms=>new Date(ms).toISOString().slice(0,10);
const cleanValue=v=>String(v??"").trim().slice(0,160);
export class AnalyticsState{
  constructor(state){
    this.state=state;this.sql=state.storage.sql;
    this.sql.exec(`CREATE TABLE IF NOT EXISTS visitors (
      visitor_hash TEXT PRIMARY KEY,
      first_seen INTEGER NOT NULL,
      last_seen INTEGER NOT NULL,
      page_views INTEGER NOT NULL DEFAULT 0
    )`);
    this.sql.exec(`CREATE INDEX IF NOT EXISTS visitors_last_seen ON visitors(last_seen)`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS daily_visitors (
      day TEXT NOT NULL,
      visitor_hash TEXT NOT NULL,
      PRIMARY KEY(day, visitor_hash)
    )`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS counters (
      day TEXT NOT NULL,
      dimension TEXT NOT NULL,
      value TEXT NOT NULL,
      count INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY(day, dimension, value)
    )`);
    this.sql.exec(`CREATE INDEX IF NOT EXISTS counters_dimension_day ON counters(dimension, day)`);
  }
  cleanup(now=Date.now(),retentionDays=MAX_DAYS){
    const cutoff=now-Math.max(7,Math.min(Number(retentionDays)||MAX_DAYS,MAX_DAYS))*86400000;
    const cutoffDay=dayOf(cutoff);
    this.sql.exec("DELETE FROM counters WHERE day < ?",cutoffDay);
    this.sql.exec("DELETE FROM daily_visitors WHERE day < ?",cutoffDay);
    this.sql.exec("DELETE FROM visitors WHERE last_seen < ?",cutoff);
  }
  bump(day,dimension,value,amount=1){
    const d=cleanValue(dimension),v=cleanValue(value);if(!d||!v)return;
    this.sql.exec(`INSERT INTO counters(day,dimension,value,count) VALUES(?,?,?,?)
      ON CONFLICT(day,dimension,value) DO UPDATE SET count=count+excluded.count`,day,d,v,Math.max(1,Number(amount)||1));
  }
  record(b){
    const now=Number.isFinite(+b.now)?+b.now:Date.now(),retentionDays=Number(b.retentionDays)||MAX_DAYS;
    this.cleanup(now,retentionDays);
    const e=b.event||{},name=cleanValue(e.name),data=e.data&&typeof e.data==="object"?e.data:{},ctx=b.context&&typeof b.context==="object"?b.context:{};
    const day=dayOf(now),visitorHash=cleanValue(b.visitorHash);
    let visitorStatus="unknown";
    if(name==="page_view"&&visitorHash){
      const prev=[...this.sql.exec("SELECT first_seen,last_seen,page_views FROM visitors WHERE visitor_hash = ?",visitorHash)][0];
      visitorStatus=prev?"returning":"new";
      if(prev)this.sql.exec("UPDATE visitors SET last_seen=?,page_views=page_views+1 WHERE visitor_hash=?",now,visitorHash);
      else this.sql.exec("INSERT INTO visitors(visitor_hash,first_seen,last_seen,page_views) VALUES(?,?,?,1)",visitorHash,now,now);
      this.sql.exec("INSERT OR IGNORE INTO daily_visitors(day,visitor_hash) VALUES(?,?)",day,visitorHash);
      this.bump(day,"visitor_status",visitorStatus);
    }
    this.bump(day,"event",name);
    if(name==="page_view"){
      this.bump(day,"device",ctx.device||"unknown");
      this.bump(day,"country",ctx.country||"unknown");
      if(ctx.region)this.bump(day,"region",[ctx.country,ctx.region].filter(Boolean).join(":"));
      this.bump(day,"referrer",ctx.referrerHost||"direct");
      if(data.route)this.bump(day,"route",data.route);
    }
    if(data.placeId){
      if(name==="travel_option_opened")this.bump(day,"commercial_place",data.placeId);
      else if(name==="share_clicked")this.bump(day,"share_place",data.placeId);
      else if(name==="window_opened"||name==="place_opened")this.bump(day,"place_clean",data.placeId);
    }
    if(data.sourceId){
      if(name==="external_source_opened")this.bump(day,"external_source",data.sourceId);
      else if(name==="window_opened")this.bump(day,"source",data.sourceId);
    }
    if(data.offerId)this.bump(day,"offer",data.offerId);
    if((name==="earth_search"||name==="earth_search_zero")&&data.query)this.bump(day,name==="earth_search_zero"?"search_zero":"search",data.query);
    return{ok:true,visitorStatus};
  }
  top(dimension,sinceDay,limit=20){
    return [...this.sql.exec(`SELECT value,SUM(count) AS count FROM counters WHERE dimension=? AND day>=?
      GROUP BY value ORDER BY count DESC,value ASC LIMIT ?`,dimension,sinceDay,Math.max(1,Math.min(Number(limit)||20,100)))]
      .map(r=>({value:r.value,count:Number(r.count)||0}));
  }
  summary(now=Date.now(),days=30){
    this.cleanup(now,MAX_DAYS);
    const n=Math.max(1,Math.min(Number(days)||30,90)),since=now-(n-1)*86400000,sinceDay=dayOf(since);
    const pageViews=Number([...this.sql.exec("SELECT COALESCE(SUM(count),0) AS n FROM counters WHERE dimension='event' AND value='page_view' AND day>=?",sinceDay)][0]?.n||0);
    const uniqueVisitors=Number([...this.sql.exec("SELECT COUNT(*) AS n FROM visitors WHERE last_seen>=?",since)][0]?.n||0);
    const newVisitors=Number([...this.sql.exec("SELECT COUNT(*) AS n FROM visitors WHERE first_seen>=?",since)][0]?.n||0);
    const dailyUnique=Number([...this.sql.exec("SELECT COUNT(*) AS n FROM daily_visitors WHERE day>=?",sinceDay)][0]?.n||0);
    const dailyVisitorRows=[...this.sql.exec("SELECT day,COUNT(*) AS visitors FROM daily_visitors WHERE day>=? GROUP BY day ORDER BY day ASC",sinceDay)];
    const dailyPageRows=[...this.sql.exec("SELECT day,SUM(count) AS pageViews FROM counters WHERE dimension='event' AND value='page_view' AND day>=? GROUP BY day ORDER BY day ASC",sinceDay)];
    const byDay=new Map();
    for(let i=0;i<n;i++){const day=dayOf(since+i*86400000);byDay.set(day,{day,visitors:0,pageViews:0})}
    for(const r of dailyVisitorRows){if(byDay.has(r.day))byDay.get(r.day).visitors=Number(r.visitors)||0}
    for(const r of dailyPageRows){if(byDay.has(r.day))byDay.get(r.day).pageViews=Number(r.pageViews)||0}
    return{
      ok:true,generatedAt:new Date(now).toISOString(),windowDays:n,
      visitors:{approxUnique:uniqueVisitors,new:newVisitors,returningApprox:Math.max(0,uniqueVisitors-newVisitors),dailyUniqueSum:dailyUnique,pageViews},
      daily:[...byDay.values()],
      devices:this.top("device",sinceDay,8),countries:this.top("country",sinceDay,30),regions:this.top("region",sinceDay,30),
      referrers:this.top("referrer",sinceDay,20),places:this.top("place_clean",sinceDay,30),legacyPlaces:this.top("place",sinceDay,30),sources:this.top("source",sinceDay,30),
      searches:this.top("search",sinceDay,50),searchGaps:this.top("search_zero",sinceDay,50),
      commercialOffers:this.top("offer",sinceDay,30),commercialPlaces:this.top("commercial_place",sinceDay,30),
      externalSources:this.top("external_source",sinceDay,30),sharePlaces:this.top("share_place",sinceDay,30),
      events:this.top("event",sinceDay,30),metricSemantics:{version:2,placeRanking:"window_opened/place_opened only",legacyPlaceRankingMayMixOlderEventTypes:true},
      privacy:{rawIpStored:false,preciseLocationStored:false,eventRowsStored:false,searchesAggregated:true,retentionDays:MAX_DAYS}
    };
  }
  async fetch(request){
    if(request.method!=="POST")return json(405,{ok:false,reason:"METHOD_NOT_ALLOWED"});
    let b;try{b=await request.json()}catch{return json(400,{ok:false,reason:"INVALID_JSON"})}
    if(b.op==="record")return json(200,this.record(b));
    if(b.op==="summary")return json(200,this.summary(Number.isFinite(+b.now)?+b.now:Date.now(),b.days));
    if(b.op==="status"){
      this.cleanup();
      const visitors=Number([...this.sql.exec("SELECT COUNT(*) AS n FROM visitors")][0]?.n||0);
      const counters=Number([...this.sql.exec("SELECT COUNT(*) AS n FROM counters")][0]?.n||0);
      return json(200,{ok:true,visitors,counterRows:counters,rawNetworkIdentifiersStored:false,eventRowsStored:false});
    }
    return json(404,{ok:false,reason:"UNKNOWN_OPERATION"});
  }
}
