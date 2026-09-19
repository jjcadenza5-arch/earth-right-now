import "./test-browser-env.mjs";
import { createModalCoordinator } from "../src/modal-coordinator.js";
const a=document.createElement("section"),b=document.createElement("section");a.hidden=false;b.hidden=true;
const m=createModalCoordinator();console.assert(m.suspend(a)&&a.getAttribute("aria-hidden")==="true"&&a.inert===true);console.assert(!m.suspend(b),"hidden modal must not be suspended");console.assert(m.count()===1);console.assert(m.restore(a)&&a.getAttribute("aria-hidden")===null&&a.inert===false);a.setAttribute("aria-hidden","false");a.inert=true;m.suspend(a);m.restoreAll();console.assert(a.getAttribute("aria-hidden")==="false"&&a.inert===true,"preexisting modal state must be restored exactly");console.assert(m.count()===0);
console.log("ERN modal coordinator smoke checks passed");
