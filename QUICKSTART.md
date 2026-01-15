# Quick Start Guide - WIZE Platform

Get the WIZE Platform up and running in minutes!

## Prerequisites

Choose one of the following methods:

### Method 1: Docker (Recommended for Quick Start)
- Docker Desktop or Docker Engine + Docker Compose
- That's it! No need for Node.js or pnpm

### Method 2: From Source
- Node.js 22.16+ 
- pnpm 10.22.0+
- PostgreSQL (optional, will use SQLite by default)

---

## Quick Start with Docker (3 Steps)

### 1. Clone and Setup
```bash
git clone https://github.com/lemzakov/wize-ai-caas.git
cd wize-ai-caas
cp .env.example .env
```

### 2. Configure Encryption Key
```bash
# Generate a secure key
openssl rand -hex 32

# Edit .env and add the key
# nano .env  # or use your favorite editor
# Set: N8N_ENCRYPTION_KEY=your-generated-key
```

Or use the Makefile:
```bash
# Generate key
make env-generate-key

# Setup .env file
make env-setup
# Then edit .env and paste the generated key
```

### 3. Start the Platform

**For Development (simple setup):**
```bash
docker-compose -f docker-compose.dev.yml up -d

# Or with Makefile
make docker-up-dev
```

**For Production (with PostgreSQL and Redis):**
```bash
docker-compose up -d

# Or with Makefile
make docker-up
```

### 4. Access the Platform

Open your browser to: **http://localhost:5678**

Create your admin account on first login!

---

## Quick Start from Source

### 1. Clone and Install
```bash
git clone https://github.com/lemzakov/wize-ai-caas.git
cd wize-ai-caas
pnpm install
```

### 2. Build
```bash
pnpm build

# Or with Makefile
make build
```

### 3. Start
```bash
pnpm start

# Or with Makefile
make start
```

### 4. Access
Open: **http://localhost:5678**

---

## Development Mode

Want to make changes with hot reload?

```bash
# Start all services in development mode
pnpm dev

# Or with Makefile
make dev
```

This will start:
- Backend with auto-reload on code changes
- Frontend with HMR (Hot Module Replacement)

Access frontend at: http://localhost:8080 (proxies to backend at 5678)

---

## Common Commands

### Using Make (Recommended)

```bash
# Show all available commands
make help

# Development
make install          # Install dependencies
make build           # Build all packages
make dev             # Start development mode
make test            # Run tests
make lint            # Lint code

# Docker
make docker-up-dev   # Start development setup
make docker-up       # Start production setup
make docker-down     # Stop services
make docker-logs     # View logs
make docker-shell    # Open shell in container

# Quick start
make quickstart      # Setup and start in dev mode
make quickstart-prod # Setup and start in prod mode
```

### Using Docker Compose

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove data
docker-compose down -v

# Restart
docker-compose restart
```

### Using pnpm

```bash
# Development
pnpm install         # Install dependencies
pnpm build          # Build all packages
pnpm dev            # Development mode with hot reload
pnpm start          # Start production build

# Testing
pnpm test           # Run all tests
pnpm lint           # Lint code
pnpm typecheck      # Type checking

# Specific services
pnpm dev:be         # Backend only
pnpm dev:fe         # Frontend only
```

---

## What's Next?

After starting the platform:

1. **Create your first workflow**
   - Click "Add workflow" button
   - Drag and drop nodes from the left panel
   - Connect nodes to create automation

2. **Explore default workflows**
   - Check the `default-workflows/` directory
   - Import example workflows for automotive subscription use cases

3. **Configure integrations**
   - Go to Settings → Credentials
   - Add credentials for services you want to integrate

4. **Read the documentation**
   - [Deployment Guide](DEPLOYMENT.md) - Detailed deployment instructions
   - [Default Workflows Manual](DEFAULT_WORKFLOWS_MANUAL_RU.md) - Russian documentation for workflows
   - [Implementation Summary](IMPLEMENTATION_SUMMARY.md) - Recent changes and features

---

## Troubleshooting

### Port 5678 already in use
```bash
# Change port in docker-compose.yml or .env
# Edit docker-compose.yml and change "5678:5678" to "5679:5678"
# Then access at http://localhost:5679
```

### Can't access the platform
```bash
# Check if services are running
docker-compose ps

# Check logs for errors
docker-compose logs n8n

# Restart services
docker-compose restart
```

### Build failures
```bash
# Clean and rebuild
make clean
pnpm install
pnpm build
```

### Database issues
```bash
# For Docker setup, recreate volumes
docker-compose down -v
docker-compose up -d
```

---

## Getting Help

- **n8n Documentation:** https://docs.n8n.io
- **Community Forum:** https://community.n8n.io
- **GitHub Issues:** https://github.com/n8n-io/n8n/issues

---

## Environment Variables Reference

Essential variables to set in `.env`:

```bash
# Required
N8N_ENCRYPTION_KEY=your-32-char-hex-key

# Optional - Override defaults
N8N_HOST=localhost
N8N_PORT=5678
N8N_PROTOCOL=http
TIMEZONE=Europe/Moscow

# Database (for production)
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=postgres
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=n8n

# Queue (for distributed execution)
EXECUTIONS_MODE=queue
QUEUE_BULL_REDIS_HOST=redis
```

See [.env.example](.env.example) for complete list of variables.

---

## License

WIZE Platform is based on n8n and is distributed under the Sustainable Use License.

See [LICENSE.md](LICENSE.md) for details.
