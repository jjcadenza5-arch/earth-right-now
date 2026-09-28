# Phase J deployment verification

After a participation Worker is deployed, ERN must verify the real HTTPS `/health` endpoint before changing any deployment manifest or public activation switch.

Use:

```bash
node scripts/participation-deployment-verify.mjs earth-signals https://<worker-host>
node scripts/participation-deployment-verify.mjs submissions https://<worker-host>
```

The verifier is intentionally non-mutating. It checks real endpoint evidence such as Durable Object availability, secret configuration without secret exposure, raw-network-identifier storage boundaries, bounded retention/review protection for submissions, and that the public contribution switch is still OFF.

A green health verification does **not** authorize visitor-facing activation. Deployment evidence must first be recorded in the appropriate manifest, Operations must pass, and activation remains a separate deliberate decision.
