// index.js — opencode-auto-improve plugin entry (npm package contract).
//
// npm plugins must default-export an object with a `server()` function
// (and optionally `tui()`). opencode resolves the package entrypoint
// (exports["./server"] or main), imports it, and calls server() to get
// the hooks object.
//
// This package wraps the capture + memory-injection logic from
// plugins/fm-primary-learning.js. Zero-config: sensible defaults,
// no opencode.json changes required beyond adding this package to
// the "plugin" array.

import { FmPrimaryLearning } from "./plugins/fm-primary-learning.js"

export default {
  async server(ctx) {
    return FmPrimaryLearning(ctx)
  },
}
