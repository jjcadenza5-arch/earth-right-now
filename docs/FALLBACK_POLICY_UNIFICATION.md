# Fallback policy unification

Fallbacks are not a loophole around ERN source truth.

The fallback chain now uses the same canonical playback capability, embed allowlist and safe-HTTP URL policy as the primary player.

Consequences:
- an OFFLINE source cannot fall back into an old embed;
- an unapproved embed host cannot re-enter through fallback logic;
- javascript/non-HTTP URLs cannot become provider fallbacks;
- unknown current mode starts at the first valid policy-approved fallback;
- UNAVAILABLE remains the final honest state.

Automatic iframe "failure detection" is deliberately not claimed: cross-origin playback often cannot be observed reliably. Fallback handoff must be triggered only by an observable failure or explicit policy state.
