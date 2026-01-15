# WIZE Platform - Deployment Guide

This guide provides instructions for deploying the WIZE Platform (based on n8n) using different methods.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Docker Local Deployment](#docker-local-deployment)
- [Vercel Deployment](#vercel-deployment)
- [Building from Source](#building-from-source)
- [Environment Variables](#environment-variables)
- [Production Considerations](#production-considerations)

---

## Prerequisites

### For All Deployments
- **Node.js** 22.16 or higher
- **pnpm** 10.22.0 or higher

### For Docker Deployment
- **Docker** 20.10 or higher
- **Docker Compose** 2.0 or higher

### For Vercel Deployment
- **Vercel CLI** (optional, for local testing)
- **Vercel Account** with project created
- **External PostgreSQL Database** (Vercel doesn't support stateful databases)

---

## Docker Local Deployment

The easiest way to run the WIZE Platform locally is using Docker Compose.

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lemzakov/wize-ai-caas.git
   cd wize-ai-caas
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` and set your encryption key:**
   ```bash
   # Generate a secure encryption key
   openssl rand -hex 32
   
   # Add it to .env
   N8N_ENCRYPTION_KEY=your-generated-key-here
   ```

4. **Start the services:**
   ```bash
   docker-compose up -d
   ```

5. **Access the application:**
   - Open your browser to: http://localhost:5678
   - Create your first admin account

### What's Included

The Docker Compose setup includes:

- **PostgreSQL 16** - Primary database
- **Redis 7** - Queue management for distributed execution
- **n8n Main Instance** - Web UI and API server
- **n8n Worker** - Background job processor

### Managing the Deployment

**View logs:**
```bash
docker-compose logs -f n8n
```

**Stop services:**
```bash
docker-compose down
```

**Stop and remove data:**
```bash
docker-compose down -v
```

**Restart services:**
```bash
docker-compose restart
```

**Update to latest version:**
```bash
docker-compose pull
docker-compose up -d
```

### Building Custom Image

If you want to build the WIZE Platform with your custom changes:

1. **Build the application:**
   ```bash
   pnpm build:docker
   ```

2. **Update docker-compose.yml:**
   Replace `image: docker.n8n.io/n8nio/n8n:latest` with:
   ```yaml
   build:
     context: .
     dockerfile: Dockerfile
   ```

3. **Build and start:**
   ```bash
   docker-compose up -d --build
   ```

---

## Vercel Deployment

> **⚠️ Important Note:** n8n is a stateful application designed to run as a persistent backend service. Vercel's serverless architecture has significant limitations for this use case. For production deployments, we recommend using Docker, VPS, or managed n8n hosting.

However, if you still want to deploy to Vercel (for testing or specific use cases):

### Prerequisites for Vercel

1. **External Database Required:**
   - You MUST have an external PostgreSQL database (e.g., Supabase, Neon, Railway, AWS RDS)
   - Vercel Functions are stateless and ephemeral
   - SQLite will NOT work on Vercel

2. **Limitations:**
   - No background workers (executions must be synchronous)
   - Limited execution time (60 seconds max)
   - No queue-based execution
   - Cold starts may affect performance
   - File storage limitations

### Deployment Steps

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Set up environment variables in Vercel:**
   ```bash
   # Required variables
   vercel env add N8N_ENCRYPTION_KEY production
   vercel env add DB_TYPE production
   vercel env add DB_POSTGRESDB_HOST production
   vercel env add DB_POSTGRESDB_PORT production
   vercel env add DB_POSTGRESDB_DATABASE production
   vercel env add DB_POSTGRESDB_USER production
   vercel env add DB_POSTGRESDB_PASSWORD production
   vercel env add N8N_HOST production
   vercel env add WEBHOOK_URL production
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Vercel Environment Variables

Add these as Vercel Secrets/Environment Variables:

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `N8N_ENCRYPTION_KEY` | Secret | Encryption key for credentials | `your-32-char-hex-key` |
| `N8N_HOST` | Plain | Your Vercel domain | `wize-platform.vercel.app` |
| `WEBHOOK_URL` | Plain | Full webhook URL | `https://wize-platform.vercel.app/` |
| `DB_TYPE` | Plain | Database type | `postgresdb` |
| `DB_POSTGRESDB_HOST` | Secret | Database host | `db.example.com` |
| `DB_POSTGRESDB_PORT` | Plain | Database port | `5432` |
| `DB_POSTGRESDB_DATABASE` | Plain | Database name | `n8n` |
| `DB_POSTGRESDB_USER` | Secret | Database user | `n8n_user` |
| `DB_POSTGRESDB_PASSWORD` | Secret | Database password | `your-db-password` |

### Vercel Configuration

The repository includes `vercel.json` with:
- Build commands configured
- Output directory set to `compiled`
- Security headers enabled
- Function memory increased to 3GB
- Max duration set to 60 seconds

---

## Building from Source

For development or custom deployments:

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Build the Project

```bash
# Build all packages
pnpm build

# Or build for deployment (creates optimized bundle)
pnpm build:deploy
```

### 3. Run Locally

```bash
# Start n8n
pnpm start

# Or start with custom environment
N8N_PORT=5678 pnpm start
```

### 4. Development Mode

```bash
# Start in development mode with hot reload
pnpm dev

# Start only backend
pnpm dev:be

# Start only frontend
pnpm dev:fe
```

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `N8N_ENCRYPTION_KEY` | Encryption key for credentials (32+ chars) | Generated with `openssl rand -hex 32` |

### Database Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_TYPE` | `sqlite` | Database type: `sqlite`, `postgresdb`, `mysqldb` |
| `DB_POSTGRESDB_HOST` | `localhost` | PostgreSQL host |
| `DB_POSTGRESDB_PORT` | `5432` | PostgreSQL port |
| `DB_POSTGRESDB_DATABASE` | `n8n` | PostgreSQL database name |
| `DB_POSTGRESDB_USER` | `postgres` | PostgreSQL username |
| `DB_POSTGRESDB_PASSWORD` | - | PostgreSQL password |

### Application Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `N8N_HOST` | `localhost` | Host where n8n is accessible |
| `N8N_PORT` | `5678` | Port n8n listens on |
| `N8N_PROTOCOL` | `http` | Protocol: `http` or `https` |
| `WEBHOOK_URL` | Auto | Full webhook URL for external services |
| `N8N_LOG_LEVEL` | `info` | Log level: `silent`, `error`, `warn`, `info`, `verbose`, `debug` |

### Queue Configuration (Multi-Instance)

| Variable | Default | Description |
|----------|---------|-------------|
| `EXECUTIONS_MODE` | `regular` | Execution mode: `regular` or `queue` |
| `QUEUE_BULL_REDIS_HOST` | `localhost` | Redis host for queue |
| `QUEUE_BULL_REDIS_PORT` | `6379` | Redis port |

### Timezone

| Variable | Default | Description |
|----------|---------|-------------|
| `GENERIC_TIMEZONE` | `America/New_York` | Timezone for n8n |
| `TZ` | System | System timezone |

---

## Production Considerations

### Security

1. **Always use strong encryption key:**
   ```bash
   # Generate secure key
   openssl rand -hex 32
   ```

2. **Use HTTPS in production:**
   - Set `N8N_PROTOCOL=https`
   - Configure SSL certificates
   - Use reverse proxy (nginx, Traefik, Caddy)

3. **Enable authentication:**
   ```bash
   N8N_BASIC_AUTH_ACTIVE=true
   N8N_BASIC_AUTH_USER=admin
   N8N_BASIC_AUTH_PASSWORD=secure-password
   ```

4. **Database security:**
   - Use strong database passwords
   - Enable SSL for database connections
   - Restrict database access to application servers only

### Performance

1. **Use PostgreSQL in production:**
   - SQLite is suitable only for testing
   - PostgreSQL provides better performance and reliability

2. **Enable queue mode for multiple instances:**
   ```bash
   EXECUTIONS_MODE=queue
   QUEUE_BULL_REDIS_HOST=redis-host
   ```

3. **Configure resource limits:**
   - Set appropriate memory limits in Docker
   - Configure PostgreSQL connection pools
   - Monitor resource usage

### Backups

1. **Database backups:**
   ```bash
   # PostgreSQL backup
   docker-compose exec postgres pg_dump -U n8n n8n > backup.sql
   ```

2. **Workflow data:**
   ```bash
   # Backup n8n data directory
   docker-compose exec n8n tar czf /tmp/n8n-backup.tar.gz /home/node/.n8n
   docker cp wize-n8n:/tmp/n8n-backup.tar.gz ./
   ```

### Monitoring

1. **Enable metrics:**
   ```bash
   N8N_METRICS=true
   N8N_METRICS_PREFIX=n8n_
   ```

2. **Configure logging:**
   ```bash
   N8N_LOG_LEVEL=info
   N8N_LOG_OUTPUT=file
   N8N_LOG_FILE_LOCATION=/home/node/.n8n/logs/
   ```

3. **Health checks:**
   - n8n provides `/healthz` endpoint
   - Configure monitoring tools (Prometheus, Grafana)

### Scaling

For high-availability deployments:

1. **Run multiple n8n instances:**
   - Use queue mode with Redis
   - Deploy multiple main instances behind load balancer
   - Run dedicated worker instances

2. **Database scaling:**
   - Use managed PostgreSQL service
   - Enable connection pooling
   - Configure read replicas if needed

3. **File storage:**
   - Use shared storage (NFS, S3) for multi-instance setups
   - Configure `N8N_BINARY_DATA_STORAGE_PATH`

---

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Change port in .env or docker-compose.yml
N8N_PORT=5679
```

**Database connection errors:**
- Check database credentials
- Ensure database is running
- Verify network connectivity
- Check firewall rules

**Build failures:**
```bash
# Clean and rebuild
pnpm clean
pnpm install
pnpm build
```

**Permission errors in Docker:**
```bash
# Fix ownership
docker-compose exec n8n chown -R node:node /home/node/.n8n
```

### Getting Help

- **Documentation:** https://docs.n8n.io
- **Community Forum:** https://community.n8n.io
- **GitHub Issues:** https://github.com/n8n-io/n8n/issues

---

## License

WIZE Platform is based on n8n, which is fair-code distributed under the Sustainable Use License and n8n Enterprise License.

See [LICENSE.md](LICENSE.md) and [LICENSE_EE.md](LICENSE_EE.md) for details.
