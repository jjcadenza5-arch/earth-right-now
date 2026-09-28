const DAY_MS=24*60*60*1000;
const MAX_PHOTOS_PER_DAY=3;
const MAX_PHOTOS_PER_PLACE_DAY=2;
const MAX_REPORTS_PER_DAY=10;
const MAX_RETAINED_MEDIA=500;

function json(status,body){
  return new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
}

export class MediaState{
  constructor(state){
    this.sql=state.storage.sql;
    this.sql.exec(`CREATE TABLE IF NOT EXISTS photos (
      id TEXT PRIMARY KEY,
      place_id TEXT NOT NULL,
      expiry_at INTEGER NOT NULL,
      moderation TEXT NOT NULL,
      reported INTEGER NOT NULL DEFAULT 0,
      object_key TEXT NOT NULL,
      record_json TEXT NOT NULL
    )`);
    this.sql.exec(`CREATE INDEX IF NOT EXISTS photos_place_expiry ON photos(place_id, expiry_at)`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS rate_events (
      subject TEXT NOT NULL,
      action TEXT NOT NULL,
      place_id TEXT,
      target_id TEXT,
      at INTEGER NOT NULL
    )`);
    this.sql.exec(`CREATE INDEX IF NOT EXISTS media_rate_subject_time ON rate_events(subject, at)`);
  }

  cleanup(now){
    this.sql.exec("DELETE FROM rate_events WHERE at < ?",now-DAY_MS);
  }

  rateDecision({subject,action="PHOTO",placeId=null,targetId=null,now=Date.now()}){
    this.cleanup(now);
    const rows=[...this.sql.exec("SELECT action, place_id, target_id FROM rate_events WHERE subject = ? AND at >= ?",subject,now-DAY_MS)];
    const same=rows.filter(r=>r.action===action);
    if(action==="REPORT"){
      if(!targetId)return{allowed:false,reason:"REPORT_TARGET_REQUIRED"};
      if(same.length>=MAX_REPORTS_PER_DAY)return{allowed:false,reason:"REPORT_RATE_LIMIT"};
      if(same.some(r=>r.target_id===targetId))return{allowed:false,reason:"DUPLICATE_REPORT"};
      return{allowed:true,remaining:MAX_REPORTS_PER_DAY-same.length-1};
    }
    if(!placeId)return{allowed:false,reason:"INVALID_PLACE"};
    if(same.length>=MAX_PHOTOS_PER_DAY)return{allowed:false,reason:"PHOTO_RATE_LIMIT"};
    const atPlace=same.filter(r=>r.place_id===placeId).length;
    if(atPlace>=MAX_PHOTOS_PER_PLACE_DAY)return{allowed:false,reason:"PHOTO_PLACE_LIMIT"};
    return{allowed:true,remaining:MAX_PHOTOS_PER_DAY-same.length-1};
  }

  async fetch(request){
    if(request.method!=="POST")return json(405,{ok:false,reason:"METHOD_NOT_ALLOWED"});
    let b;try{b=await request.json()}catch{return json(400,{ok:false,reason:"INVALID_JSON"})}
    const now=Number.isFinite(+b.now)?+b.now:Date.now();
    this.cleanup(now);

    if(b.op==="put"){
      const r=b.record||{},expiry=Date.parse(r.storageExpiryAt||"");
      if(!r.id||!r.placeId||!r.objectKey||!Number.isFinite(expiry))return json(400,{ok:false,reason:"INVALID_RECORD"});
      const exists=[...this.sql.exec("SELECT id FROM photos WHERE id = ?",String(r.id))][0];
      const count=Number([...this.sql.exec("SELECT COUNT(*) AS n FROM photos")][0]?.n||0);
      if(!exists&&count>=MAX_RETAINED_MEDIA)return json(503,{ok:false,reason:"MEDIA_STORAGE_CAPACITY"});
      this.sql.exec("INSERT OR REPLACE INTO photos(id,place_id,expiry_at,moderation,reported,object_key,record_json) VALUES(?,?,?,?,?,?,?)",
        String(r.id),String(r.placeId),expiry,String(r.moderation||"PENDING"),r.reported===true?1:0,String(r.objectKey),JSON.stringify(r));
      return json(200,{ok:true});
    }

    if(b.op==="list-review"){
      const rows=[...this.sql.exec("SELECT record_json, reported, moderation FROM photos WHERE expiry_at > ? AND (moderation = 'PENDING' OR moderation = 'REVIEW' OR reported = 1) ORDER BY expiry_at ASC",now)];
      return json(200,{ok:true,records:rows.map(r=>({...JSON.parse(r.record_json),reported:Boolean(r.reported),moderation:r.moderation}))});
    }

    if(b.op==="get"){
      const row=[...this.sql.exec("SELECT record_json, reported, moderation FROM photos WHERE id = ?",String(b.id||""))][0];
      return row?json(200,{ok:true,record:{...JSON.parse(row.record_json),reported:Boolean(row.reported),moderation:row.moderation}}):json(404,{ok:false,reason:"NOT_FOUND"});
    }

    if(b.op==="list"){
      const rows=b.placeId
        ?[...this.sql.exec("SELECT record_json, reported, moderation FROM photos WHERE place_id = ? AND expiry_at > ? ORDER BY expiry_at ASC",String(b.placeId),now)]
        :[...this.sql.exec("SELECT record_json, reported, moderation FROM photos WHERE expiry_at > ? ORDER BY expiry_at ASC",now)];
      return json(200,{ok:true,records:rows.map(r=>({...JSON.parse(r.record_json),reported:Boolean(r.reported),moderation:r.moderation}))});
    }

    if(b.op==="update"){
      const id=String(b.id||""),patch=b.patch||{};
      const row=[...this.sql.exec("SELECT record_json FROM photos WHERE id = ?",id)][0];
      if(!row)return json(404,{ok:false,reason:"NOT_FOUND"});
      const next={...JSON.parse(row.record_json),...patch};
      this.sql.exec("UPDATE photos SET moderation = ?, reported = ?, record_json = ? WHERE id = ?",String(next.moderation||"PENDING"),next.reported===true?1:0,JSON.stringify(next),id);
      return json(200,{ok:true,record:next});
    }

    if(b.op==="delete-expired"){
      const rows=[...this.sql.exec("SELECT record_json FROM photos WHERE expiry_at <= ?",now)].map(r=>JSON.parse(r.record_json));
      this.sql.exec("DELETE FROM photos WHERE expiry_at <= ?",now);
      return json(200,{ok:true,deleted:rows});
    }

    if(b.op==="rate-check"||b.op==="rate-commit"){
      const decision=this.rateDecision({subject:String(b.subject||""),action:b.action==="REPORT"?"REPORT":"PHOTO",placeId:b.placeId==null?null:String(b.placeId),targetId:b.targetId==null?null:String(b.targetId),now});
      if(decision.allowed&&b.op==="rate-commit"){
        this.sql.exec("INSERT INTO rate_events(subject,action,place_id,target_id,at) VALUES(?,?,?,?,?)",
          String(b.subject),b.action==="REPORT"?"REPORT":"PHOTO",b.placeId==null?null:String(b.placeId),b.targetId==null?null:String(b.targetId),now);
      }
      return json(200,decision);
    }

    if(b.op==="status"){
      const count=Number([...this.sql.exec("SELECT COUNT(*) AS n FROM photos")][0]?.n||0);
      return json(200,{ok:true,retainedMedia:count,maxRetainedMedia:MAX_RETAINED_MEDIA,ttlMinutes:45,videoEnabled:false,directBucketPublicAccess:false});
    }

    return json(404,{ok:false,reason:"UNKNOWN_OPERATION"});
  }
}
