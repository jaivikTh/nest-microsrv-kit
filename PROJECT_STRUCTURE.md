# 🏗️ NestJS Microservices Project Structure

## 📋 Overview

This project implements a secure microservices architecture using NestJS with JWT authentication and comprehensive security features. The architecture consists of an API Gateway that routes requests to individual microservices, all communicating via TCP transport with shared authentication and security layers.

## 🎯 Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Gateway   │    │  User Service   │    │ Order Service   │
│    (Port 3000)  │    │   (Port 3001)   │    │   (Port 3002)   │
│ ┌─────────────┐ │    │ TCP Microservice│    │ TCP Microservice│
│ │JWT Auth     │ │◄──►│                 │    │                 │
│ │Rate Limiting│ │    │                 │    │                 │
│ │Security     │ │    │                 │    │                 │
│ └─────────────┘ │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
    ┌─────────────────┐    ┌─────────────────┐
    │   PostgreSQL    │    │      Redis      │
    │   (Port 5433)   │    │   (Port 6380)   │
    │ Shared Database │    │ Cache & Sessions│
    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
nestjs-microservices/
├── 📁 apps/                           # Application services
│   ├── 📁 api-gateway/               # API Gateway service
│   │   ├── 📁 src/
│   │   │   ├── 📁 controllers/       # REST API controllers
│   │   │   │   ├── health.controller.ts
│   │   │   │   ├── user.controller.ts
│   │   │   │   └── order.controller.ts
│   │   │   ├── app.module.ts         # Main application module
│   │   │   └── main.ts              # Application entry point
│   │   ├── Dockerfile               # Docker configuration
│   │   └── tsconfig.app.json        # TypeScript config
│   │
│   ├── 📁 user-service/             # User management microservice
│   │   ├── 📁 src/
│   │   │   ├── app.module.ts        # User service module
│   │   │   ├── main.ts             # TCP microservice entry
│   │   │   ├── user.controller.ts   # Message pattern handlers
│   │   │   └── user.service.ts     # Business logic
│   │   ├── Dockerfile              # Docker configuration
│   │   └── tsconfig.app.json       # TypeScript config
│   │
│   └── 📁 order-service/            # Order management microservice
│       ├── 📁 src/
│       │   ├── app.module.ts        # Order service module
│       │   ├── main.ts             # TCP microservice entry
│       │   ├── order.controller.ts  # Message pattern handlers
│       │   └── order.service.ts    # Business logic
│       ├── Dockerfile              # Docker configuration
│       └── tsconfig.app.json       # TypeScript config
│
├── 📁 libs/                          # Shared libraries
│   └── 📁 shared/                    # Common shared code
│       └── 📁 src/
│           ├── 📁 auth/              # Authentication system
│           │   ├── 📁 decorators/    # Auth decorators
│           │   │   ├── current-user.decorator.ts
│           │   │   └── public.decorator.ts
│           │   ├── 📁 guards/        # Authentication guards
│           │   │   └── jwt-auth.guard.ts
│           │   ├── 📁 interfaces/    # Auth interfaces
│           │   │   ├── jwt-payload.interface.ts
│           │   │   └── user-request.interface.ts
│           │   ├── 📁 utils/         # Auth utilities
│           │   │   └── password.util.ts
│           │   ├── auth.module.ts    # Auth module configuration
│           │   ├── auth.service.ts   # Auth business logic
│           │   ├── jwt.strategy.ts   # JWT Passport strategy
│           │   └── index.ts          # Auth exports
│           ├── 📁 database/          # Database configuration
│           │   └── database.module.ts
│           ├── 📁 dto/              # Data Transfer Objects
│           │   ├── 📁 auth/         # Authentication DTOs
│           │   │   ├── auth-response.dto.ts
│           │   │   ├── login.dto.ts
│           │   │   ├── register.dto.ts
│           │   │   └── index.ts
│           │   ├── 📁 order/        # Order DTOs
│           │   │   └── create-order-request.dto.ts
│           │   ├── user.dto.ts      # User DTOs with validation
│           │   ├── order.dto.ts     # Order DTOs with validation
│           │   ├── error.dto.ts     # Error response DTOs
│           │   ├── response.dto.ts  # Standard response DTOs
│           │   └── index.ts         # DTO exports
│           ├── 📁 entities/         # Database entities
│           │   ├── user.entity.ts   # User Sequelize model
│           │   ├── order.entity.ts  # Order Sequelize model
│           │   └── index.ts         # Entity exports
│           ├── 📁 filters/          # Exception filters
│           │   └── all-exception.filter.ts
│           ├── 📁 interfaces/       # TypeScript interfaces
│           │   └── index.ts         # Interface definitions
│           ├── 📁 security/         # Security modules
│           │   ├── 📁 guards/       # Security guards
│           │   │   ├── api-key.guard.ts
│           │   │   └── rate-limit.guard.ts
│           │   ├── 📁 interceptors/ # Security interceptors
│           │   │   └── security.interceptor.ts
│           │   ├── 📁 pipes/        # Security pipes
│           │   │   └── input-sanitization.pipe.ts
│           │   ├── 📁 services/     # Security services
│           │   │   ├── cors-config.service.ts
│           │   │   └── helmet-config.service.ts
│           │   ├── security.module.ts
│           │   └── security.service.ts
│           ├── 📁 utils/            # Utility functions
│           │   ├── 📁 enums/        # Enumerations
│           │   │   ├── errors.enum.ts
│           │   │   ├── role.enum.ts
│           │   │   └── status.enum.ts
│           │   ├── constants.ts     # Application constants
│           │   ├── model.constants.ts
│           │   └── string.constants.ts
│           └── index.ts             # Main shared exports
│
├── 📁 dist/                          # Compiled JavaScript output
├── 📁 node_modules/                  # Dependencies
│
├── 📄 Configuration Files
│   ├── docker-compose.yml           # Production Docker setup
│   ├── docker-compose.dev.yml       # Development Docker setup
│   ├── package.json                 # Dependencies and scripts
│   ├── tsconfig.json               # Root TypeScript config
│   ├── nest-cli.json               # NestJS CLI configuration
│   └── .env                        # Environment variables
│
├── 📄 Documentation
│   ├── README.md                    # Project overview
│   ├── PROJECT_STRUCTURE.md         # This file
│   ├── api-documentation.md         # API documentation
│   ├── swagger-spec.json           # OpenAPI specification
│   ├── 📁 docs/                    # Service-specific docs
│   │   ├── API_GATEWAY.md          # API Gateway documentation
│   │   ├── USER_SERVICE.md         # User service documentation
│   │   ├── ORDER_SERVICE.md        # Order service documentation
│   │   ├── JWT_AUTHENTICATION.md   # JWT auth documentation
│   │   └── APPLICATION_FLOW_DIAGRAM.md # Application flow diagrams
│   └── 📁 examples/                # Usage examples
│       └── jwt-authentication-usage.md # JWT usage examples
│
└── 📄 Docker Files
    ├── .dockerignore               # Docker ignore patterns
    └── Dockerfile                  # Base Dockerfile (if needed)
