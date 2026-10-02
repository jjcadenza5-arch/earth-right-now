# ERN Search Engine Owner Readiness

Status: prepared for owner verification after the technical SEO release passes.

## Public URLs
- Site: https://earthrightnow.app/
- Sitemap: https://earthrightnow.app/sitemap.xml
- Robots: https://earthrightnow.app/robots.txt
- Crawlable place directory: https://earthrightnow.app/places/
- Crawlable discovery directory: https://earthrightnow.app/discover/

## Google Search Console
The ERN homepage already contains a Google site-verification meta token. That can support a URL-prefix property if the matching Search Console verification flow is used.

Recommended owner action:
1. Open Google Search Console while signed into the owner Google account.
2. Add or select `https://earthrightnow.app/`.
3. If Google recognizes the existing HTML meta verification, complete verification.
4. If you prefer a Domain property, Google will require a DNS verification record; copy the exact TXT value Google supplies into the DNS provider. Do not invent a token.
5. Submit `https://earthrightnow.app/sitemap.xml`.
6. Use URL Inspection on the homepage, `/places/`, `/discover/`, and a few representative indexable destination pages after deployment.

ERN code must not create the Search Console account, alter DNS, or claim verification without owner confirmation.

## Bing Webmaster Tools
Recommended owner action after Google Search Console is verified:
1. Open Bing Webmaster Tools while signed into the owner Microsoft account.
2. Prefer importing the verified site from Google Search Console when Bing offers that route, or use one of Bing's owner verification methods and add only the exact token/record Bing supplies.
3. Submit `https://earthrightnow.app/sitemap.xml` if it is not imported automatically.
4. Inspect representative destination URLs for crawl/index status.

ERN code must not create the Bing account, change DNS, or add a placeholder verification token.

## Operating rule
Search-engine verification never changes ERN source truth, ranking, partner treatment, analytics privacy, or gated-feature state.
