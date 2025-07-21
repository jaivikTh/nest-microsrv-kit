# NestJS Microservices API Documentation

## 🚀 Quick Import to Apidog

### Method 1: Import OpenAPI JSON
1. Download the `swagger-spec.json` file from this repository
2. Open Apidog
3. Go to **Import** → **OpenAPI/Swagger**
4. Upload the `swagger-spec.json` file

### Method 2: Use Raw GitHub URL
Import directly from GitHub using this URL:
```
https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/swagger-spec.json
```

## 📋 API Overview

### Base URL
- **Development:** `http://localhost:3000`
- **Production:** `https://api.example.com`

### Available Endpoints

#### 🏥 Health
- `GET /health` - Service health check

#### 👥 Users
- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/{id}` - Get user by ID
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

#### 📦 Orders
- `POST /orders` - Create a new order
- `GET /orders` - Get all orders
- `GET /orders/{id}` - Get order by ID
- `GET /orders/user/{userId}` - Get orders by user
- `PUT /orders/{id}` - Update order
- `DELETE /orders/{id}` - Delete order

## 🔧 Authentication
Currently, no authentication is required for this API.

## 📝 Error Responses
All endpoints return consistent error responses:
- **400** - Bad Request (validation errors)
- **404** - Not Found
- **409** - Conflict (e.g., email already exists)
- **500** - Internal Server Error

## 🌐 Live Documentation
When running locally, access the interactive Swagger UI at:
```
http://localhost:3000/api/docs
```