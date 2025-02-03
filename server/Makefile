# Docker
up:
	@echo "Starting database server..."
	docker compose up -d
	@echo "Database server started."

down:
	@echo "Stopping database server..."
	docker compose down -v
	@echo "Database server stopped."

# Database
push:
	@echo "Pushing database to server..."
	bun db:push
	@echo "Database pushed to server."

seed:
	@echo "Seeding database..."
	bun db:seed
	@echo "Database seeded."

db: push seed
	@echo "Database pushed and seeded."

# Help
help:
	@echo "Available commands:"
	@echo "  up - Start database server."
	@echo "  down - Stop database server."
	@echo "  push - Push database to server."
	@echo "  seed - Seed database."
	@echo "  db - Push and seed database."
	@echo "  help - Show this help message."