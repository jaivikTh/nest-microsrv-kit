# 🌐 API Gateway Service Documentation

## 📋 Overview

The API Gateway serves as the central entry point for all client requests in the microservices architecture. It routes HTTP requests to appropriate microservices via TCP communication and provides a unified REST API interface.

## 🎯 Purpose

- **Single Entry Point:** Centralized access to all microservices
- **Request Routing:** Routes requests to appropriate microservices
- **Protocol Translation:** Converts HTTP requests to TCP messages
- **API Documentation:** Provides Swagger/OpenAPI documentation
- **Load Distribution:** Distributes requests across service instances

## 🏗️ Architecture

```
┌─────────────────┐
│   Client Apps   │
│  (Web, Mobile)  │
└─────────────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐
│   API Gateway   │
│   Port: 3000    │
│   REST Endpoints│
└─────────────────┘
         │ TCP
         ▼
┌─────────────────┐
│  Microservices  │
│ (User, Order)   │
└─────────────────┘
```

## 📁 File Structure

```
apps/api-gateway/
├── src/
│   ├── controllers/           # REST API Controllers
│   │   ├── health.controller.ts    # Health check endpoint
│   │   ├── user.controller.ts      # User management endpoints
│   │   └── order.controller.ts     # Order management endpoints
│   ├── app.module.ts         # Main application module
│   └── main.ts              # Application entry point & Swagger setup
├── Dockerfile               # Docker configuration
└── tsconfig.app.json        # TypeScript configuration
```

## 🔧 Configuration

### **Environment Variables**
```env
# Service Configuration
API_GATEWAY_PORT=3000
NODE_ENV=development

# Microservice Connections
USER_SERVICE_HOST=user-service
USER_SERVICE_PORT=3001
ORDER_SERVICE_HOST=order-service
ORDER_SERVICE_PORT=3002
```

### **Module Configuration**
```typescript
// app.module.ts
ClientsModule.register([
  {
    name: 'USER_SERVICE',
    transport: Transport.TCP,
    options: {
      host: process.env.USER_SERVICE_HOST || 'localhost',
      port: parseInt(process.env.USER_SERVICE_PORT) || 3001,
    },
  },
  {
    name: 'ORDER_SERVICE',
    transport: Transport.TCP,
    options: {
      host: process.env.ORDER_SERVICE_HOST || 'localhost',
      port: parseInt(process.env.ORDER_SERVICE_PORT) || 3002,
    },
  },
])
```

## 🛣️ API Endpoints

### **Health Check**
| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/health` | Service health status | Health information |

### **User Management**
| Method | Endpoint | Description | Microservice |
|--------|----------|-------------|--------------|
| POST | `/users` | Create new user | User Service |
| GET | `/users` | Get all users | User Service |
| GET | `/users/:id` | Get user by ID | User Service |
| PUT | `/users/:id` | Update user | User Service |
| DELETE | `/users/:id` | Delete user | User Service |

### **Order Management**
| Method | Endpoint | Description | Microservice |
|--------|----------|-------------|--------------|
| POST | `/orders` | Create new order | Order Service |
| GET | `/orders` | Get all orders | Order Service |
| GET | `/orders/:id` | Get order by ID | Order Service |
| GET | `/orders/user/:userId` | Get user orders | Order Service |
| PUT | `/orders/:id` | Update order | Order Service |
| DELETE | `/orders/:id` | Delete order | Order Service |

## 📡 Communication Pattern

### **Request Flow**
1. **HTTP Request** → API Gateway Controller
2. **TCP Message** → Microservice via ClientProxy
3. **Database Operation** → Microservice processes request
4. **TCP Response** → Back to API Gateway
5. **HTTP Response** → Back to client

### **Message Pattern Example**
```typescript
// API Gateway Controller
@Post()
createUser(@Body() createUserDto: CreateUserDto) {
  return this.userService.send({ cmd: 'create_user' }, createUserDto);
}

// User Service Handler
@MessagePattern({ cmd: 'create_user' })
createUser(data: CreateUserDto) {
  return this.userService.create(data);
}
```

## 📚 Swagger Documentation

### **Configuration**
```typescript
// main.ts
const config = new DocumentBuilder()
  .setTitle('NestJS Microservices API')
  .setDescription('Comprehensive microservices API')
  .setVersion('1.0.0')
  .addTag('Users', 'User management operations')
  .addTag('Orders', 'Order management operations')
  .addTag('Health', 'System health endpoints')
  .build();
