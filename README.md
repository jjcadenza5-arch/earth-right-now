# Earth Right Now

**See before you go.**

Earth Right Now (ERN) is a travel-oriented living view of the world. It curates public, legally usable live cameras, refreshed images and provider pages so visitors can check what a place is like now before deciding to go.

## Product rules

ERN is a curator and bridge, not a third-party stream host. Source meaning is preserved explicitly as **LIVE VIDEO**, **LIVE IMAGE**, **EXTERNAL LIVE**, **PARTNER**, or **PREVIEW**. Prerecorded material is never promoted as live.

The experience is destination-first: Hero viewing, Choose a Window, Live Right Now, Explore, Earth Moments, My Earth and the Living Atlas all use the shared source registry and one-player architecture.

## Development

Requires Node.js 20 or newer.

```sh
npm test
```

The smoke suite protects source truth, currentness, playback behavior, navigation, safe rendering and release gates. GitHub Actions also retains short-lived smoke diagnostics.

## Publication

A green CI run is necessary engineering evidence, but it is not permission to publish. ERN publication remains blocked until the catalog is current enough and dated real-world evidence exists for browser, mobile, provider playback, accessibility, performance and rollback checks.

See `docs/RELEASE_EVIDENCE.md` and `docs/BUILD_STATE.md` before release.
