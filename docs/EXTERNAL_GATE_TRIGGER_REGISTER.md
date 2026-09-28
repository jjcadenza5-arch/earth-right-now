# Stage R — External Gate Trigger Register

ERN has several healthy lanes that are locally complete but blocked on real external events. Stage R makes those blocks explicit so autonomous work does not circle back into them prematurely.

## Rule

A trigger makes a lane **eligible for review**. It does not prove the external event succeeded and it never authorizes public activation by itself.

Examples:
- reaching the Viator recommended retest time permits one safe diagnostic; it does not mean the API key is active;
- receiving a Booking.com approval, rejection or other material account-state change permits one bounded commercial-state review; silence does not;
- deploying a Worker permits live health verification; repository preparation is not deployment evidence;
- creating an official social account permits connection work; a planned account is not a connected account;
- configuring analytics permits measurement review; prepared telemetry code is not active measurement.

The trigger register is read-only. It cannot rotate credentials, apply to programs, create social accounts, deploy Workers, enable public participation, or claim partnerships.


## 2026-09-28 material trigger
Booking.com APAC/CJ returned a documented **not approved** decision. The pending-review gate is therefore closed as REJECTED/INACTIVE. This permits review of the next lodging-channel candidate but does not authorize an application, tracked links or partner claims by itself.


## Travelpayouts Project matching trigger — 2026-09-28
ERN's Travelpayouts Project is verified and currently in program matching/review. Operations must not poll or mass-activate programs merely because some are already visible.

Reopen the lane only when the Travelpayouts dashboard materially changes one of these facts:
- Project matching/review completes;
- a relevant program changes Available / Under Review / Unavailable state;
- a program exposes terms or link/widget access that materially changes ERN's eligibility.

Until then:
- do not re-enable Drive automation;
- do not mass-activate programs;
- do not infer approval for brands merely because they exist in the platform catalog.
