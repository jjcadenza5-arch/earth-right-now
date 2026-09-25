import {EARTH_SIGNAL_TTL_MINUTES,EARTH_SIGNAL_TYPES} from "./earth-signals.js";
import {earthSignalPrivacyReadiness} from "./earth-signal-privacy-readiness.js";

export const EARTH_SIGNAL_PRIVACY_NOTICE_DRAFT=Object.freeze({
  status:"PUBLISHED",
  purpose:"Let visitors share short-lived structured observations about what a place feels like right now.",
  signalTypes:Object.freeze([...EARTH_SIGNAL_TYPES]),
  retentionMinutes:EARTH_SIGNAL_TTL_MINUTES,
  locationOptional:true,
  publicLocationScope:"PLACE_ONLY",
  mediaMetadataStripped:true,
  reporting:"Visitors can report a signal that appears wrong, misleading, unsafe, spammy or privacy-sensitive.",
  deletion:"Structured Earth Signals expire automatically after 45 minutes; expired public records are deleted by the backend retention process.",
  preciseCoordinatesPublic:false,
  freeTextAccepted:false,
  accountRequired:false
});

export function earthSignalPrivacyDraftStatus(notice=EARTH_SIGNAL_PRIVACY_NOTICE_DRAFT){
  const readiness=earthSignalPrivacyReadiness(notice);
  return{
    contentReady:readiness.ready,
    published:notice.status==="PUBLISHED",
    activationSatisfied:readiness.ready&&notice.status==="PUBLISHED",
    status:notice.status||"UNKNOWN",
    missing:readiness.missing,
    truth:notice.status==="PUBLISHED"
      ?"Published status must still be verified at the live public privacy URL."
      :"Complete draft wording is not the same as a published privacy notice."
  };
}
