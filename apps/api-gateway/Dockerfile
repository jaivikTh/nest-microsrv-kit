FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY libs/ ./libs/
COPY apps/api-gateway/ ./apps/api-gateway/

# Build shared library first
RUN npm run build shared

# Build api-gateway
RUN npm run build api-gateway

EXPOSE 3000

CMD ["node", "dist/apps/api-gateway/apps/api-gateway/src/main.js"]