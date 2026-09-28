# Stage P — Commercial Attribution Truth

ERN may learn whether visitors open a verified travel option without turning that event into a behavioral profile or a revenue claim.

## Event meaning

`travel_option_opened` means only: a visitor activated a currently verified travel-option link already shown by ERN.

Allowed event fields:
- offer ID;
- place ID;
- intent such as stay/eat/activities;
- destination-level vs experience-level scope;
- whether the link is affiliate;
- whether the placement is sponsored.

The event does **not** mean a booking, purchase, conversion, commission or revenue occurred.

## Privacy and ranking

Analytics remains default-OFF. If no telemetry adapter is intentionally installed, the browser sends no ERN travel event.

The event excludes:
- traveler identity;
- search text;
- favorites or recent-place history;
- email/contact data;
- precise coordinates;
- transaction value;
- booking/reference IDs;
- payment data.

Commercial events must never affect source truth, source health, Watch Earth ordering, Guide source selection, Stories ranking or editorial curation.

## Partner truth

A tracked affiliate URL may be public only when acceptance/tracking evidence exists in ERN's commercial records. Event measurement is independent of affiliate acceptance and does not create or imply a partner relationship.
