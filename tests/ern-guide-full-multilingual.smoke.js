import assert from "node:assert/strict";
import fs from "node:fs";
import {earthGuideReply,earthGuideFollowUps} from "../src/earth-guide.js";
import {earthGuidePlaceFollowUps} from "../src/earth-guide-place-context.js";
import {earthGuidePreferenceReply} from "../src/earth-guide-preference.js";
import {earthGuideWeatherBoundary} from "../src/earth-guide-weather.js";
import {earthSuggestions} from "../src/earth-suggestions.js";
import {guideCanonicalQuery} from "../src/earth-guide-l10n.js";
import {earthGuideAction} from "../src/earth-guide-actions.js";
import {earthGuidePlaceAction} from "../src/earth-guide-place-context.js";
import {earthGuidePreferenceAction} from "../src/earth-guide-preference.js";

const languages=["th","de","fr","es","ja","zh"];
for(const language of languages){
 const welcome=earthGuideReply({query:"",count:0,items:[]},{language}).text;
 assert.ok(welcome.length>30);assert.notEqual(welcome,earthGuideReply({query:"",count:0,items:[]},{language:"en"}).text);
 const found=earthGuideReply({query:"beautiful mountains",count:1,items:[{title:"Zermatt"}],nearNowCount:1},{language}).text;
 assert.ok(found.includes("Zermatt"));
 const follow=earthGuideFollowUps({query:"beautiful mountains",count:1},{language});assert.equal(follow.length,3);assert.notEqual(follow[0],"Show me what is live right now");assert.equal(guideCanonicalQuery(follow[0],language),"Show me what is live right now");
 const place=earthGuidePlaceFollowUps({id:"zermatt"},{language});assert.equal(place.length,3);assert.equal(guideCanonicalQuery(place[0],language),"Show me now");
 const pref=earthGuidePreferenceReply({type:"PRICE"},{placeTitle:"Zermatt",language}).text;assert.ok(pref.includes("Zermatt"));
 const weather=earthGuideWeatherBoundary(language==="th"?"หิมะ":"snow",{nearNowCount:1},{language});if(weather)assert.ok(weather.text.length>20);
 const suggestions=earthSuggestions({currentAvailable:true,limit:5,includeRecent:false,language});assert.equal(suggestions.length,5);assert.notEqual(suggestions[0].label,"✨ What’s good on Earth right now?");assert.equal(suggestions[0].query,"what is good on Earth right now");
}
const app=fs.readFileSync("src/app.js","utf8");
for(const needle of ["earthGuideReply(result,{tasteSignals:taste.signals,language:language()})","earthGuideWeatherBoundary(query,result,{language:language()})","earthSuggestions({currentAvailable:current.length>0,language:language()})","guideCanonicalQuery(q,language())"])assert.ok(app.includes(needle),needle);
console.log("ERN Guide full multilingual interaction passed");

const direct=[
 ["สุ่มให้ฉัน","มีอะไรใกล้ๆ?","พักที่ไหนได้บ้าง?","ถูกกว่าไหม","เงียบกว่าไหม"],
 ["Überrasche mich","Was ist in der Nähe?","Wo könnte ich übernachten?","Günstiger?","Ruhiger?"],
 ["Surprenez-moi","Qu’y a-t-il à proximité ?","Où puis-je loger ?","Moins cher ?","Plus calme ?"],
 ["Sorpréndeme","¿Qué hay cerca?","¿Dónde podría alojarme?","¿Más barato?","¿Más tranquilo?"],
 ["おまかせ","近くには何がある？","どこに泊まれる？","もっと安い？","もっと静か？"],
 ["随机看看","附近有什么？","哪里可以住？","更便宜？","更安静？"]
];
for(const [surprise,nearby,stay,price,quiet] of direct){assert.equal(earthGuideAction(surprise).type,"SURPRISE");assert.equal(earthGuidePlaceAction(nearby,{placeId:"x"}).type,"NEARBY");assert.equal(earthGuidePlaceAction(stay,{placeId:"x"}).type,"STAY");assert.equal(earthGuidePreferenceAction(price,{placeId:"x"}).type,"PRICE");assert.equal(earthGuidePreferenceAction(quiet,{placeId:"x"}).type,"QUIET")}
console.log("ERN Guide direct multilingual actions passed");
