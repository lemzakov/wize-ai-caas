# ==============================================
# WIZE Platform - Local Development Dockerfile
# ==============================================
# This Dockerfile builds n8n from source for local development
# For production, use the official n8n image or the build scripts

ARG NODE_VERSION=22.21.1

# ====== Stage 1: Build Stage ======
FROM node:${NODE_VERSION}-alpine AS builder

# Install build dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    curl

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@10.22.0 --activate

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY patches ./patches

# Copy all package.json files
COPY packages ./packages

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Build n8n for deployment
RUN pnpm build:deploy

# ====== Stage 2: Runtime Stage ======
FROM node:${NODE_VERSION}-alpine

# Install runtime dependencies
RUN apk add --no-cache \
    tini \
    su-exec \
    curl \
    ca-certificates \
    graphicsmagick \
    tzdata

# Set environment variables
ENV NODE_ENV=production \
    NODE_ICU_DATA=/usr/local/lib/node_modules/full-icu \
    SHELL=/bin/sh \
    N8N_USER_FOLDER=/home/node/.n8n

# Install full-icu
RUN npm install -g full-icu

# Create app user
RUN addgroup -g 1000 node && \
    adduser -u 1000 -G node -s /bin/sh -D node

WORKDIR /home/node

# Copy built application from builder
COPY --from=builder --chown=node:node /app/compiled /usr/local/lib/node_modules/n8n
COPY --from=builder --chown=node:node /app/docker/images/n8n/docker-entrypoint.sh /docker-entrypoint.sh

# Rebuild native modules for Alpine
RUN cd /usr/local/lib/node_modules/n8n && \
    npm rebuild sqlite3 && \
    ln -s /usr/local/lib/node_modules/n8n/bin/n8n /usr/local/bin/n8n && \
    mkdir -p /home/node/.n8n && \
    chown -R node:node /home/node && \
    rm -rf /root/.npm /tmp/*

# Make entrypoint executable
RUN chmod +x /docker-entrypoint.sh

# Expose n8n port
EXPOSE 5678

# Use tini as entrypoint for proper signal handling
USER node
ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]

# Metadata
LABEL org.opencontainers.image.title="WIZE Platform (n8n)" \
      org.opencontainers.image.description="WIZE Platform for Customer Interaction Digitization and Automation" \
      org.opencontainers.image.source="https://github.com/lemzakov/wize-ai-caas" \
      org.opencontainers.image.vendor="WIZE" \
      org.opencontainers.image.version="2.4.0"
