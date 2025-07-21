# 🔐 JWT Authentication Documentation

## 📋 Overview

This document describes the JWT (JSON Web Token) authentication system implemented in the NestJS microservices architecture. The authentication system provides secure user registration, login, and token-based authorization across all services.

## 🎯 Purpose

- **User Authentication**: Secure user registration and login
- **Token-Based Authorization**: JWT tokens for API access
- **Password Security**: Bcrypt hashing with salt rounds
- **Global Protection**: Automatic protection of all endpoints
- **Flexible Access Control**: Public endpoints and user-specific data access

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │    │   API Gateway   │    │ Shared Library  │
│                 │    │                 │    │                 │
│ 1. Register/    │───►│ 2. Auth         │───►│ 3. JWT Strategy │
│    Login        │    │    Controller   │    │    & Guards     │
│                 │    │                 │    │                 │
│ 6. Use Token    │◄───│ 5. Return JWT   │◄───│ 4. Generate     │
│    in Headers   │    │    Token        │    │    Token        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Protected API   │    │ JWT Validation  │    │   PostgreSQL    │
│   Requests      │    │   Middleware    │    │ User Database   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Components

### **Shared Library Components**

#### **1. JWT Strategy (`libs/shared/src/auth/jwt.strategy.ts`)**
- Validates JWT tokens from Authorization header
- Extracts user information from token payload
- Integrates with Passport.js

#### **2. JWT Auth Guard (`libs/shared/src/auth/guards/jwt-auth.guard.ts`)**
- Protects endpoints requiring authentication
- Respects `@Public()` decorator for open endpoints
- Automatically applied globally

#### **3. Auth Service (`libs/shared/src/auth/auth.service.ts`)**
- Handles user registration and login
- Password hashing and validation
- JWT token generation and verification
- User profile management

#### **4. Password Utilities (`libs/shared/src/auth/utils/password.util.ts`)**
- Bcrypt password hashing (12 salt rounds)
- Password strength validation
- Secure password comparison

#### **5. Decorators**
- `@Public()`: Mark endpoints as publicly accessible
- `@CurrentUser()`: Inject authenticated user into controller methods

#### **6. Interfaces**
- `JwtPayload`: Token payload structure
- `UserRequest`: Extended request with user information

### **API Gateway Components**

#### **1. Auth Controller (`apps/api-gateway/src/controllers/auth.controller.ts`)**
- `POST /auth/register`: User registration
- `POST /auth/login`: User authentication
- `GET /auth/profile`: Get user profile
- `POST /auth/verify`: Verify token validity

#### **2. Protected Controllers**
- User Controller: User management (protected)
- Order Controller: Order management (protected)
- Health Controller: System health (public)

## 🚀 Usage

### **1. User Registration**

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 86400,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### **2. User Login**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

### **3. Accessing Protected Endpoints**

```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### **4. Get User Profile**

```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 🔒 Security Features

### **Password Security**
- **Bcrypt Hashing**: 12 salt rounds for strong password protection
- **Password Strength Validation**:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character (@$!%*?&)

### **JWT Token Security**
- **Secret Key**: Configurable via environment variables
- **Expiration**: 24 hours by default
- **Bearer Token**: Standard Authorization header format
- **Payload Validation**: Validates token structure and content

### **Access Control**
- **Global Protection**: All endpoints protected by default
- **Public Endpoints**: Explicitly marked with `@Public()` decorator
- **User-Specific Data**: Orders and profiles restricted to authenticated user

## 📝 Environment Configuration

