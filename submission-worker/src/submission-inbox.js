const DAY_MS=24*60*60*1000;
const MAX_PER_DAY=5;
const MAX_RETAINED_SUBMISSIONS=1000;

function json(status,body){
  return new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
}

export class SubmissionInbox{
  constructor(state){
    this.sql=state.storage.sql;
    this.sql.exec(`CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      submitted_at INTEGER NOT NULL,
      expires_at INTEGER NOT NULL,
      status TEXT NOT NULL,
      record_json TEXT NOT NULL
    )`);
    this.sql.exec(`CREATE INDEX IF NOT EXISTS submissions_expiry ON submissions(expires_at)`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS rate_events (
      subject TEXT NOT NULL,
      at INTEGER NOT NULL
    )`);
    this.sql.exec(`CREATE INDEX IF NOT EXISTS submission_rate_subject_time ON rate_events(subject, at)`);
  }

  cleanup(now){
    this.sql.exec("DELETE FROM submissions WHERE expires_at <= ?",now);
    this.sql.exec("DELETE FROM rate_events WHERE at < ?",now-DAY_MS);
  }

  async fetch(request){
    if(request.method!=="POST")return json(405,{ok:false,reason:"METHOD_NOT_ALLOWED"});
    let b;try{b=await request.json()}catch{return json(400,{ok:false,reason:"INVALID_JSON"})}
    const now=Number.isFinite(+b.now)?+b.now:Date.now();
    this.cleanup(now);

    if(b.op==="rate-check"||b.op==="rate-commit"){
      const subject=String(b.subject||"");
      if(!subject)return json(200,{allowed:false,reason:"RATE_SUBJECT_REQUIRED"});
      const count=Number([...this.sql.exec("SELECT COUNT(*) AS n FROM rate_events WHERE subject = ? AND at >= ?",subject,now-DAY_MS)][0]?.n||0);
      if(count>=MAX_PER_DAY)return json(200,{allowed:false,reason:"RATE_LIMIT"});
      if(b.op==="rate-commit")this.sql.exec("INSERT INTO rate_events(subject,at) VALUES(?,?)",subject,now);
      return json(200,{allowed:true,remaining:MAX_PER_DAY-count-1});
    }

    if(b.op==="put"){
      const record=b.record||{},id=String(b.id||""),submitted=Date.parse(record.submittedAt||""),retentionDays=Math.max(1,Math.min(30,Number(b.retentionDays)||30));
      if(!id||!Number.isFinite(submitted))return json(400,{ok:false,reason:"INVALID_RECORD"});
      const exists=[...this.sql.exec("SELECT id FROM submissions WHERE id = ?",id)][0];
      const retained=Number([...this.sql.exec("SELECT COUNT(*) AS n FROM submissions")][0]?.n||0);
      if(!exists&&retained>=MAX_RETAINED_SUBMISSIONS)return json(503,{ok:false,reason:"SUBMISSION_STORAGE_CAPACITY"});
      const expires=submitted+retentionDays*DAY_MS;
      this.sql.exec("INSERT OR REPLACE INTO submissions(id,submitted_at,expires_at,status,record_json) VALUES(?,?,?,?,?)",
        id,submitted,expires,String(record.status||"PENDING_REVIEW"),JSON.stringify(record));
      return json(200,{ok:true,id,expiresAt:new Date(expires).toISOString()});
    }

    if(b.op==="list"){
      const rows=[...this.sql.exec("SELECT id,submitted_at,expires_at,status,record_json FROM submissions ORDER BY submitted_at ASC")];
      return json(200,{ok:true,submissions:rows.map(r=>({id:r.id,submittedAt:new Date(Number(r.submitted_at)).toISOString(),expiresAt:new Date(Number(r.expires_at)).toISOString(),status:r.status,record:JSON.parse(r.record_json)}))});
    }

    if(b.op==="get"){
      const row=[...this.sql.exec("SELECT id,submitted_at,expires_at,status,record_json FROM submissions WHERE id = ?",String(b.id||""))][0];
      return row?json(200,{ok:true,submission:{id:row.id,submittedAt:new Date(Number(row.submitted_at)).toISOString(),expiresAt:new Date(Number(row.expires_at)).toISOString(),status:row.status,record:JSON.parse(row.record_json)}}):json(404,{ok:false,reason:"NOT_FOUND"});
    }

    if(b.op==="update"){
      const id=String(b.id||""),record=b.record||{};
      if(!id||!record.status)return json(400,{ok:false,reason:"INVALID_UPDATE"});
      const existing=[...this.sql.exec("SELECT expires_at FROM submissions WHERE id = ?",id)][0];
      if(!existing)return json(404,{ok:false,reason:"NOT_FOUND"});
      this.sql.exec("UPDATE submissions SET status = ?, record_json = ? WHERE id = ?",String(record.status),JSON.stringify(record),id);
      return json(200,{ok:true,id,status:record.status,expiresAt:new Date(Number(existing.expires_at)).toISOString()});
    }

    if(b.op==="status"){
      const count=Number([...this.sql.exec("SELECT COUNT(*) AS n FROM submissions")][0]?.n||0);
      return json(200,{ok:true,pendingRecords:count,maxRetentionDays:30,maxRetainedSubmissions:MAX_RETAINED_SUBMISSIONS,automaticPublishAllowed:false});
    }

    return json(404,{ok:false,reason:"UNKNOWN_OPERATION"});
  }
}
