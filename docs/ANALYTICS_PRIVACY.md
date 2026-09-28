# Analytics / Product Learning

ERN can improve after publication without collecting unnecessary personal data.

Default:
- no telemetry endpoint configured;
- favorites/recent history remain local;
- search text is not transmitted by the core app;
- optional future telemetry receives event categories/IDs rather than personal profiles.

If analytics is later enabled, document it and keep it separate from provider camera requests.


## Commercial attribution boundary
ERN may optionally measure an aggregate `travel_option_opened` event when a visitor opens a verified travel option, but analytics remains default-OFF until intentionally configured. The event is limited to the offer ID, place ID, planning intent, link scope, and affiliate/sponsored flags. It does not include search text, favorites, recent-place history, contact information, precise coordinates, booking references, payment information, transaction value or commission/revenue. Opening a travel link is not treated as evidence that a booking or purchase occurred, and commercial events are not used to rank Earth windows.
