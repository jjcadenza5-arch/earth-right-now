# Camera submission trust boundary

A business/organization submission is **untrusted intake**, never an automatic source promotion.

The browser form only prepares a `PENDING_REVIEW` record. ERN does not automatically publish, embed, fetch, or mark a submitted camera live.

Validation:
- business and place names are normalized and length-bounded;
- camera/source URL must be public HTTP(S), without embedded credentials or localhost/loopback targets;
- optional contact must look like an email address;
- submitter must explicitly confirm authority/permission.

The rights checkbox is a submitter assertion, not ERN verification. Review must independently determine truth type, health, permission, playback mode, attribution, source provenance, and currentness before a record can enter the promoted catalog.

Future server-side intake must repeat URL validation and must protect any fetcher from SSRF/private-network destinations. Client validation is usability/safety defense, not a server security boundary.

## Retention

If server-side submission transport is activated later, unapproved camera/place submission records have a maximum review retention of 30 days and must then be deleted. Approved submissions may contribute verified source/place metadata to the normal ERN catalog; approval does not preserve unnecessary contact or intake data. Transport remains disabled until a real HTTPS review endpoint exists.
