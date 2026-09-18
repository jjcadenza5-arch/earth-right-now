# Recovered ERN Mapping

The mature lineage is being migrated conservatively.

## First recovered tranche
- Auckland Viaduct Harbour — explicit embed permission was documented in the recovered ERN. It remains health UNKNOWN and has no embedUrl until the current provider embed is revalidated.
- Kīlauea Summit — official USGS live/current-view source; link-only.
- Pattaya Beach City Live View — official municipal CCTV portal; link-only/no restreaming.
- Nossob Kgalagadi — SANParks current wildlife webcam; default link-only until display permission is documented.
- Kaikōura Coast — Environment Canterbury official webcam page; link-only.

## Migration rule
Recovered "Manually verified" dates are historical evidence, not present-tense health. Imported sources therefore default to health UNKNOWN unless rechecked. This prevents stale URLs from being promoted as Live Right Now.

## Known regression evidence
Recovered v16.05 still contains renderHeroLive() calling scrollIntoView(). That behavior is explicitly forbidden in the clean controller.
