![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# WIZE Platform - Платформа по цифровизации и автоматизации взаимодействия с клиентом

WIZE Platform (based on n8n) is a workflow automation platform for customer interaction digitization and automation within the car subscription lifecycle. It gives technical teams the flexibility of code with the speed of no-code. With 400+ integrations, native AI capabilities, and a fair-code license, WIZE lets you build powerful automations while maintaining full control over your data and deployments.

![n8n.io - Screenshot](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-screenshot-readme.png)

## Key Capabilities

- **Code When You Need It**: Write JavaScript/Python, add npm packages, or use the visual interface
- **AI-Native Platform**: Build AI agent workflows based on LangChain with your own data and models
- **Full Control**: Self-host with our fair-code license or use our [cloud offering](https://app.n8n.cloud/login)
- **Enterprise-Ready**: Advanced permissions, SSO, and air-gapped deployments
- **Active Community**: 400+ integrations and 900+ ready-to-use [templates](https://n8n.io/workflows)

## Quick Start

### Docker Deployment (Recommended)

```bash
# Clone the repository
git clone https://github.com/lemzakov/wize-ai-caas.git
cd wize-ai-caas

# Setup environment
make quickstart

# Or manually:
cp .env.example .env
# Edit .env and set N8N_ENCRYPTION_KEY
docker-compose up -d
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

- 📚 [Quick Start Guide](QUICKSTART.md) - Get started in minutes
- 🚀 [Deployment Guide](DEPLOYMENT.md) - Docker, Vercel, and more
- 📋 [Default Workflows Manual (Russian)](DEFAULT_WORKFLOWS_MANUAL_RU.md) - Workflow templates
- 🔧 [400+ Integrations](https://n8n.io/integrations)
- 💡 [Example Workflows](https://n8n.io/workflows)
- 🤖 [AI & LangChain Guide](https://docs.n8n.io/advanced-ai/)
- 👥 [Community Forum](https://community.n8n.io)
- 📖 [Official n8n Documentation](https://docs.n8n.io)

## Support

Need help? Our community forum is the place to get support and connect with other users:
[community.n8n.io](https://community.n8n.io)

## License

WIZE Platform is based on n8n, which is [fair-code](https://faircode.io) distributed under the [Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md) and [n8n Enterprise License](https://github.com/n8n-io/n8n/blob/master/LICENSE_EE.md).

- **Source Available**: Always visible source code
- **Self-Hostable**: Deploy anywhere (Docker, Vercel, VPS, etc.)
- **Extensible**: Add your own nodes and functionality

[Enterprise licenses](mailto:license@n8n.io) available for additional features and support.

Additional information about the license model can be found in the [docs](https://docs.n8n.io/sustainable-use-license/).

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

Found a bug 🐛 or have a feature idea ✨? Check our [Contributing Guide](https://github.com/n8n-io/n8n/blob/master/CONTRIBUTING.md) to get started.

## Join the Team

Want to shape the future of automation? Check out our [job posts](https://n8n.io/careers) and join our team!

## What does n8n mean?

**Short answer:** It means "nodemation" and is pronounced as n-eight-n.

**Long answer:** "I get that question quite often (more often than I expected) so I decided it is probably best to answer it here. While looking for a good name for the project with a free domain I realized very quickly that all the good ones I could think of were already taken. So, in the end, I chose nodemation. 'node-' in the sense that it uses a Node-View and that it uses Node.js and '-mation' for 'automation' which is what the project is supposed to help with. However, I did not like how long the name was and I could not imagine writing something that long every time in the CLI. That is when I then ended up on 'n8n'." - **Jan Oberhauser, Founder and CEO, n8n.io**
