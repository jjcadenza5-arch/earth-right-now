# Daylight model

ERN's Daylight discovery is an approximate local-clock signal, not a sunrise/sunset claim.

The old Atlas filter depended on a private `_daylight` property that public catalog rows do not reliably carry. As a result, the Daylight switch could silently include almost everything.

Daylight is now computed from each source's IANA timezone at the moment of filtering:
- 06:00–19:59 local time => **Likely daylight**
- otherwise => **Likely night**
- missing/invalid timezone => **Daylight unknown** and excluded from Daylight-only results.

Hero preference uses the same model.

This deliberately says **likely** because local clock time does not account for latitude, season, weather, terrain or exact sunrise/sunset. A future geospatial solar model may refine this where coordinates are trustworthy.
