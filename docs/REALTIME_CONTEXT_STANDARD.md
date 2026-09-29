# ERN Real-time Context Standard

Status: **ACTIVE INTERNAL STANDARD — PUBLIC ACTIVATION SOURCE-SPECIFIC**

ERN may use current non-camera information to help a visitor understand a place before going. Context is useful only when it is truthful, fresh, attributable and clearly separate from visual source truth.

## Core boundary

A context source may explain **what a place is like now**, but it may never:

- create or upgrade a `LIVE_VIDEO`, `LIVE_IMAGE` or `EXTERNAL_LIVE` label;
- replace camera/playback evidence;
- affect Watch Earth editorial ranking;
- make a stale observation look current;
- hide an otherwise valid camera/source when context fails;
- turn a provider page into an automated data feed unless that acquisition method is separately approved.

## Supported acquisition modes

### 1. Verified API

Use when an official provider publishes a documented machine interface.

Required:
- verified service/dataset identity;
- explicit auth state;
- source/server timestamp;
- approved ERN place mapping;
- bounded cache/staleness behavior;
- attribution;
- failure behavior that hides context, not the camera;
- privacy review.

Current example: Seoul Metropolitan Government `citydata_eng`.

### 2. Official page, manual refresh

Use when an official visitor page publishes genuinely current conditions but no approved machine interface is available.

Required:
- official page URL;
- human verification of the facts recorded;
- explicit observation time and verifier;
- short expiry window;
- allowlist of permitted fields;
- no automatic scraping unless separately reviewed;
- no implication that page text is a camera;
- attribution.

Current research example: official Eiffel Tower attendance/opening/summit/weather conditions.

## Expiry

All context must fail closed after its source-specific freshness window.

- API context uses the provider/source timestamp.
- Manual context uses the human observation timestamp and a bounded expiry.
- Client time may decide whether a record has expired, but it may never create a fresh source timestamp.

Expired context is hidden. The underlying ERN camera/source remains independently available.

## Data minimization

ERN should store only the current facts needed for the visitor decision. Do not build a historical people-movement archive by default.

## Public activation

Context remains public-OFF until its source-specific activation gates are complete. A camera/source may be public while its context remains OFF.

## Commercial boundary

Context may support a visitor's decision, but affiliate availability or commission may not alter context wording, freshness, source selection, or Watch Earth ranking.


## Place mapping

Context must not be attached to an ERN place through fuzzy names, proximity alone, or client inference.

For API context:
- maintain a reviewed mapping registry from ERN `placeId` to provider area identity;
- allow internal validation candidates without making them public;
- require a real provider response to confirm the provider area name/code before public approval;
- keep `mayPublishContext=false` until that response has been validated and the mapping is explicitly approved;
- mapping failure hides context only and never hides the camera/source.

Current Seoul state: ERN has one internal validation candidate, `seoul-plaza` → `Gwanghwamun·Deoksugung`. It remains public-OFF until a real keyed `citydata_eng` response confirms the provider identity.

## Privacy and caching

Real-time context should be current-snapshot utility, not a people-movement archive.

Default rules:
- no visitor profiling;
- no raw network identifiers stored for context;
- no individual identification;
- no CCTV media ingestion through a context adapter;
- no historical movement archive by default;
- bounded cache age only;
- no stale-while-revalidate or stale-on-error behavior that could present expired context as current;
- cache or client clocks may decide expiry but may not manufacture freshness.
