# Embed security

ERN's inside-player is now allowlist-based rather than accepting arbitrary catalog iframe URLs.

Currently approved embed hosts:
- CouchTourist
- YouTube / YouTube No-Cookie

Requirements:
- HTTPS only;
- catalog source must still have EMBED_ALLOWED or PARTNER_PERMISSION;
- source validator must still pass;
- player capability requires the embed URL to pass this host policy;
- provider-specific iframe sandbox restrictions are applied.

Adding a new embed provider therefore requires an explicit code/policy change rather than merely inserting an iframe URL into catalog data.