```

### **Access Points**
- **Swagger UI:** `http://localhost:3000/api/docs`
- **OpenAPI JSON:** `http://localhost:3000/api/docs-json`
- **OpenAPI YAML:** `http://localhost:3000/api/docs-yaml`

## 🔍 Controller Details

### **Health Controller**
```typescript
@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'api-gateway',
      uptime: process.uptime(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    };
  }
}
```

### **User Controller**
- Handles all user-related HTTP requests
- Routes to User Service via TCP
- Includes comprehensive Swagger documentation
- Input validation with DTOs
- Error handling and response formatting

### **Order Controller**
- Handles all order-related HTTP requests
- Routes to Order Service via TCP
- Supports user-specific order queries
- Comprehensive API documentation
- Business rule validation

## 🔒 Security Features

### **Input Validation**
```typescript
// Global validation pipe
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}));
```

### **Error Handling**
- Standardized error responses
- HTTP status code mapping
- Validation error formatting
- Microservice error propagation

## 🐳 Docker Configuration

### **Dockerfile**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
RUN npm ci
COPY libs/ ./libs/
COPY apps/api-gateway/ ./apps/api-gateway/
RUN npm run build shared
RUN npm run build api-gateway
EXPOSE 3000
CMD ["node", "dist/apps/api-gateway/apps/api-gateway/src/main.js"]
```

### **Docker Compose**
```yaml
api-gateway:
  build:
    context: .
    dockerfile: apps/api-gateway/Dockerfile
  container_name: api-gateway
  environment:
    - API_GATEWAY_PORT=3000
    - USER_SERVICE_HOST=user-service
    - ORDER_SERVICE_HOST=order-service
  ports:
    - "3000:3000"
  depends_on:
    - user-service
    - order-service
```

## 🚀 Development

### **Local Development**
```bash
# Start dependencies
docker compose -f docker-compose.dev.yml up -d

# Start API Gateway
npm run start:dev api-gateway
```

### **Testing**
```bash
# Health check
curl http://localhost:3000/health

# Create user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'

# Get users
curl http://localhost:3000/users
```

## 📊 Monitoring

### **Health Monitoring**
- Health endpoint provides service status
- Uptime and memory usage information
- Environment and version details
- Microservice connectivity status

### **Logging**
- Request/response logging
- Error tracking
- Performance monitoring
- Microservice communication logs

## 🔧 Maintenance

### **Adding New Endpoints**
1. Create controller method
2. Add Swagger documentation
3. Configure microservice routing
4. Update API documentation
5. Add tests

### **Updating Microservice Connections**
1. Update environment variables
2. Modify ClientsModule configuration
3. Test connectivity
4. Update documentation

## 🚨 Troubleshooting

### **Common Issues**
1. **Microservice Connection Failed**
   - Check service availability
   - Verify host/port configuration
   - Check network connectivity

2. **Validation Errors**
   - Verify DTO definitions
   - Check request payload format
   - Review validation rules

3. **Swagger Documentation Issues**
   - Verify decorator usage
   - Check DTO exports
   - Review OpenAPI configuration

### **Debug Commands**
```bash
# Check service logs
docker compose logs api-gateway

# Test microservice connectivity
curl http://localhost:3000/health

# Verify Swagger documentation
curl http://localhost:3000/api/docs-json
```

## 📈 Performance Considerations

### **Optimization Strategies**
- Connection pooling for microservices
- Request/response caching
- Load balancing configuration
- Rate limiting implementation

### **Scaling**
- Horizontal scaling with load balancer
- Multiple API Gateway instances
- Service discovery integration
- Health check configuration

---

## 📚 Related Documentation

- [Project Structure](../PROJECT_STRUCTURE.md)
- [User Service Documentation](USER_SERVICE.md)
- [Order Service Documentation](ORDER_SERVICE.md)
- [API Documentation](../api-documentation.md)

---

**Service Type:** API Gateway  
**Port:** 3000  
**Protocol:** HTTP/REST → TCP  
**Dependencies:** User Service, Order Service  
**Last Updated:** 2025-07-18