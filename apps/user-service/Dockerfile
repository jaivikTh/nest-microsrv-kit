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
COPY apps/user-service/ ./apps/user-service/

# Build shared library first
RUN npm run build shared

# Build user-service
RUN npm run build user-service

EXPOSE 3001

CMD ["node", "dist/apps/user-service/apps/user-service/src/main.js"]