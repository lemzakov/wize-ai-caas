# WIZE Platform - Deployment Checklist

Use this checklist to ensure a successful deployment of the WIZE Platform.

## Pre-Deployment Checklist

### 1. Environment Setup
- [ ] Clone repository: `git clone https://github.com/lemzakov/wize-ai-caas.git`
- [ ] Navigate to directory: `cd wize-ai-caas`
- [ ] Copy environment template: `cp .env.example .env`
- [ ] Generate encryption key: `make env-generate-key` or `openssl rand -hex 32`
- [ ] Edit `.env` and set `N8N_ENCRYPTION_KEY` with generated key
- [ ] Review and configure other environment variables as needed

### 2. Choose Deployment Method
- [ ] **Docker (Recommended)**: Skip to Docker Deployment section
- [ ] **Vercel**: Skip to Vercel Deployment section
- [ ] **From Source**: Skip to Source Deployment section

---

## Docker Deployment Checklist

### Development Setup
- [ ] Ensure Docker and Docker Compose v2 are installed
- [ ] Run: `docker compose version` (should be v2.x)
- [ ] Start development setup: `make docker-up-dev` or `docker compose -f docker-compose.dev.yml up -d`
- [ ] Wait for container to be healthy (~30 seconds)
- [ ] Access platform: http://localhost:5678
- [ ] Create admin account on first login
- [ ] Verify platform is working

### Production Setup
- [ ] Ensure Docker and Docker Compose v2 are installed
- [ ] Review `docker-compose.yml` configuration
- [ ] Configure environment variables in `.env`:
  - [ ] `N8N_ENCRYPTION_KEY` (required)
  - [ ] `N8N_HOST` (your domain)
  - [ ] `N8N_PROTOCOL` (http or https)
  - [ ] `WEBHOOK_URL` (full webhook URL)
  - [ ] Database credentials (if using external DB)
- [ ] Start production setup: `make docker-up` or `docker compose up -d`
- [ ] Check logs: `make docker-logs` or `docker compose logs -f`
- [ ] Wait for all services to be healthy
- [ ] Access platform: http://localhost:5678 or your configured domain
- [ ] Create admin account
- [ ] Test workflow execution
- [ ] Setup backups (see Backup section below)

