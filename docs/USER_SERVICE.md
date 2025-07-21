# 👥 User Service Documentation

## 📋 Overview

The User Service is a TCP-based microservice responsible for managing user data and operations. It handles user creation, retrieval, updates, and deletion while maintaining data integrity and business rules.

## 🎯 Purpose

- **User Management:** Complete CRUD operations for users
- **Data Validation:** Ensure user data integrity and uniqueness
- **Business Logic:** Implement user-related business rules
- **Database Operations:** Direct interaction with PostgreSQL
- **Message Handling:** Process TCP messages from API Gateway

## 🏗️ Architecture

```
┌─────────────────┐
│   API Gateway   │
│   HTTP Requests │
└─────────────────┘
         │ TCP Messages
         ▼
┌─────────────────┐
│  User Service   │
│   Port: 3001    │
│ TCP Microservice│
└─────────────────┘
         │ SQL Queries
         ▼
┌─────────────────┐
│   PostgreSQL    │
│  Users Table    │
└─────────────────┘
```

## 📁 File Structure

```
apps/user-service/
├── src/
│   ├── app.module.ts         # Service module configuration
│   ├── main.ts              # TCP microservice entry point
│   ├── user.controller.ts    # Message pattern handlers
│   └── user.service.ts      # Business logic implementation
├── Dockerfile               # Docker configuration
└── tsconfig.app.json        # TypeScript configuration
```

## 🔧 Configuration

### **Environment Variables**
```env
# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=trd123
DB_NAME=microservices_db

# Service Configuration
USER_SERVICE_PORT=3001
NODE_ENV=production
```

### **Module Configuration**
```typescript
// app.module.ts
@Module({
  imports: [
    DatabaseModule,           // Shared database configuration
    SequelizeModule.forFeature([User]), // User entity registration
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
```

## 📡 Message Patterns

The User Service handles the following TCP message patterns:

| Pattern | Purpose | Input | Output |
|---------|---------|-------|--------|
| `create_user` | Create new user | CreateUserDto | User entity |
| `get_users` | Get all users | Empty object | User array |
| `get_user` | Get user by ID | `{ id: number }` | User entity |
| `update_user` | Update user | `{ id: number, ...UpdateUserDto }` | Updated user |
| `delete_user` | Delete user | `{ id: number }` | Deletion result |

## 🎮 Controller Implementation

### **Message Pattern Handlers**
```typescript
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  createUser(data: CreateUserDto) {
    return this.userService.create(data);
  }

  @MessagePattern({ cmd: 'get_users' })
  getUsers() {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'get_user' })
  getUser(data: { id: number }) {
    return this.userService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'update_user' })
  updateUser(data: { id: number } & UpdateUserDto) {
    const { id, ...updateData } = data;
    return this.userService.update(id, updateData);
  }

  @MessagePattern({ cmd: 'delete_user' })
  deleteUser(data: { id: number }) {
    return this.userService.remove(data.id);
  }
}
```

## 🏢 Service Implementation

### **Business Logic**
```typescript
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userEntity: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userEntity.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userEntity.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userEntity.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<[number, User[]]> {
    return this.userEntity.update(updateUserDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.userEntity.destroy({
      where: { id },
    });
  }
}
```

## 🗃️ Database Schema

### **User Entity**
```typescript
@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @HasMany(() => Order)
  orders: Order[];
}
```

