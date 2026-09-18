# Playback Capability

Truth and playback capability are different.

A source may be genuinely current/live but still be LINK_ONLY. ERN must then open the official/provider current source rather than constructing an empty iframe.

Capability:
- PLAY — ERN has a supported in-app adapter and required URL.
- EXTERNAL — current/source experience exists but must open at provider.
- UNAVAILABLE — ERN cannot safely offer the source now.

Buttons derive their wording and action from capability.
