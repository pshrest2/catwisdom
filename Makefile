# Database credentials
DB_NAME ?= catwisdom
DB_USR ?= $(shell whoami)
DB_HOST ?= localhost

# File to migrate
SQL_FILE ?= scripts/database.sql

.PHONY: run createdb dropdb migrate 

run: createdb migrate

createdb:
	@ echo "Creating database $(DB_NAME) for $(DB_USR)..."
	createdb -U $(DB_USR) -h $(DB_HOST) $(DB_NAME) 2> /dev/null || true
	@ echo "✅ Database $(DB_NAME) created!"

dropdb:
	@ echo "Dropping database $(DB_NAME)..."
	dropdb -U $(DB_USR) -h $(DB_HOST) $(DB_NAME)
	@ echo "✅ Database $(DB_NAME) dropped!"

migrate:
	@if [ ! -f "$(SQL_FILE)" ]; then \
	 echo "Error: File '$(SQL_FILE)' not found!"; \
	 exit 1; \
	fi
	@ echo "Applying $(SQL_FILE) to database $(DB_NAME) with user $(DB_USR)..."
	psql -U $(DB_USR) -h $(DB_HOST) -d $(DB_NAME) -f $(SQL_FILE)
	@ echo "✅ Done!"

