# AI Postmortem Synthesis Specification
- Model: Google Gemini / Groq LLM inference pipeline.
- Input: Telemetry error vectors, failing status codes, DNS latencies, historical uptime context.
- Output: Concise executive summary, engineer technical brief, customer-facing broadsheet update.

- Structured Audit Logging: Correlation IDs attached across scheduler, prober, and alert workers.

