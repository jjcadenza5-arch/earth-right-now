# Media lifecycle hardening

The shared player destroys the previous media before every handoff.

For video/audio it now clears both the element src and nested <source> URLs, then reloads the empty element. Iframes are navigated to about:blank before removal. Images have src removed before the mount is cleared.

This reduces hidden network/audio activity and reinforces the one-player architecture: changing a window should not leave an older stream running behind the new experience.