### Post-Deployment
- [ ] Configure reverse proxy (if using) - nginx, Traefik, or Caddy
- [ ] Setup SSL/TLS certificates (Let's Encrypt recommended)
- [ ] Configure firewall rules
- [ ] Enable monitoring (Prometheus/Grafana)
- [ ] Schedule database backups
- [ ] Document custom configuration

---

## Vercel Deployment Checklist

> ⚠️ **Warning:** Vercel has limitations for stateful applications like n8n. Use only for testing or specific use cases.

### Prerequisites
- [ ] Create external PostgreSQL database (Supabase, Neon, Railway, AWS RDS, etc.)
- [ ] Note database credentials
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login to Vercel: `vercel login`

### Environment Variables
Set these in Vercel project settings or via CLI:

- [ ] `N8N_ENCRYPTION_KEY` (secret)
- [ ] `N8N_HOST` (your Vercel domain)
- [ ] `N8N_PROTOCOL` (https)
- [ ] `WEBHOOK_URL` (https://your-domain.vercel.app/)
- [ ] `DB_TYPE` (postgresdb)
- [ ] `DB_POSTGRESDB_HOST` (secret)
- [ ] `DB_POSTGRESDB_PORT` (5432)
- [ ] `DB_POSTGRESDB_DATABASE` (n8n)
- [ ] `DB_POSTGRESDB_USER` (secret)
- [ ] `DB_POSTGRESDB_PASSWORD` (secret)

### Deployment
- [ ] Run: `vercel --prod` or `make deploy-vercel`
- [ ] Wait for deployment to complete
- [ ] Access platform at your Vercel URL
- [ ] Create admin account
- [ ] Test basic workflow (note: complex workflows may timeout)
- [ ] Review Vercel logs for any issues

### Limitations to Note
- [ ] Understood: No background workers
- [ ] Understood: 60-second execution limit
- [ ] Understood: No queue-based execution
- [ ] Understood: Cold starts may affect performance
- [ ] Understood: Not suitable for complex/long-running workflows

---

## Source Deployment Checklist

### Prerequisites
- [ ] Node.js 22.16+ installed: `node --version`
- [ ] pnpm 10.22.0+ installed: `pnpm --version`
- [ ] Database installed (PostgreSQL recommended, SQLite for testing)

### Build and Deploy
- [ ] Install dependencies: `pnpm install` or `make install`
- [ ] Build application: `pnpm build` or `make build`
- [ ] Configure environment variables in `.env`
- [ ] Start application: `pnpm start` or `make start`
- [ ] Access platform: http://localhost:5678
- [ ] Create admin account
- [ ] Verify workflows execute correctly

### Production Considerations
- [ ] Setup process manager (PM2, systemd)
- [ ] Configure reverse proxy (nginx recommended)
- [ ] Setup SSL certificates
- [ ] Enable firewall
- [ ] Configure logging
- [ ] Setup monitoring
- [ ] Schedule backups

---

## Security Checklist

- [ ] Strong encryption key generated (32+ characters)
- [ ] HTTPS enabled for production
- [ ] Database uses strong password
- [ ] Database connections restricted to application servers
- [ ] Firewall configured (only necessary ports open)
- [ ] Regular security updates scheduled
- [ ] Backup encryption enabled
- [ ] Credentials stored securely (not in code)
- [ ] Authentication enabled (if needed)
- [ ] CORS configured properly

---

## Backup Checklist

### Database Backups
- [ ] Automated backup script created
- [ ] Backup schedule configured (daily recommended)
- [ ] Backup retention policy defined
- [ ] Test restoration procedure
- [ ] Offsite backup storage configured
- [ ] Backup encryption enabled

### Quick Backup Commands
```bash
# Backup database
make db-backup

# Backup n8n data directory
docker compose exec n8n tar czf /tmp/n8n-backup.tar.gz /home/node/.n8n
docker cp wize-n8n:/tmp/n8n-backup.tar.gz ./n8n-data-backup.tar.gz

# Test restoration
DB_BACKUP_FILE=backup-20240115.sql make db-restore
```

---

## Monitoring Checklist

- [ ] Enable n8n metrics: `N8N_METRICS=true`
- [ ] Setup Prometheus scraping
- [ ] Configure Grafana dashboards
- [ ] Setup alerting (PagerDuty, Slack, etc.)
- [ ] Monitor disk space
- [ ] Monitor memory usage
- [ ] Monitor CPU usage
- [ ] Monitor database performance
- [ ] Setup log aggregation
- [ ] Configure uptime monitoring

---

## Testing Checklist

### Basic Functionality
- [ ] Platform loads successfully
- [ ] Admin account creation works
- [ ] Login/logout works
- [ ] Create new workflow
- [ ] Add and configure nodes
- [ ] Execute simple workflow
- [ ] Test webhook trigger
- [ ] Test scheduled workflow
- [ ] Verify database persistence

### Integration Testing
- [ ] Test email integration
- [ ] Test HTTP request node
- [ ] Test database nodes
- [ ] Test API integrations
- [ ] Test file operations
- [ ] Test error handling

### Performance Testing
- [ ] Execute workflow with multiple nodes
- [ ] Test concurrent executions
- [ ] Test long-running workflows
- [ ] Monitor resource usage
- [ ] Test under load (if applicable)

---

## Troubleshooting Checklist

If issues occur, check:

- [ ] Container/process is running: `docker compose ps` or `ps aux | grep n8n`
- [ ] Check logs: `docker compose logs n8n` or application logs
- [ ] Verify environment variables: `docker compose config`
- [ ] Check database connection
- [ ] Verify network connectivity
- [ ] Check disk space: `df -h`
- [ ] Check memory: `free -m`
- [ ] Review firewall rules
- [ ] Test database credentials
- [ ] Verify encryption key is set
- [ ] Check for port conflicts

---

## Post-Deployment Tasks

- [ ] Document deployment configuration
- [ ] Create runbook for common tasks
- [ ] Train team members
- [ ] Setup notification channels
- [ ] Import default workflows
- [ ] Configure integrations
- [ ] Test disaster recovery procedure
- [ ] Schedule maintenance windows
- [ ] Update documentation

---

## Maintenance Checklist

### Weekly
- [ ] Review logs for errors
- [ ] Check disk space
- [ ] Verify backups are running
- [ ] Monitor performance metrics

### Monthly
- [ ] Update Docker images: `docker compose pull && docker compose up -d`
- [ ] Review and archive old workflows
- [ ] Test backup restoration
- [ ] Security updates
- [ ] Review access logs

### Quarterly
- [ ] Full security audit
- [ ] Performance optimization review
- [ ] Update documentation
- [ ] Disaster recovery drill

---

## Resources

- 📖 [Quick Start Guide](QUICKSTART.md)
- 🚀 [Deployment Guide](DEPLOYMENT.md)
- 📋 [Default Workflows Manual](DEFAULT_WORKFLOWS_MANUAL_RU.md)
- 🔧 [Makefile Commands](Makefile) - Run `make help`
- 📚 [Official n8n Documentation](https://docs.n8n.io)

---

## Getting Help

- Review error logs carefully
- Check [DEPLOYMENT.md](DEPLOYMENT.md) troubleshooting section
- Search [n8n Community Forum](https://community.n8n.io)
- Review [GitHub Issues](https://github.com/n8n-io/n8n/issues)
- Check [official documentation](https://docs.n8n.io)

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Environment:** [ ] Development [ ] Staging [ ] Production
**Notes:** 
_____________________________________________
_____________________________________________