```

## 🔧 Technology Stack

### **Core Technologies**
- **Framework:** NestJS (Node.js)
- **Language:** TypeScript
- **Database:** PostgreSQL with Sequelize ORM
- **Cache:** Redis
- **Communication:** TCP for inter-service communication
- **API Documentation:** Swagger/OpenAPI 3.0
- **Containerization:** Docker & Docker Compose

### **Key Dependencies**
```json
{
  "runtime": {
    "@nestjs/core": "^10.3.0",
    "@nestjs/common": "^10.3.0",
    "@nestjs/microservices": "^10.3.0",
    "@nestjs/sequelize": "^10.0.1",
    "@nestjs/swagger": "^7.3.0",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/throttler": "^5.1.2",
    "sequelize-typescript": "^2.1.6",
    "pg": "^8.11.3",
    "redis": "^4.6.13",
    "bcrypt": "^5.1.1",
    "passport-jwt": "^4.0.1",
    "class-validator": "^0.14.1",
    "class-transformer": "^0.5.1",
    "helmet": "^7.1.0"
  }
}
```

## 🚀 Services Overview

| Service | Port | Type | Purpose | Database Access |
|---------|------|------|---------|----------------|
| **API Gateway** | 3000 | REST API | Route requests to microservices | ❌ No |
| **User Service** | 3001 | TCP Microservice | User management operations | ✅ Yes |
| **Order Service** | 3002 | TCP Microservice | Order management operations | ✅ Yes |
| **PostgreSQL** | 5433 | Database | Shared data storage | - |
| **Redis** | 6380 | Cache | Caching and sessions | - |

## 🔄 Communication Flow

1. **Client Request** → API Gateway (REST)
2. **API Gateway** → Microservice (TCP)
3. **Microservice** → Database (SQL)
4. **Response** ← Microservice ← Database
5. **Client Response** ← API Gateway ← Microservice

## 📦 Shared Components

### **Database Module**
- Centralized database configuration
- Sequelize ORM setup
- Connection management

### **DTOs (Data Transfer Objects)**
- Input validation with class-validator
- Swagger documentation decorators
- Type safety across services

### **Entities**
- Sequelize models with relationships
- Database schema definitions
- Validation rules

### **Error Handling**
- Standardized error responses
- HTTP status code mapping
- Validation error formatting

## 🐳 Docker Configuration

### **Development Environment**
```bash
# Start only database services
docker compose -f docker-compose.dev.yml up -d

