![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# WIZE Platform - Платформа по цифровизации и автоматизации взаимодействия с клиентом

WIZE Platform is a workflow automation platform for customer interaction digitization and automation within the car subscription lifecycle. It gives technical teams the flexibility of code with the speed of no-code. With 400+ integrations, native AI capabilities, and a fair-code license, WIZE lets you build powerful automations while maintaining full control over your data and deployments.

![WIZE Platform - Screenshot](./assets/wize-screenshot.png)

## Key Capabilities

- **Code When You Need It**: Write JavaScript/Python, add npm packages, or use the visual interface
- **AI-Native Platform**: Build AI agent workflows based on LangChain with your own data and models
- **Full Control**: Self-host with our fair-code license
- **Enterprise-Ready**: Advanced permissions, SSO, and air-gapped deployments
- **Active Community**: 400+ integrations and 900+ ready-to-use templates

## Quick Start

**👉 New to WIZE Platform? Start here: [GETTING_STARTED.md](GETTING_STARTED.md)**

### Docker Deployment (Recommended)

```bash
# Clone the repository
git clone https://github.com/lemzakov/wize-ai-caas.git
cd wize-ai-caas

# Quick start (sets up everything)
make quickstart
```

Access the platform at http://localhost:5678

### From Source

```bash
# Install dependencies
pnpm install

# Build and start
pnpm build
pnpm start
```

📖 **See detailed instructions:** [Quick Start Guide](QUICKSTART.md)

## Deployment Options

- **🐳 Docker** - Production-ready setup with PostgreSQL and Redis
- **☁️ Vercel** - Serverless deployment (with limitations)
- **🔨 From Source** - Build and deploy manually

📖 **Full deployment guide:** [DEPLOYMENT.md](DEPLOYMENT.md)

## Resources

- 🚀 [**Getting Started Guide**](GETTING_STARTED.md) - Choose your deployment path
- 📚 [Quick Start Guide](QUICKSTART.md) - Get started in minutes
- 🚀 [Deployment Guide](DEPLOYMENT.md) - Docker, Vercel, and more
- ✅ [Deployment Checklist](DEPLOYMENT_CHECKLIST.md) - Validation steps
- 📋 [Default Workflows Manual (Russian)](DEFAULT_WORKFLOWS_MANUAL_RU.md) - Workflow templates

## Support

Need help? Contact your WIZE Platform administrator or refer to the documentation in this repository.

## License

WIZE Platform is based on n8n, which is [fair-code](https://faircode.io) distributed under the [Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md) and [n8n Enterprise License](https://github.com/n8n-io/n8n/blob/master/LICENSE_EE.md).

- **Source Available**: Always visible source code
- **Self-Hostable**: Deploy anywhere (Docker, Vercel, VPS, etc.)
- **Extensible**: Add your own nodes and functionality

## Repository Structure

```
wize-ai-caas/
├── packages/           # Monorepo packages
│   ├── cli/           # Backend application
│   ├── core/          # Core workflow engine
│   ├── frontend/      # Vue.js frontend
│   ├── nodes-base/    # Built-in workflow nodes
│   └── @n8n/          # Shared packages
├── docker/            # Docker build configurations
├── default-workflows/ # Template workflows for automotive use cases
├── .env.example       # Environment variables template
├── docker-compose.yml # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
├── Dockerfile         # Custom Docker build
├── Makefile          # Convenience commands
├── QUICKSTART.md     # Quick start guide
├── DEPLOYMENT.md     # Deployment guide
└── DEFAULT_WORKFLOWS_MANUAL_RU.md # Workflow templates (Russian)
```

## Contributing

Found a bug 🐛 or have a feature idea ✨? Please submit an issue or pull request to this repository.
