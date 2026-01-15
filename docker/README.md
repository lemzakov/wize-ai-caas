# Docker Images

This directory contains Dockerfile configurations for building n8n images.

## Structure

```
docker/
└── images/
    ├── n8n/              # Main n8n application image
    ├── n8n-base/         # Base image with dependencies
    └── runners/          # Task runner images for external code execution
```

## Building Images

### Using Build Scripts

The recommended way to build images is using the provided build scripts:

```bash
# Build n8n and create Docker image
pnpm build:docker

# Or use the Dockerfile in the root directory
docker build -t wize-platform:local .
```

### Manual Build

For advanced users, you can build images directly:

```bash
# First, build the compiled application
pnpm build:deploy

# Then build the n8n image
cd docker/images/n8n
docker build -t wize-platform:custom .
```

## Image Descriptions

### n8n Image

The main n8n application image contains:
- Built n8n application
- Node.js runtime
- SQLite support (can be configured for PostgreSQL/MySQL)
- All core nodes and integrations

**Dockerfile:** `docker/images/n8n/Dockerfile`

### n8n-base Image

Base image with common dependencies used by other images:
- Node.js
- Build tools
- System dependencies

**Dockerfile:** `docker/images/n8n-base/Dockerfile`

### Runners Image

External code execution environments for running Python and JavaScript code in isolated containers.

**Dockerfile:** `docker/images/runners/Dockerfile`

## Usage

### Using Pre-built Images

For most users, we recommend using the official n8n Docker images:

```yaml
# docker-compose.yml
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    # ...
```

See the root `docker-compose.yml` for a complete example.

### Using Custom Build

If you've made changes to the code and want to use your custom build:

```yaml
# docker-compose.yml
services:
  n8n:
    build:
      context: .
      dockerfile: Dockerfile
    # ...
```

## Environment Variables

See the root `.env.example` file for all available environment variables.

## More Information

- **Deployment Guide:** [../DEPLOYMENT.md](../DEPLOYMENT.md)
- **Quick Start:** [../QUICKSTART.md](../QUICKSTART.md)
- **Official n8n Docker Documentation:** https://docs.n8n.io/hosting/installation/docker/
