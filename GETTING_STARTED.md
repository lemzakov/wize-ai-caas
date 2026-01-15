# Getting Started with WIZE Platform

Welcome to the WIZE Platform! This guide will help you get started quickly.

## 🚀 Quick Start Options

Choose the method that best suits your needs:

### Option 1: Docker (Recommended) ⭐

**Best for:** Quick start, production deployment, ease of use

```bash
# 1. Clone repository
git clone https://github.com/lemzakov/wize-ai-caas.git
cd wize-ai-caas

# 2. Quick start command
make quickstart

# That's it! Access at http://localhost:5678
```

### Option 2: Development Mode

**Best for:** Making code changes, contributing

```bash
# Install dependencies
pnpm install

# Start development mode (with hot reload)
pnpm dev

# Access at http://localhost:8080
```

### Option 3: Vercel Deployment

**Best for:** Testing serverless deployment

```bash
# Deploy to Vercel
vercel --prod
```

> ⚠️ **Note:** Vercel has limitations for stateful apps. See [DEPLOYMENT.md](DEPLOYMENT.md) for details.

---

## 📚 Documentation Structure

```
Documentation Guide
│
├── Start Here
│   ├── 📖 GETTING_STARTED.md (this file) - Choose your path
│   └── 📖 QUICKSTART.md - Quick setup instructions
│
├── Deployment
│   ├── 🚀 DEPLOYMENT.md - Complete deployment guide
│   ├── ✅ DEPLOYMENT_CHECKLIST.md - Validation steps
│   └── 📋 DEPLOYMENT_SUMMARY.md - What was implemented
│
├── Configuration
│   ├── 🔐 .env.example - Environment variables
│   ├── 🐳 docker-compose.yml - Production setup
│   └── 🐳 docker-compose.dev.yml - Dev setup
│
└── Workflows
    └── 📋 DEFAULT_WORKFLOWS_MANUAL_RU.md - Workflow templates
```

---

## 🎯 What Do You Want to Do?

### I want to...

**...try it out locally**
→ Run: `make quickstart` (requires Docker)
→ Read: [QUICKSTART.md](QUICKSTART.md)

**...deploy to production**
→ Read: [DEPLOYMENT.md](DEPLOYMENT.md)
→ Use: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

**...develop and make changes**
→ Run: `pnpm install && pnpm dev`
→ Read: [CONTRIBUTING.md](CONTRIBUTING.md)

**...use Vercel**
→ Read: [DEPLOYMENT.md](DEPLOYMENT.md#vercel-deployment)
→ Note: Understand limitations first

**...export/backup Docker images**
→ Run: `make docker-export` or `make docker-export-all`
→ Read: [DEPLOYMENT.md](DEPLOYMENT.md#exporting-docker-images)

**...understand what's available**
→ Read: [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)
→ Run: `make help`

---

## ⚡ Super Quick Commands

```bash
# Show all available commands
make help

# Docker commands
make docker-up          # Start production setup
make docker-up-dev      # Start development setup
make docker-down        # Stop all services
make docker-logs        # View logs
make docker-export      # Export Docker image
make docker-export-all  # Export all platform images
make docker-import      # Import Docker image

# Development commands
make dev                # Start dev mode
make build              # Build all packages
make test               # Run tests
make lint               # Lint code

# Utility commands
make env-setup          # Create .env from template
make env-generate-key   # Generate encryption key
make health-check       # Check if n8n is running
```

---

## 🔧 Prerequisites

Choose based on your deployment method:

### For Docker Deployment
- Docker 20.10+
- Docker Compose v2.0+

### For Development
- Node.js 22.16+
- pnpm 10.22.0+

### For Vercel
- Vercel account
- External PostgreSQL database

---

## 🌟 First Steps After Installation

1. **Access the platform**
   - Open: http://localhost:5678
   - Create your admin account

2. **Create your first workflow**
   - Click "Add workflow"
   - Drag nodes from the left panel
   - Connect and configure nodes
   - Click "Execute" to test

3. **Explore default workflows**
   - Check: `default-workflows/` directory
   - Import examples for automotive use cases

4. **Configure integrations**
   - Go to: Settings → Credentials
   - Add credentials for services

---

## 📖 Key Documentation

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [QUICKSTART.md](QUICKSTART.md) | Get running fast | 5 min |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Complete deployment guide | 15 min |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | Validation steps | 10 min |
| [Makefile](Makefile) | Available commands | Run `make help` |

---

## 🆘 Need Help?

### Common Issues

**Can't access http://localhost:5678**
```bash
# Check if running
docker compose ps

# View logs
make docker-logs

# Restart
make docker-restart
```

**Port 5678 already in use**
```bash
# Change port in docker-compose.yml
# Then restart
make docker-down && make docker-up
```

**Build errors**
```bash
# Clean and rebuild
make clean
pnpm install
pnpm build
```

### Resources

- 📖 [Troubleshooting Guide](DEPLOYMENT.md#troubleshooting)
- 💬 [n8n Community Forum](https://community.n8n.io)
- 📚 [Official n8n Docs](https://docs.n8n.io)
- 🐛 [GitHub Issues](https://github.com/n8n-io/n8n/issues)

---

## 🎓 Learning Path

1. **Week 1: Basics**
   - Install and access platform
   - Create simple workflow
   - Test webhook trigger
   - Explore available nodes

2. **Week 2: Integration**
   - Connect external services
   - Use API nodes
   - Handle errors
   - Schedule workflows

3. **Week 3: Advanced**
   - Code nodes (JavaScript/Python)
   - Complex workflows
   - Environment variables
   - Workflow templates

4. **Week 4: Production**
   - Production deployment
   - Monitoring setup
   - Backup procedures
   - Security hardening

---

## 🔐 Security Note

**Before deploying to production:**

1. Generate encryption key: `make env-generate-key`
2. Set strong database password
3. Enable HTTPS
4. Configure firewall
5. Review [DEPLOYMENT.md](DEPLOYMENT.md) security section

---

## 🚦 Quick Status Check

```bash
# Check if everything is working
make health-check

# View current status
docker compose ps

# View logs for errors
make docker-logs

# Test database connection
docker compose exec n8n n8n --version
```

---

## 📦 What's Included?

- ✅ n8n workflow automation
- ✅ 400+ integrations
- ✅ AI/LangChain support
- ✅ PostgreSQL database
- ✅ Redis queue management
- ✅ Docker deployment
- ✅ Vercel support
- ✅ Comprehensive documentation
- ✅ Example workflows
- ✅ Build automation (Makefile)

---

## 🎯 Next Steps

After getting started:

1. ✅ Complete setup
2. 📖 Read [DEPLOYMENT.md](DEPLOYMENT.md) for production
3. 🔒 Review security settings
4. 📊 Setup monitoring
5. 💾 Configure backups
6. 🧪 Test workflows
7. 🚀 Deploy to production

---

## 💡 Pro Tips

- Use `make help` to see all commands
- Start with `docker-compose.dev.yml` for testing
- Read the checklist before production deployment
- Keep encryption key safe (can't recover without it)
- Regular backups are essential
- Monitor disk space and logs

---

**Ready to start?** Run `make quickstart` now! 🚀
