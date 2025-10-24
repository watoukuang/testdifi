# syntax=docker/dockerfile:1.4

# 1) Build stage
FROM node:18-bullseye AS builder
WORKDIR /app

# Copy package files first (利用缓存)
COPY package*.json ./

# Configure npm registry and retries
ARG NPM_REGISTRY=https://registry.npmjs.org
RUN npm config set registry $NPM_REGISTRY \
    && npm config set fetch-retries 10 \
    && npm config set fetch-retry-factor 3 \
    && npm config set fetch-retry-maxtimeout 300000 \
    && npm config set fetch-timeout 300000 \
    && npm -v \
    && node -v

# Install deps with cache mount (BuildKit)
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline || (npm config set registry https://registry.npmjs.org && npm ci --prefer-offline)

# Copy all source files
COPY . .

# Build production
RUN npm run build

# 2) Runtime stage (minimal)
FROM node:18-bullseye AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy standalone output and static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose default Next.js port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
