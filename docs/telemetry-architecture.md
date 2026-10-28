# Telemetry Architecture Specification
- Multi-region distributed probes executing at customizable intervals (30s to 300s).
- TCP handshake, TLS negotiation, and first-byte latency histograms.
- Sub-second Consensus verification: 3-strike threshold before transition to DOWN.

- Percentile Metrics: Rolling 24-hour window t-digest percentile calculations for p50, p95, and p99 latency.

