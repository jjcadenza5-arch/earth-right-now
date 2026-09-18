# Recovery normalization

Historical recovery follows an asymmetric permission rule.

## Preserve LINK_ONLY

A documented historical LINK_ONLY restriction is conservative: ERN does not display the third-party media and only hands the visitor to the provider. Recovery may preserve this restriction while health is reset to UNKNOWN.

## Revalidate embed permission

Historical EMBED_ALLOWED / partner display permission is not assumed to remain valid. Recovery resets it to UNKNOWN, removes the embed URL from active playback, and requires current permission evidence before restoration.

## Always reset health

Historical "manually verified" or HEALTHY evidence never becomes current health merely because a legacy file contains it. Current verification is a separate operation.
