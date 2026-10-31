# Core Probe Data Contracts
- ProbeJobPayload: { monitorId: string, url: string, timeoutMs: number, method: 'GET' | 'HEAD' }
- ProbeResult: { status: 'UP' | 'DOWN', latencyMs: number, statusCode: number, errorMessage?: string }
