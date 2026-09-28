# Participation browser-client boundary

ERN now has browser-side adapters for the future Earth Signals and camera/place submission APIs, but neither adapter is wired into the public experience yet.

## Earth Signals

The client remains `READ_ONLY` unless both conditions are true:
1. a valid HTTPS endpoint exists; and
2. deployment evidence explicitly allows public activation.

Without both conditions it performs no network request and returns a disabled/read-only result.

## Camera/place submissions

The client performs no delivery unless:
1. a valid HTTPS review endpoint exists;
2. transport is explicitly enabled; and
3. the visitor gives explicit submission consent for that action.

Browser requests use `credentials: omit` and `cache: no-store`. The client never has access to Worker secrets, review tokens or Cloudflare credentials.

These adapters are connection plumbing only. They do not change source truth, approval, catalog state, ranking, publication, or participation activation.
