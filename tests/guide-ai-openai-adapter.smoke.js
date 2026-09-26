import {createOpenAiGuideModelAdapter,GUIDE_OPENAI_MODEL_DEFAULT} from "../worker/src/openai-model-adapter.js";

console.assert(GUIDE_OPENAI_MODEL_DEFAULT==="gpt-5.6-luna","approved model must stay GPT-5.6 Luna");

let captured=null;
const fakeFetch=async (url,init)=>{
  captured={url,init,body:JSON.parse(init.body)};
  return {
    ok:true,
    async json(){
      return {
        output:[{content:[{type:"output_text",text:JSON.stringify({segments:[{text:"A calm ERN window.",sourceIds:["source-a"]}]})}]}],
        usage:{input_tokens:100,input_tokens_details:{cached_tokens:20},output_tokens:40}
      };
    }
  };
};

const adapter=createOpenAiGuideModelAdapter({apiKey:"test-only",fetchImpl:fakeFetch});
const result=await adapter.generate({
  query:"somewhere calm",
  language:"en",
  trustedContext:{sourceIds:["source-a"],sources:[{id:"source-a",title:"Test"}]},
  constraints:{maxAnswerChars:1600}
});

console.assert(captured.url==="https://api.openai.com/v1/responses","must use Responses API");
console.assert(captured.body.model==="gpt-5.6-luna","must send approved model");
console.assert(captured.body.store===false,"provider-side response storage must be disabled");
console.assert(captured.body.reasoning?.effort==="low","Guide should use low reasoning effort");
console.assert(captured.body.text?.format?.type==="json_schema","Guide output must be schema constrained");
console.assert(captured.body.text.format.schema.properties.segments.items.properties.sourceIds.items.enum.length===1,"schema must restrict source IDs");
console.assert(result.segments[0].sourceIds[0]==="source-a","trusted source must survive");
console.assert(result.usage.estimatedCostUsd>0,"adapter must report estimated model cost");

console.log("guide-ai-openai-adapter smoke: ok");
