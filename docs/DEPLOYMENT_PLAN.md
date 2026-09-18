# Deployment Plan

Do not deploy the current recovery master as production yet.

Before deployment:
1. Pass release gates and source audits.
2. Promote a useful tranche of currently HEALTHY sources.
3. Browser-test desktop and mobile.
4. Verify CSP/iframe/provider behavior.
5. Check keyboard/accessibility.
6. Check performance and image/video loading.
7. Establish rollback tag.
8. Deploy static master to a browser-accessible host.
9. Add automated source-health workflow after deployment.

The private GitHub repository remains the permanent source of truth.
