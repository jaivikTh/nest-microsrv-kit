# 🔄 Application Flow Diagram

## 📋 Overview

This document provides detailed diagrams showing how the NestJS microservices application works, including authentication flows, request routing, and inter-service communication.

## 🎯 Complete Application Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │   Web App   │  │ Mobile App  │  │   Postman   │  │   cURL      │           │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘           │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼ HTTP/HTTPS Requests
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              API GATEWAY (Port 3000)                           │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                        SECURITY LAYER                                   │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │Rate Limiting│  │CORS Handler │  │Input Sanit. │  │Exception    │   │   │
│  │  │Guard        │  │             │  │Pipe         │  │Filter       │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                     AUTHENTICATION LAYER                               │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                    │   │
│  │  │JWT Strategy │  │JWT Auth     │  │@Public      │                    │   │
│  │  │             │  │Guard        │  │Decorator    │                    │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                    │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                        CONTROLLERS                                      │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │Auth         │  │User         │  │Order        │  │Health       │   │   │
│  │  │Controller   │  │Controller   │  │Controller   │  │Controller   │   │   │
│  │  │(Public)     │  │(Protected)  │  │(Protected)  │  │(Public)     │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼ TCP Communication
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              MICROSERVICES LAYER                               │
│                                                                                 │
│  ┌─────────────────────────────┐           ┌─────────────────────────────┐     │
│  │     USER SERVICE            │           │     ORDER SERVICE           │     │
│  │      (Port 3001)            │           │      (Port 3002)            │     │
│  │  ┌─────────────────────┐    │           │  ┌─────────────────────┐    │     │
│  │  │ TCP Message         │    │           │  │ TCP Message         │    │     │
│  │  │ Patterns:           │    │           │  │ Patterns:           │    │     │
│  │  │ • get_users         │    │           │  │ • get_orders        │    │     │
│  │  │ • get_user_by_id    │    │           │  │ • get_order_by_id   │    │     │
│  │  │ • create_user       │    │           │  │ • create_order      │    │     │
│  │  │ • update_user       │    │           │  │ • update_order      │    │     │
│  │  │ • delete_user       │    │           │  │ • delete_order      │    │     │
│  │  └─────────────────────┘    │           │  └─────────────────────┘    │     │
│  │  ┌─────────────────────┐    │           │  ┌─────────────────────┐    │     │
│  │  │ Business Logic      │    │           │  │ Business Logic      │    │     │
│  │  │ • User validation   │    │           │  │ • Order validation  │    │     │
│  │  │ • Data processing   │    │           │  │ • Data processing   │    │     │
│  │  │ • Error handling    │    │           │  │ • Error handling    │    │     │
│  │  └─────────────────────┘    │           │  └─────────────────────┘    │     │
│  └─────────────────────────────┘           └─────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼ Database Queries
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              DATA LAYER                                        │
│                                                                                 │
│  ┌─────────────────────────────┐           ┌─────────────────────────────┐     │
│  │      POSTGRESQL             │           │        REDIS                │     │
│  │      (Port 5433)            │           │      (Port 6380)            │     │
│  │  ┌─────────────────────┐    │           │  ┌─────────────────────┐    │     │
│  │  │ Tables:             │    │           │  │ Cache Storage:      │    │     │
│  │  │ • users             │    │           │  │ • Session data      │    │     │
│  │  │ • orders            │    │           │  │ • JWT tokens        │    │     │
│  │  │ • relationships     │    │           │  │ • Rate limit data   │    │     │
│  │  └─────────────────────┘    │           │  │ • Temporary data    │    │     │
│  │  ┌─────────────────────┐    │           │  └─────────────────────┘    │     │
│  │  │ Features:           │    │           │                             │     │
│  │  │ • ACID compliance   │    │           │                             │     │
│  │  │ • Transactions      │    │           │                             │     │
│  │  │ • Constraints       │    │           │                             │     │
│  │  │ • Indexes           │    │           │                             │     │
│  │  └─────────────────────┘    │           │                             │     │
│  └─────────────────────────────┘           └─────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Flow Diagram