### **Database Table Structure**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);
```

## 📝 Data Transfer Objects

### **CreateUserDto**
```typescript
export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    minLength: 2,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
```

### **UpdateUserDto**
```typescript
export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'The name of the user',
    example: 'John Smith',
    minLength: 2,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({
    description: 'The email address of the user',
    example: 'john.smith@example.com',
    format: 'email',
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
```

## 🔒 Business Rules

### **User Creation**
- Name must be at least 2 characters long
- Email must be valid format
- Email must be unique across all users
- Both name and email are required

### **User Updates**
- Partial updates supported
- Email uniqueness validation
- At least one field must be provided
- User must exist to be updated

### **User Deletion**
- Cascade deletion of related orders
- Soft delete not implemented (permanent deletion)
- User must exist to be deleted

## 🔍 Error Handling

### **Common Errors**
```typescript
// Validation errors
{
  statusCode: 400,
  message: ['name should not be empty', 'email must be an email'],
  error: 'Bad Request'
}

// Unique constraint violation
{
  statusCode: 409,
  message: 'Email already exists',
  error: 'Conflict'
}

// User not found
{
  statusCode: 404,
  message: 'User not found',
  error: 'Not Found'
}
```

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
COPY apps/user-service/ ./apps/user-service/
RUN npm run build shared
RUN npm run build user-service
EXPOSE 3001
CMD ["node", "dist/apps/user-service/apps/user-service/src/main.js"]
```

### **Docker Compose Configuration**
```yaml
user-service:
  build:
    context: .
    dockerfile: apps/user-service/Dockerfile
  container_name: user-service
  environment:
    - DB_HOST=postgres
    - DB_PORT=5432
    - DB_USERNAME=postgres
    - DB_PASSWORD=trd123
    - DB_NAME=microservices_db
  ports:
    - "3001:3001"
  depends_on:
    postgres:
      condition: service_healthy
```

## 🚀 Development

### **Local Development**
```bash
# Start database
docker compose -f docker-compose.dev.yml up -d

# Start user service
npm run start:dev user-service
```

### **Testing via API Gateway**
```bash
# Create user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'

# Get all users
curl http://localhost:3000/users

# Get specific user
curl http://localhost:3000/users/1

# Update user
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith"}'

# Delete user
curl -X DELETE http://localhost:3000/users/1
```

## 📊 Monitoring

### **Health Monitoring**
- Database connection status
- Service availability
- Memory usage tracking
- Error rate monitoring

### **Logging**
```typescript
// Service logs
console.log('User Service is listening on port 3001');

// Database operations
console.log(`Created user: ${user.id}`);
console.log(`Updated user: ${id}`);
console.log(`Deleted user: ${id}`);
```

## 🔧 Maintenance

### **Database Migrations**
- Sequelize handles schema synchronization
- Auto-creation of tables on startup
- Index management for performance

### **Performance Optimization**
- Database query optimization
- Connection pooling
- Caching strategies
- Bulk operations for large datasets

## 🚨 Troubleshooting

### **Common Issues**

1. **Database Connection Failed**
   ```bash
   # Check database status
   docker compose ps postgres
   
   # Check connection
   docker compose logs user-service
   ```

2. **TCP Connection Issues**
   ```bash
   # Verify service is listening
   docker exec user-service netstat -tlnp
   
   # Check API Gateway connectivity
   docker compose logs api-gateway
   ```

3. **Validation Errors**
   - Verify DTO definitions
   - Check input data format
   - Review validation decorators

### **Debug Commands**
```bash
# Service logs
docker compose logs user-service -f

# Database logs
docker compose logs postgres

# Execute SQL queries
docker exec -it microservices-postgres psql -U postgres -d microservices_db
```

## 📈 Performance Metrics

### **Key Metrics**
- Request processing time
- Database query performance
- Memory usage
- Error rates
- Throughput (requests/second)

### **Optimization Strategies**
- Database indexing
- Query optimization
- Connection pooling
- Caching implementation
- Bulk operations

## 🔄 Future Enhancements

### **Planned Features**
- User authentication
- Role-based permissions
- User profile management
- Email verification
- Password management
- User activity logging

### **Scalability Improvements**
- Read replicas for database
- Horizontal service scaling
- Caching layer implementation
- Event-driven architecture

---

## 📚 Related Documentation

- [Project Structure](../PROJECT_STRUCTURE.md)
- [API Gateway Documentation](API_GATEWAY.md)
- [Order Service Documentation](ORDER_SERVICE.md)
- [Database Schema](../database-schema.md)

---

**Service Type:** TCP Microservice  
**Port:** 3001  
**Database:** PostgreSQL (users table)  
**Dependencies:** Shared Database Module  
**Last Updated:** 2025-07-18