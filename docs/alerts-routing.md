# Omni-Channel Alert Routing Specification
- Dispatch targets: Email, Discord Webhook, Slack Incoming Webhook, Generic JSON endpoint.
- Retry strategy: 5 attempts with exponential jittered backoff (1s, 2s, 4s, 8s, 16s).
