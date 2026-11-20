# ── Stage 1: Build ──
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (better Docker caching)
COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Install ALL dependencies (including devDependencies for tsc)
RUN npm ci

# Copy source code
COPY tsconfig.json ./
COPY src ./src/

# Build TypeScript → JavaScript
RUN npx tsc

# Generate Prisma client
RUN npx prisma generate


# ── Stage 2: Production ──
FROM node:20-alpine AS runner

WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci --omit=dev && npx prisma generate

# Copy compiled JS from builder
COPY --from=builder /app/dist ./dist/

# Non-root user for security
RUN addgroup -g 1001 -S pulsewatch && \
    adduser -S pulsewatch -u 1001 -G pulsewatch
USER pulsewatch

EXPOSE 5000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
