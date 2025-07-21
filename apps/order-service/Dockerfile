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
COPY apps/order-service/ ./apps/order-service/

# Build shared library first
RUN npm run build shared

# Build order-service
RUN npm run build order-service

EXPOSE 3002

CMD ["node", "dist/apps/order-service/apps/order-service/src/main.js"]