```
┌─────────────┐                    ┌─────────────┐                    ┌─────────────┐
│   CLIENT    │                    │ API GATEWAY │                    │  DATABASE   │
└─────────────┘                    └─────────────┘                    └─────────────┘
       │                                  │                                  │
       │ 1. POST /auth/register           │                                  │
       │ {name, email, password}          │                                  │
       ├─────────────────────────────────►│                                  │
       │                                  │ 2. Validate input               │
       │                                  │    (DTO validation)              │
       │                                  │                                  │
       │                                  │ 3. Hash password                 │
       │                                  │    (bcrypt, 12 rounds)           │
       │                                  │                                  │
       │                                  │ 4. Check email exists            │
       │                                  ├─────────────────────────────────►│
       │                                  │                                  │
       │                                  │ 5. Create user record            │
       │                                  ├─────────────────────────────────►│
       │                                  │                                  │
       │                                  │ 6. User created                  │
       │                                  │◄─────────────────────────────────┤
       │                                  │                                  │
       │                                  │ 7. Generate JWT token            │
       │                                  │    {sub, email, name, exp}       │
       │                                  │                                  │
       │ 8. Return token & user data      │                                  │
       │◄─────────────────────────────────┤                                  │
       │ {access_token, user, expires_in} │                                  │
       │                                  │                                  │
       │                                  │                                  │
       │ 9. POST /auth/login              │                                  │
       │ {email, password}                │                                  │
       ├─────────────────────────────────►│                                  │
       │                                  │ 10. Find user by email           │
       │                                  ├─────────────────────────────────►│
       │                                  │                                  │
       │                                  │ 11. User data                    │
       │                                  │◄─────────────────────────────────┤
       │                                  │                                  │
       │                                  │ 12. Compare passwords            │
       │                                  │     (bcrypt.compare)             │
       │                                  │                                  │
       │                                  │ 13. Generate JWT token           │
       │                                  │     {sub, email, name, exp}      │
       │                                  │                                  │
       │ 14. Return token & user data     │                                  │
       │◄─────────────────────────────────┤                                  │
       │ {access_token, user, expires_in} │                                  │
```

## 🛡️ Protected Request Flow

```
┌─────────────┐                    ┌─────────────┐                    ┌─────────────┐
│   CLIENT    │                    │ API GATEWAY │                    │MICROSERVICE │
└─────────────┘                    └─────────────┘                    └─────────────┘
       │                                  │                                  │
       │ 1. GET /users                    │                                  │
       │ Authorization: Bearer <token>    │                                  │
       ├─────────────────────────────────►│                                  │
       │                                  │ 2. Rate Limiting Check           │
       │                                  │    (3 req/sec, 100 req/min)     │
       │                                  │                                  │
       │                                  │ 3. Input Sanitization            │
       │                                  │    (XSS, SQL injection)          │
       │                                  │                                  │
       │                                  │ 4. JWT Auth Guard                │
       │                                  │    • Extract Bearer token        │
       │                                  │    • Verify signature            │
       │                                  │    • Check expiration            │
       │                                  │    • Decode payload              │
       │                                  │                                  │
       │                                  │ 5. @CurrentUser decorator        │
       │                                  │    • Inject user into request    │
       │                                  │                                  │
       │                                  │ 6. Route to controller           │
       │                                  │    UserController.getUsers()     │
       │                                  │                                  │
       │                                  │ 7. TCP message to service        │
       │                                  │    pattern: 'get_users'          │
       │                                  ├─────────────────────────────────►│
       │                                  │                                  │
       │                                  │ 8. Process request               │
       │                                  │                                  │ ┌─────────────┐
       │                                  │                                  │ │  DATABASE   │
       │                                  │                                  ├►└─────────────┘
       │                                  │                                  │
       │                                  │ 9. Return users data             │
       │                                  │◄─────────────────────────────────┤
       │                                  │                                  │
       │                                  │ 10. Security Interceptor         │
       │                                  │     • Add security headers       │
       │                                  │     • Sanitize response          │
       │                                  │                                  │
       │ 11. Return response              │                                  │
       │◄─────────────────────────────────┤                                  │
       │ {users: [...], status: 200}     │                                  │
```

## 🔄 Order Creation Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   CLIENT    │    │ API GATEWAY │    │ORDER SERVICE│    │USER SERVICE │    │  DATABASE   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │                  │                  │
       │ 1. POST /orders  │                  │                  │                  │
       │ + JWT token      │                  │                  │                  │
       │ {product, amount}│                  │                  │                  │
       ├─────────────────►│                  │                  │                  │
       │                  │ 2. Authenticate  │                  │                  │
       │                  │    & authorize   │                  │                  │
       │                  │                  │                  │                  │
       │                  │ 3. Validate DTO  │                  │                  │
       │                  │    (product,     │                  │                  │
       │                  │     amount)      │                  │                  │
       │                  │                  │                  │                  │
       │                  │ 4. TCP: create_order               │                  │
       │                  │    {userId, product, amount}       │                  │
       │                  ├─────────────────►│                  │                  │
       │                  │                  │ 5. Validate user │                  │
       │                  │                  │    exists        │                  │
       │                  │                  ├─────────────────►│                  │
       │                  │                  │                  │ 6. Check user    │
       │                  │                  │                  ├─────────────────►│
       │                  │                  │                  │                  │
       │                  │                  │                  │ 7. User exists   │
       │                  │                  │                  │◄─────────────────┤
       │                  │                  │ 8. User valid    │                  │
       │                  │                  │◄─────────────────┤                  │
       │                  │                  │                  │                  │
       │                  │                  │ 9. Create order  │                  │
       │                  │                  │    record        │                  │
       │                  │                  ├─────────────────────────────────────►│
       │                  │                  │                  │                  │
       │                  │                  │ 10. Order created│                  │
       │                  │                  │◄─────────────────────────────────────┤
       │                  │                  │                  │                  │
       │                  │ 11. Return order │                  │                  │
       │                  │     data         │                  │                  │
       │                  │◄─────────────────┤                  │                  │
       │                  │                  │                  │                  │
       │ 12. Order created│                  │                  │                  │
       │◄─────────────────┤                  │                  │                  │
       │ {id, product,    │                  │                  │                  │
       │  amount, userId, │                  │                  │                  │
       │  createdAt}      │                  │                  │                  │
