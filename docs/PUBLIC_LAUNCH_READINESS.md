# Public Launch Readiness

Earth Right Now is publicly reachable on its custom domain at https://earthrightnow.app/ while release certification remains evidence-gated. Repository automation can verify static/deployment invariants, but real browser/device/provider behavior must still be observed before ERN calls a release fully validated.

## Engineering gates

- Main CI, Pages deployment, and post-deploy custom-domain HTTP verification must be green for the exact release commit.
- Custom-domain canonical, sitemap, robots and CNAME must agree on earthrightnow.app.
- LIVE VIDEO, LIVE IMAGE, EXTERNAL LIVE, PARTNER and PREVIEW meanings remain distinct.
- Watch Earth requires near-now evidence and usable playback; runtime failures are skipped/quarantined.
- Reference imagery must never be promoted as evidence of now.

## Visitor trust gates

- Privacy and source principles are public and linked from the site.
- ERN requires no account for core use; local favorites/history remain browser-local unless clearly changed later.
- Camera submissions remain review-only until a real submission service is deliberately connected.
- Travel/affiliate inventory remains hidden unless current and verified.

## Commercial gates

- Utility first: payment never changes Earth-view ranking.
- Affiliate and sponsored relationships must be disclosed at the point of action.
- Do not invent inventory, availability, prices, discounts or partner relationships.
- Activate monetization incrementally only after real visitor use can be measured responsibly.

## Evidence boundaries

Automated checks cover catalog/schema invariants, custom-domain/SEO/PWA wiring, static accessibility semantics, mobile layout contracts, source-truth logic and immutable release packaging. They do not prove that a third-party stream visibly plays in a real browser or that a mobile device feels usable.

Use `npm run release:operator-brief` to see only the remaining real-world evidence items for the current ledger.

## Evidence still requiring a human/account action

These cannot be truthfully fabricated by repository automation: custom-domain ownership/account controls, Google Search Console property access/submission, and any later affiliate/payment/provider enrollment. Record them only after the responsible account owner completes them.
