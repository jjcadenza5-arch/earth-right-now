# Playback policy unification

The shared PlaybackController no longer carries its own parallel interpretation of source truth.

It now resolves capability through the canonical playback-capability layer first. This matters because embed host allowlisting, health and external-only policy must produce the same answer whether a source is opened from Hero, Choose a Window, Atlas, My Earth, Watch Earth or player history.

A catalog record with an unapproved iframe host can therefore no longer bypass the embed policy by entering through PlaybackController.
