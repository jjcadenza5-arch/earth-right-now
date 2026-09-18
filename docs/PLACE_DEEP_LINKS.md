# Place deep links

ERN place links use durable `placeId` identity rather than a camera ID.

Malformed URL encoding now fails closed instead of throwing during route parsing. Unknown place IDs do not invent a destination.

This is important for shared links and favorites: a destination link can survive future camera replacement while individual source IDs remain operational details.