```

## 🚨 Error Handling Flow

```
┌─────────────┐                    ┌─────────────┐                    ┌─────────────┐
│   CLIENT    │                    │ API GATEWAY │                    │MICROSERVICE │
└─────────────┘                    └─────────────┘                    └─────────────┘
       │                                  │                                  │
       │ 1. Invalid request               │                                  │
       │ (missing token, bad data)        │                                  │
       ├─────────────────────────────────►│                                  │
       │                                  │ 2. Validation fails              │
       │                                  │    • DTO validation              │
       │                                  │    • JWT validation              │
       │                                  │    • Rate limit exceeded         │
       │                                  │                                  │
       │                                  │ 3. AllExceptionFilter            │
       │                                  │    • Catch all exceptions        │
       │                                  │    • Format error response       │
       │                                  │    • Log error details           │
       │                                  │                                  │
       │                                  │ 4. Security headers              │
       │                                  │    • Remove sensitive data       │
       │                                  │    • Add security headers        │
       │                                  │                                  │
       │ 5. Standardized error response   │                                  │
       │◄─────────────────────────────────┤                                  │
       │ {                                │                                  │
       │   statusCode: 400,               │                                  │
       │   message: "Validation failed",  │                                  │
       │   error: "Bad Request",          │                                  │
       │   timestamp: "2025-07-21..."     │                                  │
       │ }                                │                                  │
       │                                  │                                  │
       │                                  │ 6. Service error                 │
       │                                  ├─────────────────────────────────►│
       │                                  │                                  │
       │                                  │ 7. Database error                │
       │                                  │    • Connection failed           │
       │                                  │    • Query error                 │
       │                                  │    • Constraint violation        │
       │                                  │◄─────────────────────────────────┤
       │                                  │                                  │
       │                                  │ 8. Transform to HTTP error       │
       │                                  │    • Map to appropriate status   │
       │                                  │    • Sanitize error message      │
       │                                  │                                  │
       │ 9. Error response                │                                  │
       │◄─────────────────────────────────┤                                  │
       │ {                                │                                  │
       │   statusCode: 500,               │                                  │
       │   message: "Internal server...", │                                  │
       │   error: "Internal Server Error" │                                  │
       │ }                                │                                  │
```

## 🔄 Data Flow Summary

### 1. **Request Processing Pipeline**
```
Client Request → Rate Limiting → CORS → Input Sanitization → JWT Auth → Controller → Service → Database
```

### 2. **Response Processing Pipeline**
```
Database → Service → Controller → Security Interceptor → Exception Filter → Client Response
```

### 3. **Authentication Pipeline**
```
Bearer Token → JWT Strategy → Token Validation → User Extraction → Request Context
```

### 4. **Inter-Service Communication**
```
API Gateway → TCP Message → Microservice → Database Query → Response → TCP Response → HTTP Response
```

## 🛠️ Key Components Interaction

### **Security Layer Components**
- **Rate Limiting Guard**: Prevents abuse (3 req/sec, 100 req/min)
- **CORS Handler**: Manages cross-origin requests
- **Input Sanitization**: Prevents XSS and injection attacks
- **JWT Auth Guard**: Validates authentication tokens
- **Exception Filter**: Standardizes error responses

### **Authentication Components**
- **JWT Strategy**: Passport.js strategy for token validation
- **Auth Service**: Handles login, registration, token generation
- **Password Util**: Bcrypt hashing and validation
- **User Decorators**: @CurrentUser, @Public for easy access

### **Communication Components**
- **TCP Transport**: Inter-service communication
- **Message Patterns**: Structured service calls
- **DTO Validation**: Input/output data validation
- **Error Propagation**: Consistent error handling across services

### **Data Components**
- **Sequelize ORM**: Database abstraction layer
- **Entity Models**: User and Order data models
- **Database Module**: Centralized database configuration
- **Redis Cache**: Session and temporary data storage

## 📊 Performance Considerations

### **Request Flow Optimization**
1. **Rate limiting** prevents system overload
2. **JWT validation** is stateless and fast
3. **TCP communication** is efficient for inter-service calls
4. **Database indexing** on user emails and order IDs
5. **Redis caching** for frequently accessed data

### **Security Measures**
1. **Input sanitization** prevents malicious data
2. **JWT tokens** expire after 24 hours
3. **Password hashing** uses 12 salt rounds
4. **HTTPS enforcement** in production
5. **Security headers** added to all responses

---

**Diagram Version:** 1.0.0  
**Last Updated:** 2025-07-21  
**Architecture:** NestJS Microservices with JWT Authentication