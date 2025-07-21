# NestJS Microservices with Docker

A microservices architecture built with NestJS, PostgreSQL, and Docker. The project includes an API Gateway and two microservices (User Service and Order Service) sharing a PostgreSQL database.

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Gateway   │    │  User Service   │    │ Order Service   │
│    (Port 3000)  │    │   (Port 3001)   │    │   (Port 3002)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │   (Port 5432)   │
                    └─────────────────┘
```

## Services

- **API Gateway**: REST API endpoints that route requests to microservices
- **User Service**: Handles user CRUD operations via TCP
- **Order Service**: Handles order CRUD operations via TCP
- **PostgreSQL**: Shared database for all services
- **Redis**: Message broker and caching (optional)

## Quick Start with Docker

### 1. Build and Run All Services

```bash
# Build all Docker images
npm run docker:build

# Start all services
npm run docker:up

# View logs
npm run docker:logs

# Stop all services
npm run docker:down
```

### 2. Development Mode (Database Only)

If you want to run services locally but use Docker for the database:

```bash
# Start only PostgreSQL and Redis
npm run docker:dev

# Install dependencies locally
npm install

# Run services locally (in separate terminals)
npm run start:dev user-service
npm run start:dev order-service  
npm run start:dev api-gateway

# Stop database services
npm run docker:dev:down
```

## API Endpoints

### Users
- `GET /health` - Health check
- `POST /users` - Create user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Orders
- `POST /orders` - Create order
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `GET /orders/user/:userId` - Get orders by user
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order

## Example API Calls

### Create a User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

### Create an Order
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"product": "Laptop", "amount": 999.99, "userId": 1}'
```

### Get All Users
```bash
curl http://localhost:3000/users
```

### Get User Orders
```bash
curl http://localhost:3000/orders/user/1
```

## Environment Variables

The following environment variables are used:

```env
# Database
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=microservices_db

# Services
API_GATEWAY_PORT=3000
USER_SERVICE_PORT=3001
ORDER_SERVICE_PORT=3002

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
```

## Docker Services

- **postgres**: PostgreSQL 15 database
- **redis**: Redis 7 for caching/messaging
- **user-service**: User management microservice
- **order-service**: Order management microservice
- **api-gateway**: REST API gateway

## Development

### Local Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start database services:
```bash
npm run docker:dev
```

3. Run services in development mode:
```bash
# Terminal 1
npm run start:dev user-service

# Terminal 2
npm run start:dev order-service

# Terminal 3
npm run start:dev api-gateway
```

### Building Individual Services

```bash
# Build shared library
npm run build shared

# Build specific service
npm run build user-service
npm run build order-service
npm run build api-gateway
```

## Database Schema

The application uses Sequelize with the following models:

### User Model
```typescript
{
  id: number (Primary Key)
  name: string
  email: string (Unique)
  createdAt: Date
  updatedAt: Date
}
```

### Order Model
```typescript
{
  id: number (Primary Key)
  product: string
  amount: decimal
  userId: number (Foreign Key)
  createdAt: Date
  updatedAt: Date
}
```

## Troubleshooting

### Check Service Health
```bash
curl http://localhost:3000/health
```

### View Container Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f user-service
docker-compose logs -f order-service
docker-compose logs -f api-gateway
```

### Restart Services
```bash
npm run docker:down
npm run docker:up
```

### Database Connection Issues
Make sure PostgreSQL is running and accessible:
```bash
docker-compose ps
```

The database will be automatically created with tables when the services start.