### **Required Environment Variables**

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Database Configuration (for user storage)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=trd123
DB_NAME=microservices_db
```

### **Production Security**
- Use a strong, randomly generated JWT secret
- Consider shorter token expiration times
- Implement token refresh mechanism
- Use HTTPS in production
- Store secrets in secure environment variables

## 🎮 Controller Implementation

### **Making Endpoints Public**

```typescript
@Public()
@Get('health')
healthCheck() {
  return { status: 'ok' };
}
```

### **Accessing Current User**

```typescript
@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@CurrentUser() user: any) {
  return this.authService.getProfile(user.userId);
}
```

### **Protecting Controllers**

```typescript
@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  // All methods are automatically protected
}
```

## 🔄 Token Lifecycle

### **1. Token Generation**
```typescript
const payload: JwtPayload = {
  sub: user.id,        // Subject (user ID)
  email: user.email,   // User email
  name: user.name,     // User name
  iat: timestamp,      // Issued at
  exp: expiration      // Expiration
};
```

### **2. Token Validation**
- Extract token from Authorization header
- Verify token signature with secret
- Check token expiration
- Validate payload structure
- Return user information

### **3. Token Usage**
- Include in Authorization header: `Bearer <token>`
- Automatically validated on protected endpoints
- User information available via `@CurrentUser()` decorator

## 🚨 Error Handling

### **Authentication Errors**

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### **Token Validation Errors**

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### **Registration Errors**

```json
{
  "statusCode": 400,
  "message": [
    "Password must contain at least one uppercase letter",
    "Password must contain at least one number"
  ],
  "error": "Bad Request"
}
```

## 📊 Swagger Integration

### **Bearer Authentication**
- Swagger UI includes JWT authentication
- Click "Authorize" button to enter token
- Token automatically included in all requests
- Test protected endpoints directly from documentation

### **Authentication Endpoints**
- All auth endpoints documented with examples
- Request/response schemas defined
- Error responses documented

## 🔧 Development

### **Testing Authentication**

```bash
# 1. Register a user
npm run test:auth:register

# 2. Login and get token
npm run test:auth:login

# 3. Test protected endpoint
npm run test:auth:protected
```

### **Local Development**
```bash
# Start database
docker compose -f docker-compose.dev.yml up -d

# Start API Gateway with auth
npm run start:dev api-gateway
```

## 🚀 Production Deployment

### **Security Checklist**
- [ ] Strong JWT secret (32+ characters)
- [ ] HTTPS enabled
- [ ] Secure password requirements
- [ ] Rate limiting on auth endpoints
- [ ] Token expiration monitoring
- [ ] Audit logging for auth events

### **Environment Setup**
```bash
# Generate secure JWT secret
openssl rand -base64 32

# Set environment variables
export JWT_SECRET="generated-secret-key"
export JWT_EXPIRES_IN="1h"
export NODE_ENV="production"
```

## 🔍 Monitoring

### **Authentication Metrics**
- Registration success/failure rates
- Login attempt monitoring
- Token validation failures
- Password strength compliance

### **Security Monitoring**
- Failed authentication attempts
- Token expiration patterns
- Unusual access patterns
- Brute force detection

## 🛠️ Customization

### **Extending JWT Payload**
```typescript
export interface JwtPayload {
  sub: number;
  email: string;
  name?: string;
  roles?: string[];     // Add user roles
  permissions?: string[]; // Add permissions
  iat?: number;
  exp?: number;
}
```

### **Custom Guards**
```typescript
@Injectable()
export class AdminGuard extends JwtAuthGuard {
  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getRequest().user;
    return user.roles?.includes('admin');
  }
}
```

### **Password Policy Customization**
```typescript
// Modify password validation in PasswordUtil
static validatePasswordStrength(password: string) {
  // Custom validation rules
}
```

## 📚 Related Documentation

- [Project Structure](../PROJECT_STRUCTURE.md)
- [API Gateway Documentation](API_GATEWAY.md)
- [User Service Documentation](USER_SERVICE.md)
- [API Documentation](../api-documentation.md)

## 🔗 External Resources

- [JWT.io](https://jwt.io/) - JWT token debugger
- [Passport.js](http://www.passportjs.org/) - Authentication middleware
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing
- [NestJS Authentication](https://docs.nestjs.com/security/authentication)

---

**Security Level:** Production Ready  
**Token Type:** JWT (JSON Web Token)  
**Encryption:** Bcrypt (12 salt rounds)  
**Expiration:** 24 hours (configurable)  
**Last Updated:** 2025-07-18