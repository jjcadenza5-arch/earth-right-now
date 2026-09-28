const WINDOW_MS=10*60*1000;
const MAX_SUBMISSIONS=6;
const MAX_PLACE_SUBMISSIONS=3;
const MAX_REPORTS=10;

function json(status,body){
  return new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
}

export class SignalState{
  constructor(state){
    this.state=state;
    this.sql=state.storage.sql;
    this.sql.exec(`CREATE TABLE IF NOT EXISTS signals (
      id TEXT PRIMARY KEY,
      place_id TEXT NOT NULL,
      expiry_at INTEGER NOT NULL,
      reported INTEGER NOT NULL DEFAULT 0,
      record_json TEXT NOT NULL
    )`);
    this.sql.exec(`CREATE INDEX IF NOT EXISTS signals_place_expiry ON signals(place_id, expiry_at)`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS reports (
      signal_id TEXT PRIMARY KEY,
      created_at INTEGER NOT NULL,
      report_json TEXT NOT NULL
    )`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS rate_events (
      subject TEXT NOT NULL,
      action TEXT NOT NULL,
      place_id TEXT,
      target_id TEXT,
      at INTEGER NOT NULL
    )`);
    this.sql.exec(`CREATE INDEX IF NOT EXISTS rate_subject_time ON rate_events(subject, at)`);
  }

  cleanup(now){
    this.sql.exec("DELETE FROM signals WHERE expiry_at <= ?",now);
    this.sql.exec("DELETE FROM rate_events WHERE at < ?",now-WINDOW_MS);
  }

  rateDecision({subject,action="SUBMIT",placeId=null,targetId=null,now=Date.now()}){
    this.cleanup(now);
    const rows=[...this.sql.exec("SELECT action, place_id, target_id FROM rate_events WHERE subject = ? AND at >= ?",subject,now-WINDOW_MS)];
    const same=rows.filter(r=>r.action===action);
    if(action==="REPORT"){
      if(!targetId)return{allowed:false,reason:"REPORT_TARGET_REQUIRED"};
      if(same.length>=MAX_REPORTS)return{allowed:false,reason:"REPORT_RATE_LIMIT"};
      if(same.some(r=>r.target_id===targetId))return{allowed:false,reason:"DUPLICATE_REPORT"};
      return{allowed:true,remaining:MAX_REPORTS-same.length-1};
    }
    if(!placeId)return{allowed:false,reason:"INVALID_PLACE"};
    if(same.length>=MAX_SUBMISSIONS)return{allowed:false,reason:"RATE_LIMIT"};
    const atPlace=same.filter(r=>r.place_id===placeId).length;
    if(atPlace>=MAX_PLACE_SUBMISSIONS)return{allowed:false,reason:"PLACE_LIMIT"};
    return{allowed:true,remaining:MAX_SUBMISSIONS-same.length-1};
  }

