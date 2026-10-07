# Stage N — Organic Distribution & Shareability

ERN should be easy to share without depending on paid advertising or pretending social accounts already exist.

## What is ready locally

- canonical ERN Story deep links;
- native Web Share where the visitor's device supports it;
- copy-link fallback;
- current robots/sitemap/OAI-search discoverability;
- structured ERN site identity.

## External channels

Instagram, WhatsApp, LINE, TikTok, YouTube, Facebook and X remain **NOT_CONNECTED** until an official ERN account/channel actually exists and is intentionally connected. Repository readiness is not evidence of an account.

No automatic account creation or posting is permitted from this phase. When real channels exist later, credentials/tokens must remain outside public browser code and each platform's current terms must be reviewed before automation.

## Ranking boundary

Shares, followers, sponsorships and commercial relationships never change ERN's Earth-window truth, playback eligibility or editorial ranking.


## Country discovery and share-entry layer

ERN may publish a country hub only when the current/schedule-verified catalog has enough depth to make the page useful on its own. The minimum is six indexable ERN destinations in that country.

Country hubs:
- are generated from the same fail-closed source truth as destination pages;
- expose multiple real ERN destinations, current/scheduled state and common ERN view types;
- link back into destination pages and broader discovery;
- are included in the sitemap with source-derived last-modified dates;
- never rank or include a place because of affiliate value;
- must not be multiplied into thin city/keyword doorway pages.

Destination pages also expose a native share/copy-link action and, when eligible, a country-hub route. These are visitor utility and organic distribution features, not evidence that any external social account exists.


## Recent destination update feed

ERN publishes `/updates.xml` as a bounded Atom feed containing up to 50 recently updated, crawlable destination pages. It is advertised from `robots.txt` as an additional sitemap-compatible discovery surface and from the homepage with an Atom alternate link.

The feed is generated from the same source-derived destination `lastmod` evidence as the main sitemap. It is not a fake news stream, does not manufacture freshness, and never includes a destination merely because it has commercial value.


## IndexNow freshness notifications

After a successful production deploy, ERN submits a bounded set of recently updated crawlable URLs to IndexNow. The public verification key is deployed at `/indexnow-key.txt`. The submission set comes from ERN's recent-update feed plus core discovery entry points; it does not bulk-submit the entire catalog on every release.

IndexNow is a discovery notification, not a ranking or indexing guarantee. Google discovery continues through the crawlable site, sitemap and owner-verified Search Console. Search-engine treatment never changes ERN source truth or ranking.
