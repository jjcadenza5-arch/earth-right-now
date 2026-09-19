# Provider failure and fallback

ERN separates **catalog truth** from a **runtime playback failure**.

A camera can be HEALTHY and permitted while one visitor's embedded session fails because of provider policy, browser restrictions, geographic behavior, temporary network trouble or an iframe/player error. ERN must not silently rewrite catalog truth from one client failure.

Runtime behavior:
1. classify the failed playback conservatively;
2. tear down the failed media;
3. move to the next allowed fallback;
4. for EMBED, normally offer/open the official provider source next;
5. end at UNAVAILABLE rather than pretending playback succeeded.

A runtime provider block is not automatically a definitive OFFLINE health result. Definitive source-health mutation remains a separate validated operations process.

External fallback copy is currentness-aware: stale/recheck-due sources are never described as current merely because the provider page can be opened.
