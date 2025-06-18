-- script to generate database tables --
----------------------------------------

-- users
CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(100) NOT NULL);
CREATE UNIQUE INDEX IF NOT EXISTS users_email_key ON users (email);

-- wisdom
CREATE TABLE IF NOT EXISTS wisdom(id SERIAL PRIMARY KEY, content TEXT NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT NOW());

-- add likes column (update)
ALTER TABLE wisdom ADD COLUMN IF NOT EXISTS likes INTEGER NOT NULL DEFAULT 0;
