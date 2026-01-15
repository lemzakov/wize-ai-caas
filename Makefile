# WIZE Platform - Makefile
# Convenience commands for development and deployment

.PHONY: help install build dev start stop clean docker-build docker-up docker-down docker-logs test lint

# Default target
.DEFAULT_GOAL := help

help: ## Show this help message
	@echo "WIZE Platform - Available Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""

# Development Commands
install: ## Install dependencies
	pnpm install

build: ## Build all packages
	pnpm build

build-deploy: ## Build for deployment
	pnpm build:deploy

dev: ## Start development server with hot reload
	pnpm dev

dev-be: ## Start backend only in development mode
	pnpm dev:be

dev-fe: ## Start frontend only in development mode
	pnpm dev:fe

start: ## Start n8n from built code
	pnpm start

# Testing Commands
test: ## Run all tests
	pnpm test

test-unit: ## Run unit tests only
	pnpm test:unit

test-integration: ## Run integration tests only
	pnpm test:integration

lint: ## Lint code
	pnpm lint

lint-fix: ## Lint and fix code
	pnpm lint:fix

typecheck: ## Run TypeScript type checking
	pnpm typecheck

format: ## Format code
	pnpm format

# Docker Commands
docker-build: ## Build Docker image from source
	docker build -t wize-platform:local .

docker-up: ## Start services with Docker Compose (production setup)
	docker-compose up -d

docker-up-dev: ## Start services with Docker Compose (development setup)
	docker-compose -f docker-compose.dev.yml up -d

docker-down: ## Stop Docker Compose services
	docker-compose down

docker-down-clean: ## Stop Docker Compose services and remove volumes
	docker-compose down -v

docker-logs: ## Show Docker Compose logs
	docker-compose logs -f

docker-logs-n8n: ## Show n8n container logs only
	docker-compose logs -f n8n

docker-restart: ## Restart Docker Compose services
	docker-compose restart

docker-shell: ## Open shell in n8n container
	docker-compose exec n8n sh

docker-rebuild: ## Rebuild and restart Docker services
	docker-compose up -d --build

# Database Commands
db-backup: ## Backup PostgreSQL database
	docker-compose exec postgres pg_dump -U n8n n8n > backup-$$(date +%Y%m%d-%H%M%S).sql
	@echo "Database backed up to backup-$$(date +%Y%m%d-%H%M%S).sql"

db-restore: ## Restore PostgreSQL database (DB_BACKUP_FILE=backup.sql make db-restore)
	@if [ -z "$(DB_BACKUP_FILE)" ]; then \
		echo "Error: DB_BACKUP_FILE not specified. Usage: DB_BACKUP_FILE=backup.sql make db-restore"; \
		exit 1; \
	fi
	cat $(DB_BACKUP_FILE) | docker-compose exec -T postgres psql -U n8n n8n

# Cleanup Commands
clean: ## Clean build artifacts
	pnpm clean
	rm -rf compiled
	rm -rf dist
	rm -rf .turbo
	find packages -name "dist" -type d -exec rm -rf {} +
	find packages -name ".turbo" -type d -exec rm -rf {} +

clean-all: clean ## Clean build artifacts and dependencies
	rm -rf node_modules
	find packages -name "node_modules" -type d -exec rm -rf {} +

reset: ## Reset the entire project (clean + reinstall)
	pnpm reset

# Environment Commands
env-setup: ## Create .env file from example
	@if [ -f .env ]; then \
		echo ".env file already exists. Skipping..."; \
	else \
		cp .env.example .env; \
		echo ".env file created. Please edit it and add your configuration."; \
	fi

env-generate-key: ## Generate encryption key for .env
	@echo "Generated encryption key:"
	@openssl rand -hex 32

# Deployment Commands
deploy-vercel: ## Deploy to Vercel
	vercel --prod

deploy-vercel-preview: ## Deploy preview to Vercel
	vercel

# Utility Commands
update-deps: ## Update dependencies
	pnpm update

check-deps: ## Check for outdated dependencies
	pnpm outdated

health-check: ## Check if n8n is running
	@curl -f http://localhost:5678/healthz && echo "\nn8n is healthy!" || echo "\nn8n is not responding!"

# Quick Start Commands
quickstart: env-setup docker-up-dev ## Quick start with Docker (development mode)
	@echo ""
	@echo "WIZE Platform is starting..."
	@echo "Access it at: http://localhost:5678"
	@echo ""
	@echo "To view logs: make docker-logs"
	@echo "To stop: make docker-down"

quickstart-prod: env-setup docker-up ## Quick start with Docker (production mode)
	@echo ""
	@echo "WIZE Platform is starting in production mode..."
	@echo "Access it at: http://localhost:5678"
	@echo ""
	@echo "To view logs: make docker-logs"
	@echo "To stop: make docker-down"