  async fetch(request){
    if(request.method!=="POST")return json(405,{ok:false,reason:"METHOD_NOT_ALLOWED"});
    let b;try{b=await request.json()}catch{return json(400,{ok:false,reason:"INVALID_JSON"})}
    const now=Number.isFinite(+b.now)?+b.now:Date.now();

    if(b.op==="put-signal"){
      const r=b.record||{},expiry=Date.parse(r.storageExpiryAt||"");
      if(!r.id||!r.placeId||!Number.isFinite(expiry))return json(400,{ok:false,reason:"INVALID_RECORD"});
      this.sql.exec("INSERT OR REPLACE INTO signals(id,place_id,expiry_at,reported,record_json) VALUES(?,?,?,?,?)",
        String(r.id),String(r.placeId),expiry,r.reported===true?1:0,JSON.stringify(r));
      return json(200,{ok:true});
    }

    if(b.op==="list-signals"){
      this.cleanup(now);
      const rows=b.placeId
        ?[...this.sql.exec("SELECT record_json, reported FROM signals WHERE place_id = ? AND expiry_at > ? ORDER BY expiry_at ASC",String(b.placeId),now)]
        :[...this.sql.exec("SELECT record_json, reported FROM signals WHERE expiry_at > ? ORDER BY expiry_at ASC",now)];
      return json(200,{ok:true,signals:rows.map(r=>({...JSON.parse(r.record_json),reported:Boolean(r.reported)}))});
    }

    if(b.op==="put-report"){
      const report=b.report||{},created=Date.parse(report.createdAt||"");
      if(!report.signalId||!Number.isFinite(created))return json(400,{ok:false,reason:"INVALID_REPORT"});
      this.sql.exec("INSERT OR REPLACE INTO reports(signal_id,created_at,report_json) VALUES(?,?,?)",String(report.signalId),created,JSON.stringify(report));
      this.sql.exec("UPDATE signals SET reported = 1 WHERE id = ?",String(report.signalId));
      return json(200,{ok:true});
    }

    if(b.op==="list-reports"){
      this.cleanup(now);
      const rows=[...this.sql.exec("SELECT signal_id,created_at,report_json FROM reports ORDER BY created_at ASC")];
      return json(200,{ok:true,reports:rows.map(r=>({signalId:r.signal_id,createdAt:new Date(Number(r.created_at)).toISOString(),report:JSON.parse(r.report_json)}))});
    }

    if(b.op==="resolve-report"){
      const signalId=String(b.signalId||""),decision=String(b.decision||"");
      if(!signalId||!["RESTORE","REMOVE"].includes(decision))return json(400,{ok:false,reason:"INVALID_RESOLUTION"});
      const exists=[...this.sql.exec("SELECT signal_id FROM reports WHERE signal_id = ?",signalId)][0];
      if(!exists)return json(404,{ok:false,reason:"REPORT_NOT_FOUND"});
      if(decision==="RESTORE"){
        this.sql.exec("UPDATE signals SET reported = 0 WHERE id = ?",signalId);
        const row=[...this.sql.exec("SELECT record_json FROM signals WHERE id = ?",signalId)][0];
        if(row){
          const record={...JSON.parse(row.record_json),reported:false};
          this.sql.exec("UPDATE signals SET record_json = ? WHERE id = ?",JSON.stringify(record),signalId);
        }
      }else{
        this.sql.exec("DELETE FROM signals WHERE id = ?",signalId);
      }
      this.sql.exec("DELETE FROM reports WHERE signal_id = ?",signalId);
      return json(200,{ok:true,signalId,decision,visible:decision==="RESTORE"});
    }

    if(b.op==="delete-expired"){
      const before=[...this.sql.exec("SELECT COUNT(*) AS n FROM signals")][0]?.n||0;
      this.cleanup(now);
      const after=[...this.sql.exec("SELECT COUNT(*) AS n FROM signals")][0]?.n||0;
      return json(200,{ok:true,deleted:Number(before)-Number(after)});
    }

    if(b.op==="rate-check"||b.op==="rate-commit"){
      const decision=this.rateDecision({subject:String(b.subject||""),action:b.action==="REPORT"?"REPORT":"SUBMIT",placeId:b.placeId==null?null:String(b.placeId),targetId:b.targetId==null?null:String(b.targetId),now});
      if(decision.allowed&&b.op==="rate-commit"){
        this.sql.exec("INSERT INTO rate_events(subject,action,place_id,target_id,at) VALUES(?,?,?,?,?)",
          String(b.subject),b.action==="REPORT"?"REPORT":"SUBMIT",b.placeId==null?null:String(b.placeId),b.targetId==null?null:String(b.targetId),now);
      }
      return json(200,decision);
    }

    if(b.op==="status"){
      this.cleanup(now);
      const signals=Number([...this.sql.exec("SELECT COUNT(*) AS n FROM signals")][0]?.n||0);
      const reports=Number([...this.sql.exec("SELECT COUNT(*) AS n FROM reports")][0]?.n||0);
      return json(200,{ok:true,signals,reports,rawNetworkIdentifiersStored:false});
    }

    return json(404,{ok:false,reason:"UNKNOWN_OPERATION"});
  }
}
