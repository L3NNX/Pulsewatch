# Omni-Channel Alert Routing Specification
- Dispatch targets: Email, Discord Webhook, Slack Incoming Webhook, Generic JSON endpoint.
- Retry strategy: 5 attempts with exponential jittered backoff (1s, 2s, 4s, 8s, 16s).

- Custom Header Injection: Support for Authorization Bearer and X-Api-Key headers.


- Webhook Security: Cryptographic HMAC SHA-256 signature in X-Pulsewatch-Signature header.

