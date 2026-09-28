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
