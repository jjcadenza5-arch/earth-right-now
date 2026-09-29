import assert from "node:assert/strict";
import {readJsonBodyBounded} from "../src/bounded-json-body.js";

function requestFrom(chunks){
  const stream=new ReadableStream({
    start(controller){for(const chunk of chunks)controller.enqueue(new TextEncoder().encode(chunk));controller.close()}
  });
  return{body:stream};
}
const ok=await readJsonBodyBounded(requestFrom(['{"a":', '1}']),32);
assert.deepEqual(ok,{a:1});
await assert.rejects(()=>readJsonBodyBounded(requestFrom(['{"a":']),32),e=>e?.code==="INVALID_JSON");
await assert.rejects(()=>readJsonBodyBounded(requestFrom(['12345','67890']),8),e=>e?.code==="REQUEST_TOO_LARGE");
assert.deepEqual(await readJsonBodyBounded({body:null},8),{});
console.log("Bounded JSON reader rejects oversized and malformed request bodies");
