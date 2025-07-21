"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('NestJS Microservices API')
        .setDescription(`
      A comprehensive microservices architecture built with NestJS, featuring:
      
      ## Architecture
      - **API Gateway**: Central entry point for all client requests
      - **User Service**: Manages user registration, authentication, and profiles
      - **Order Service**: Handles order creation, management, and tracking
      - **Shared Database**: PostgreSQL database shared across all services
      
      ## Features
      - RESTful API design
      - JWT Authentication and Authorization
      - Input validation and sanitization
      - Comprehensive error handling
      - Database relationships and constraints
      - Microservice communication via TCP
      
      ## Authentication
      1. Register a new account using POST /auth/register
      2. Login with your credentials using POST /auth/login
      3. Use the returned JWT token in the Authorization header: Bearer <token>
      4. Access protected endpoints with your token
      
      ## Getting Started
      1. Register/Login to get a JWT token
      2. Use the token to access protected endpoints
      3. Create orders and manage your data
      
      ## Error Handling
      All endpoints return consistent error responses with appropriate HTTP status codes:
      - **400**: Bad Request (validation errors)
      - **401**: Unauthorized (authentication required)
      - **403**: Forbidden (insufficient permissions)
      - **404**: Not Found (resource doesn't exist)
      - **500**: Internal Server Error (system errors)
    `)
        .setVersion('1.0.0')
        .setContact('API Support', 'https://github.com/your-repo/nestjs-microservices', 'support@example.com')
        .setLicense('MIT', 'https://opensource.org/licenses/MIT')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .addTag('Authentication', 'User authentication and authorization')
        .addTag('Health', 'System health and status endpoints')
        .addTag('Users', 'User management operations')
        .addTag('Orders', 'Order management operations')
        .addServer('http://localhost:3000', 'Development server')
        .addServer('https://api.example.com', 'Production server')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            displayRequestDuration: true,
            docExpansion: 'none',
            filter: true,
            showRequestHeaders: true,
            tryItOutEnabled: true,
        },
        customSiteTitle: 'NestJS Microservices API Documentation',
        customfavIcon: '/favicon.ico',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
        ],
        customCssUrl: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        ],
    });
    const port = process.env.API_GATEWAY_PORT || 3000;
    await app.listen(port);
    console.log(`🚀 API Gateway running on port ${port}`);
    console.log(`📚 Swagger documentation available at http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map