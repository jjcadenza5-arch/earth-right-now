# ERN Search Engine Owner Readiness

Status: Google owner setup complete; Bing remains optional next external search-engine setup.

## Public URLs
- Site: https://earthrightnow.app/
- Sitemap: https://earthrightnow.app/sitemap.xml
- Robots: https://earthrightnow.app/robots.txt
- Crawlable place directory: https://earthrightnow.app/places/
- Crawlable discovery directory: https://earthrightnow.app/discover/

## Google Search Console

Owner-confirmed complete:
- Search Console ownership/property verification for `https://earthrightnow.app/`
- sitemap submission
- initial URL Inspection pass

Do not ask the owner to repeat these setup steps. Future Google work should be driven by actual crawl/index reports, coverage changes, or query/search-performance evidence.

## Bing Webmaster Tools
Recommended owner action after Google Search Console is verified:
1. Open Bing Webmaster Tools while signed into the owner Microsoft account.
2. Prefer importing the verified site from Google Search Console when Bing offers that route, or use one of Bing's owner verification methods and add only the exact token/record Bing supplies.
3. Submit `https://earthrightnow.app/sitemap.xml` if it is not imported automatically.
4. Inspect representative destination URLs for crawl/index status.

ERN code must not create the Bing account, change DNS, or add a placeholder verification token.

## Operating rule
Search-engine verification never changes ERN source truth, ranking, partner treatment, analytics privacy, or gated-feature state.


## IndexNow

ERN now publishes a public IndexNow verification key and notifies IndexNow after successful production deploys with a bounded set of recently updated crawlable URLs. This improves freshness discovery for participating search engines without changing ranking or guaranteeing indexing.

Google remains driven by the verified Search Console property, sitemap and normal crawl/index processing. Bing Webmaster Tools remains useful for inspecting IndexNow reception and Bing indexing, but ERN no longer depends on manual URL-by-URL submission for routine freshness.
