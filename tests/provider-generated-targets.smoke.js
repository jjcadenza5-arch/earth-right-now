import assert from "node:assert/strict";
import {providerGeneratedTargetStatus} from "../src/provider-generated-targets.js";
const prep=providerGeneratedTargetStatus([{id:"x",providerFamilyId:"fam",provider:"Provider",sourceId:"src",integrationKind:"PROVIDER_GENERATED_WIDGET",generatorUrl:"https://example.com/generate",exactCode:null,exactTargetUrl:null,reviewedAt:null,reviewOutcome:null,promotionAllowed:false,catalogMutationAllowed:false,automaticGenerationAllowed:false}]);
assert.equal(prep.state,"PREPARATION_REQUIRED");
assert.equal(prep.items[0].state,"EXACT_PROVIDER_CODE_REQUIRED");
assert.equal(prep.items[0].nextAction,"GENERATE_EXACT_CODE_ON_OFFICIAL_PROVIDER_SURFACE");
assert.equal(prep.safety.permissionInferred,false);
const staged=providerGeneratedTargetStatus([{id:"y",providerFamilyId:"fam",provider:"Provider",sourceId:"src",integrationKind:"PROVIDER_GENERATED_CURRENT_IMAGE",generatorUrl:"https://example.com/generate",exactCode:"<iframe></iframe>",exactTargetUrl:null,reviewedAt:null,reviewOutcome:null,promotionAllowed:false,catalogMutationAllowed:false,automaticGenerationAllowed:false}]);
assert.equal(staged.state,"DEPLOYED_REVIEW_READY");
assert.equal(staged.items[0].state,"DEPLOYED_REVIEW_REQUIRED");
assert.equal(staged.items[0].reviewMode,"AUTOMATED_FETCH_REFRESH_ATTRIBUTION_FIRST");
assert.equal(staged.items[0].nextAction,"VERIFY_CURRENT_IMAGE_FETCH_REFRESH_AND_ATTRIBUTION");
const unsafe=providerGeneratedTargetStatus([{id:"z",providerFamilyId:"fam",provider:"Provider",sourceId:"src",integrationKind:"PROVIDER_GENERATED_WIDGET",generatorUrl:"https://example.com/generate",promotionAllowed:true,catalogMutationAllowed:false,automaticGenerationAllowed:false}]);
assert.equal(unsafe.state,"INVALID_STAGING");
assert.equal(unsafe.invalid,1);
console.log("Provider-generated target staging stays fail-closed");

const authorized=providerGeneratedTargetStatus([{id:"imo",providerFamilyId:"imo-family",provider:"Icelandic Meteorological Office",sourceId:"reykjavik-metoffice",integrationKind:"PROVIDER_AUTHORIZED_CURRENT_IMAGE",generatorUrl:"https://en.vedur.is/weather/observations/webcams/reykjavik/",exactCode:null,exactTargetUrl:null,reviewedAt:null,reviewOutcome:null,promotionAllowed:false,catalogMutationAllowed:false,automaticGenerationAllowed:false}]);
assert.equal(authorized.state,"PREPARATION_REQUIRED");
assert.equal(authorized.items[0].state,"EXACT_PROVIDER_TARGET_URL_REQUIRED");
assert.equal(authorized.items[0].nextAction,"IDENTIFY_EXACT_AUTHORIZED_CURRENT_IMAGE_URL");
assert.equal(authorized.items[0].reviewMode,"AUTOMATED_FETCH_REFRESH_ATTRIBUTION_FIRST");

const blocked=providerGeneratedTargetStatus([{id:"b",providerFamilyId:"fam",provider:"Provider",sourceId:"src",integrationKind:"PROVIDER_GENERATED_WIDGET",generatorUrl:"https://example.com/generate",extractionMode:"INTERACTIVE_PROVIDER_GENERATOR",manualInteractionRequired:true,blockerReason:"interactive",exactCode:null,exactTargetUrl:null,promotionAllowed:false,catalogMutationAllowed:false,automaticGenerationAllowed:false}]);
assert.equal(blocked.manualPreparation,1);
assert.equal(blocked.items[0].manualInteractionRequired,true);
assert.equal(blocked.items[0].extractionMode,"INTERACTIVE_PROVIDER_GENERATOR");
assert.equal(blocked.items[0].blockerReason,"interactive");

const widgetReady=providerGeneratedTargetStatus([{id:"w",providerFamilyId:"fam",provider:"Provider",sourceId:"src",integrationKind:"PROVIDER_GENERATED_WIDGET",generatorUrl:"https://example.com/generate",exactCode:"<iframe></iframe>",exactTargetUrl:null,reviewedAt:null,reviewOutcome:null,promotionAllowed:false,catalogMutationAllowed:false,automaticGenerationAllowed:false}]);
assert.equal(widgetReady.items[0].reviewMode,"DEPLOYED_HUMAN_RENDERING_REQUIRED");
assert.equal(widgetReady.items[0].nextAction,"STAGE_EXACT_TARGET_FOR_DEPLOYED_RENDERING_REVIEW");
