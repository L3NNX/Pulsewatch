# Database Query Indexing Notes
- Composite partial index: CREATE INDEX idx_monitors_active_check ON monitors(is_active, last_checked_at) WHERE is_active = true;
- Row-level lock FOR UPDATE SKIP LOCKED during worker dequeue batch processing.
