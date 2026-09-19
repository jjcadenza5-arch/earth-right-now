# ERN AI relevance

ERN AI is a discovery/ranking layer, not a source-truth generator.

Relevance rules:
- current/live wording first narrows the pool through the strict current-source gate;
- semantic scoring happens only inside that eligible pool;
- a query must match destination/source text or a recognized intent before a result is returned;
- unrelated queries return no result rather than a polished but irrelevant camera list;
- an empty query may return the best discoverable Earth windows by source score;
- aliases participate in semantic matching;
- ERN AI cannot upgrade health, permission, truth, currentness or playback capability.

This prevents source quality score from overpowering query relevance.
