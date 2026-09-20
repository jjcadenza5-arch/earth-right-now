# Watch Earth Experience

Watch Earth is a curated journey, not another independent player.

- Uses the same PlaybackController as Hero, Explore, Atlas and My Earth.
- Curated list contains only sources allowed by current source-truth policy.
- Previous/Next remain under visitor control.
- Automatic sequencing is optional and pausable.
- Source changes never autoplay audio.
- Closing Watch Earth stops its timer.
- The journey may become more intelligent using daylight, moments, quality and geographic diversity, but those signals never override truth/health/permission.

## Journey diagnostics
ERN can summarize each curated Watch Earth journey internally by window count, distinct places, distinct countries, inside-ERN playback, solar phases and useful night-city presence. These are regression/curation signals rather than promises shown to visitors. They help protect the simple product goal: a varied set of truthful, beautiful current windows rather than twenty versions of the same place or time of day.

## Representative-time audit
Curators can run `npm run watch-earth:audit` to inspect the same catalog at 00:00, 06:00, 12:00 and 18:00 UTC on the catalog's latest verification day. The output reports journey size, distinct places/countries, inside-ERN playback, night-city count, solar-phase distribution and selected titles. These are internal curation/regression signals, not visitor promises or proof of weather/camera visibility.


## Runtime resilience
A Watch Earth journey should not end because one provider window fails at open/play time. The session skips that failed source and tries the next truthful current candidate; it stops only when no source in the current journey can be opened. Representative-time audit also verifies that selected entries are eligible, unique, and never PREVIEW/reference images.
