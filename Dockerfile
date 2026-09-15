# Stage 1: Build the frontend
FROM node:20-bookworm-slim AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the backend
FROM node:20-bookworm-slim AS backend-builder
WORKDIR /app/backend
# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
COPY backend/package*.json ./
RUN npm install --legacy-peer-deps
COPY backend/ ./
RUN npx prisma generate
RUN npx prisma db push
RUN npm run build

# Stage 3: Production Server
FROM node:20-bookworm-slim
WORKDIR /app
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy backend
COPY --from=backend-builder /app/backend/package*.json ./backend/
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/prisma ./backend/prisma
COPY --from=backend-builder /app/backend/dev.db* ./backend/

# Copy frontend build
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Expose port and start
EXPOSE 3000
WORKDIR /app/backend
ENV NODE_ENV=production
CMD ["npm", "start"]
