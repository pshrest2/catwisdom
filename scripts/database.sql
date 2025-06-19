-- script to generate database tables --
----------------------------------------

-- users
CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(100) NOT NULL);
CREATE UNIQUE INDEX IF NOT EXISTS users_email_key ON users (email);

-- cats
CREATE TABLE IF NOT EXISTS cats(id SERIAL PRIMARY KEY, cat_api_id VARCHAR(50) NOT NULL UNIQUE, image_url TEXT NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT NOW());

-- wisdom
CREATE TABLE IF NOT EXISTS wisdom(
  id SERIAL PRIMARY KEY, 
  cat_id INTEGER REFERENCES cats(id),
  content TEXT NOT NULL, 
  likes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
