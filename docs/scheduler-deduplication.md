# BullMQ Job Key Generation
- Format: probe:{monitorId}:{Math.floor(Date.now() / (intervalSeconds * 1000))}
- Prevents double-scheduling during worker restarts and network partitions.
