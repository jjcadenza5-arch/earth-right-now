# ERN Owner Analytics

ERN uses first-party aggregate analytics. The public site design does not expose an analytics dashboard.

## Simplest owner view

Open the repository in GitHub, then:

1. Open **Actions**.
2. Choose **ERN Operations Check**.
3. Open the latest successful run.
4. Scroll to **Artifacts** and download **ern-operations-<run number>**.
5. Open **analytics-owner-dashboard.html** in a browser.

The same artifact also contains:
- `analytics-owner-report.md` — readable text report;
- `analytics-private.json` — aggregate source data for the report;
- `search-gap-triage.json` — zero-result searches replayed against the current catalog.

The Operations job runs daily and on relevant repository changes. The dashboard is generated inside the Operations artifact only; it is not added to the public ERN website.

## Metrics

The dashboard shows a rolling 30-day view:
- daily aggregate unique visitors and daily page views;
- total page views;
- total destination/window opens and top destinations;
- top searches;
- zero-result searches;
- outbound live-source clicks;
- verified affiliate/commercial outbound clicks;
- referral hostnames.

Commercial clicks are not bookings, conversions, transactions, revenue or commission.

## Privacy

The analytics service stores aggregate counters and privacy-preserving visitor hashes for approximate visitor counting. It does not store raw IP addresses, precise coordinates or per-event rows. Search terms resembling email addresses, URLs or phone numbers are discarded before storage.
