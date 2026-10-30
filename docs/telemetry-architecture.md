# Telemetry Architecture Specification
- Multi-region distributed probes executing at customizable intervals (30s to 300s).
- TCP handshake, TLS negotiation, and first-byte latency histograms.
- Sub-second Consensus verification: 3-strike threshold before transition to DOWN.

- Percentile Metrics: Rolling 24-hour window t-digest percentile calculations for p50, p95, and p99 latency.


- Stream Decompression: Content-Encoding gzip, deflate, and br automatically decoded without memory buffering.


- Concurrency Bounds: Maximum 50 concurrent outgoing probes per worker node to protect network socket limits.


- SSL/TLS Expiration Warnings: Alert triggers at 30 days, 14 days, 7 days, and 48 hours prior to certificate expiry.

