# Business activation runbook

ERN's commercial foundation is built, but external services remain deliberately disabled until real account details exist.

## Camera submissions

The submission form validates public URLs, rights confirmation and contact data locally. The transport adapter is disabled by default.

To activate later:
1. Choose an HTTPS submission endpoint owned or controlled by ERN.
2. Confirm its privacy/retention policy.
3. Configure the endpoint and explicitly enable transport.
4. Test consent-required delivery with a non-production submission.
5. Keep every received camera in `PENDING_REVIEW` until truth, permission and health review pass.

Payment or partner status never makes a camera publishable by itself.

## Affiliate inventory

The affiliate registry accepts only HTTPS partners with explicit enablement plus dated verification and expiry. No partner is active merely because its brand is named in ERN.

To activate later:
1. Obtain the real affiliate account/partner identifier from the provider.
2. Record the approved destination URL pattern and disclosure requirements.
3. Add a dated partner record with an expiry/recheck date.
4. Verify the outbound link in a browser.
5. Keep the visitor disclosure visible: Affiliate or Sponsored · Affiliate as applicable.

## Launch sequencing

A useful ERN beta does not depend on monetization. Prefer this order:

1. Publish a trustworthy camera/travel beta after all six release evidence checks pass.
2. Observe visitor behavior without cluttering the Earth experience.
3. Activate one travel partner category at a time.
4. Activate business-camera submission delivery only after a real review inbox/service exists.
5. Expand commercial inventory only when it remains secondary to “See before you go.”

Until those external account details exist, the correct production state is adapter-ready but commercially inactive.
