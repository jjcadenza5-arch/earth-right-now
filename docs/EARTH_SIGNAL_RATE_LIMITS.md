# Earth Signal rate-limit contract

Earth Signals should feel immediate without allowing one visitor to flood a place.

The initial policy permits at most six accepted submissions in a rolling ten-minute window and at most three active signals for the same place from one visitor context. These are conservative starting limits and may be tuned from real abuse/usage evidence later.

This module defines the decision semantics only. It does not claim that server-side identity, counters or enforcement exist. The activation gate's **rateLimits** capability stays false until enforcement is implemented outside a bypassable client.
