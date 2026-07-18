-- Initialize database and optional schema
CREATE TABLE IF NOT EXISTS schema_version (
    version VARCHAR(50) PRIMARY KEY,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example: ensure extension or any required setup can go here
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Note: Spring JPA will create tables automatically based on entities
