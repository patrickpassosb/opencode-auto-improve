# opencode-auto-improve

Auto-capture skills and durable memory from your opencode sessions, present them for your approval, and prune what is no longer useful. **opencode learns like Hermes.**

Zero-config standalone plugin. MIT. No opencode core changes.

## Install

Add it to your `opencode.json`:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-auto-improve"]
}
```

That's it. Opencode auto-installs it from npm (via Bun) at startup.

## What it does

1. **Capture** — at every session end, the plugin classifies what happened:
   - wrote files / committed / installed → **skill candidate**
   - durable fact about your environment or preferences → **memory candidate**
   - neither → nothing
   Candidates are staged in `~/.agents/learning-staging/`. The plugin never writes to your live skill library.

2. **Approve** — run `/learn-review`. The agent presents candidates in chat ("3 new skills, 2 memory facts — approve?"). You answer yes/no per item. You never browse folders: the agent curates, you approve. On approval:
   - skill → `~/.agents/skills/<name>/SKILL.md` (description ≤ 200 chars to keep the discovery index lean)
   - memory → `~/.agents/memory/facts.md` (injected at session start on the next launch)

3. **Prune** — the weekly checkup is `/audit-skills` (the companion skill): classify keep/remove/merge, propose removals, you approve. "Less is more" — a skill that is not useful must be removed.

## Layout

```
opencode-auto-improve/
  index.js                        plugin entry (exports FmPrimaryLearning)
  plugins/fm-primary-learning.js  capture + memory injection (session.idle, session.created)
  learning/fm-learning-core.js    classify, stage, promote (shared logic)
  command/learn-review.md         /learn-review command (present + approve)
```

Runtime state (independent of any other tool's data dirs):

```
~/.agents/
  learning-staging/skills/<name>.json   staged skill candidates
  learning-staging/memory/<id>.json     staged memory candidates
  skills/<name>/SKILL.md                live skills (promoted only)
  memory/facts.md                       live memory (promoted only)
```

## Why

Your agent improves with every session: procedures become skills, facts become memory, and the library stays lean because the audit removes what the models no longer need.

## License

MIT
