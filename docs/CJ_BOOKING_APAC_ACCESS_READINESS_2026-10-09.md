# CJ Booking.com APAC (7854081) application access review — 2026-10-09

## Owner evidence
CJ sent an email declining ERN's application because its reviewer could not access or verify a functional dedicated website. CJ requests correct URL, working site, technical fixes, About and Contact sections. Rejection does not establish the precise root cause or imply permanent ineligibility.

## Verified repository assessment
- Last verified visitor-facing production revision before this audit: `8b9ea5b1aa53d06f66306bbbdcd2fc97f8b879a2`: Pages #2996 SUCCESS, Operations #1743 SUCCESS, Syntax #1251 SUCCESS.
- Current `main` also includes subsequent documentation-only planning commit `c339c691e392b2537ab95b4452c29ecab172a741`. Do not treat that docs commit as a new browser-tested production release.
- Public homepage accessible to ordinary crawl in external fetch, although one crawler snapshot was stale and still showed older 20-window copy. Do not mistake cached text for actual deployed five-window state.
- `about.html` exists and describes product, source rules, commercial principles and other trust pages.
- No repository-root `contact.html` exists.
- Existing `for-places.html` contains an `owner@example.com` example, not a verified business address. Never publish that placeholder as an actual ERN contact.
- `robots.txt` permits root and lists sitemap, with specific private review and release-verification exclusions.

## Highest-value corrective work
1. Ask owner for a VERIFIED public business contact email or existing working contact endpoint; no fictitious contact details. Once available, publish accessible, crawlable `/contact.html` with `mailto:`, About/Privacy/Policies and company/site name. Link from global footer and About page, ensuring mobile-visible access. Keep privacy disclosure accurate.
2. Verify what exact URL was entered in CJ profile (prefer canonical `https://earthrightnow.app/`; avoid `http:`, obsolete GitHub Pages preview or an incorrect domain). Verify against CJ's actual crawler/reviewer when possible.
3. Test fresh, no-cookie external access for homepage, About, Contact (after publishing), sitemap and example destination pages. Record HTTP/TLS, redirects, robots, HTML visibility without JS, unexpected challenge/region blocking, and screenshot evidence; never infer that human review worked from a green build alone.
4. Check a couple of desktop and mobile routes, five editorial discovery cards, five Watch Earth windows, Search, Atlas zoom, destinations and viewer. Keep human/browser evidence distinct from automated CI.
5. Maintain neutral commercial ranking, truthful source labels and clear affiliate disclosures. Do NOT switch on Travelpayouts Drive, auto rewrite links, activate public Guide/Now Moments or create new CJ applications as a workaround.
6. After a successfully deployed and independently verifiable Contact page, request CJ reconsideration with canonical homepage + About + Contact direct links and concise description of live discovery and travel planning. Do not claim Booking.com APAC affiliation before CJ accepts.

## Release discipline
Same-SHA green Pages, Operations and Syntax and real-domain verification for changes. Preserve lean homepage budget (575 KB total core, 160 KB JS, no eager media), no unlicensed photos, no newly claimed live source. Do not regard a new planning document as a new verified site release.

## Next action
Wait only for the verified business contact channel needed to publish a genuinely usable Contact page. Other safe improvements can continue independently.
