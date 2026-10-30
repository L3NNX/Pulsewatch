# Anti-Flapping Consensus State Invariants
- State: PENDING -> UP (on first 200 OK)
- State: UP -> DOWN (only after consecutiveFailures >= 3)
- State: DOWN -> UP (only after consecutiveSuccesses >= 2)
- Flapping guard suppresses redundant notifications within 15-minute suppression window.

- Auto-Recovery Resolution: Incident marked as RESOLVED and postmortem summary triggered when monitor achieves 2 consecutive successful checks.