# Run services locally
npm run start:dev user-service
npm run start:dev order-service
npm run start:dev api-gateway
```

### **Production Environment**
```bash
# Build and start all services
docker compose build
docker compose up -d

# View logs
docker compose logs -f
```

## 🔧 Development Workflow

### **Adding a New Service**

1. **Create Service Directory**
   ```bash
   mkdir -p apps/new-service/src
   ```

2. **Update Project Files**
   - Add to `nest-cli.json`
   - Update `docker-compose.yml`
   - Create Dockerfile
   - Update this documentation

3. **Service Implementation**
   - Create main.ts (TCP microservice)
   - Create controller (message patterns)
   - Create service (business logic)
   - Create module

4. **Integration**
   - Add client to API Gateway
   - Update shared DTOs if needed
   - Add database entities if needed

### **Removing a Service**

1. **Remove Service Directory**
2. **Update Configuration Files**
3. **Update Documentation**
4. **Clean Docker Images**

## 📊 Monitoring & Health Checks

### **Health Endpoints**
- **API Gateway:** `GET /health`
- **Service Status:** Docker health checks
- **Database:** Connection monitoring

### **Logging**
- Structured logging with NestJS
- Container logs via Docker
- Error tracking and monitoring

## 🔒 Security Features

### **Authentication & Authorization**
- **JWT Authentication**: Secure token-based authentication
- **Password Security**: Bcrypt hashing with 12 salt rounds
- **Protected Endpoints**: Global JWT guard with @Public() decorator
- **User Context**: @CurrentUser() decorator for accessing authenticated user

### **Security Middleware**
- **Rate Limiting**: 3 req/sec, 20 req/10sec, 100 req/min limits
- **Input Sanitization**: XSS and injection attack prevention
- **CORS Configuration**: Cross-origin request management
- **Helmet Integration**: Security headers for all responses
- **Exception Filtering**: Standardized error handling

### **Data Protection**
- **Input Validation**: class-validator with comprehensive rules
- **SQL Injection Prevention**: Sequelize ORM parameterized queries
- **Password Strength**: Enforced complexity requirements
- **Token Expiration**: 24-hour JWT token lifecycle

### **Production Security**
- **Environment Variables**: Secure configuration management
- **Docker Isolation**: Container-based service separation
- **Database Encryption**: Connection-level security
- **HTTPS/TLS**: Encrypted communication (recommended)

## 📈 Scalability

### **Horizontal Scaling**
- Each microservice can be scaled independently
- Load balancer in front of API Gateway
- Database connection pooling

### **Performance Optimization**
- Redis caching layer
- Database query optimization
- Connection pooling
- Async processing

## 🔄 Maintenance

### **Regular Updates**
- Keep dependencies updated
- Monitor security vulnerabilities
- Update documentation
- Review and optimize database queries

### **Documentation Updates**
When adding/removing/updating services:
1. Update this `PROJECT_STRUCTURE.md`
2. Update service-specific documentation in `docs/`
3. Update API documentation
4. Update Docker configurations
5. Update README.md

---

## 📚 Related Documentation

- [API Gateway Documentation](docs/API_GATEWAY.md)
- [User Service Documentation](docs/USER_SERVICE.md)
- [Order Service Documentation](docs/ORDER_SERVICE.md)
- [API Documentation](api-documentation.md)
- [Main README](README.md)

---

**Last Updated:** 2025-07-18  
**Version:** 1.0.0  
**Maintainer:** Development Team