# Source recency policy

ERN distinguishes **source verification recency** from the age of the media visible inside a provider.

Default verification windows:
- inside-ERN embed: 24 hours;
- refreshed/live image: 24 hours;
- external live/partner source: 72 hours;
- broader external/non-live page: 168 hours.

After the applicable window the source becomes RECHECK DUE, then EXPIRED after three windows.

`CURRENT_CHECK` means ERN recently verified the source endpoint/provider state. It does **not** mean ERN has independently proven every current video frame is live.

This distinction is important for cross-origin streams, where playback can be opaque to the browser.
