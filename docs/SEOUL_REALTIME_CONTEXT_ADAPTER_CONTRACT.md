# Seoul Real-time Context Adapter Contract

Status: **RESEARCH / PUBLIC OFF**

ERN may use Seoul Metropolitan Government real-time city data later as contextual evidence for approved Seoul places. This data is not camera truth and may never manufacture a LIVE label.

## Verified official API

- Dataset: Seoul Real-time City Data (English), dataset ID `OA-22714`.
- Service: `citydata_eng`.
- Official endpoint pattern: `http://openapi.seoul.go.kr:8088/{KEY}/{TYPE}/citydata_eng/1/5/{AREA_NM_OR_CODE}`.
- Supported documented formats include JSON and XML.
- An API key is required. The sample key is limited to Gwanghwamun / Deoksugung.
- The API accepts one area per request and permits an official area name or code.
- ERN must obtain its own key before implementation against non-sample areas.

## Truth boundary

Context can explain a place now, but it cannot:
- create or upgrade a LIVE camera label;
- replace or override source/playback evidence;
- alter Watch Earth editorial ranking;
- remain visible as current after its freshness window fails.

Camera/source failure and context failure are independent. If context is stale or unavailable, hide the current-context layer and keep the normal ERN source visible.

## Server-side behavior

The future adapter must:
1. keep the Seoul API key server-side;
2. request only approved ERN place mappings;
3. retain official area name/code and source timestamp;
4. normalize only fields actually returned by the API;
5. preserve provider wording for congestion categories rather than inventing finer precision;
6. cache conservatively and expose source-observed time;
7. fail closed on provider errors, malformed payloads, unknown areas, missing timestamps or stale data;
8. include required Seoul Metropolitan Government attribution;
9. avoid storing a historical visitor-movement archive unless a later privacy/data review explicitly approves it.

## Initial schema surface

The official English dataset documents common response metadata plus real-time population/congestion fields including:
- `AREA_NM`
- `AREA_CD`
- `LIVE_PPLTN_STTS`
- `AREA_CONGEST_LVL`
- `AREA_CONGEST_MSG`
- `AREA_PPLTN_MIN`
- `AREA_PPLTN_MAX`

The broader real-time city dataset also describes traffic, parking, transit/bike, weather and event data. ERN must verify actual returned JSON fields and timestamps before enabling any of those modules.

## Activation gates

Public activation remains blocked until:
- an ERN-controlled API key exists;
- actual JSON schema and timestamp behavior are tested;
- approved ERN↔Seoul place mappings are explicit;
- attribution copy is implemented;
- cache/staleness policy is tested;
- provider/rate-limit failure behavior is tested;
- Guide wording fails closed when context is stale;
- privacy review is complete.

CCTV links remain a separate source-review lane and do not inherit approval from this data contract.
