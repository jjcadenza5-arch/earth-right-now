# CI and testing

ERN now has a dependency-free Node smoke-test runtime.

- `npm test` discovers every `tests/*.smoke.js` file and runs each in an isolated Node process.
- Any failed assertion or module error fails the suite.
- GitHub Actions runs the suite on pushes to `main` and pull requests using Node 20.
- No third-party test framework or production dependency is required.

Smoke tests are architecture/regression checks, not a substitute for release evidence. Browser, mobile, provider playback, accessibility, performance and rollback evidence remain separate release gates and cannot be marked complete by CI alone.
