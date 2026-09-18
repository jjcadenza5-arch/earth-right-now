# External navigation

EXTERNAL LIVE is a first-class ERN outcome, not a failed embed.

All programmatic external handoffs use one helper that:
- accepts only HTTP/HTTPS URLs;
- creates a temporary real anchor;
- applies `target=_blank` and `rel=noopener noreferrer`;
- clicks and removes the anchor.

This avoids browser inconsistencies from clicking a detached anchor and keeps provider navigation separate from the immersive ERN player.
