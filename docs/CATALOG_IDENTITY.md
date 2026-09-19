# Catalog identity and deduplication

ERN treats source identity as more than a display title.

Promotion/recovery guards compare source IDs, canonical source URLs, official/embed URLs during recovery, repeated recovery URLs, and repeated recovery IDs.

Canonical comparison normalizes host/default ports. Recovery comparison also removes query strings because legacy candidates often carried transient tracking/player parameters; the public catalog guard is more conservative and preserves query strings because some providers use them as real resource identifiers.

Duplicate recovery candidates are rejected with a reason code rather than silently merged. The public catalog rejects duplicate canonical sourceUrl records so one physical/provider camera cannot masquerade as multiple independent windows and distort counts, ranking, favorites, or Watch Earth diversity.

Deduplication never decides permission, truth, or health. A unique source still requires normal verification.
