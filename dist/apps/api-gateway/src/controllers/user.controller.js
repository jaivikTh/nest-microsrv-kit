"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const shared_1 = require("../../../../libs/shared/src");
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async createUser(createUserDto, res) {
        try {
            this.logger.log(`Creating user with email: ${createUserDto.email}`);
            const result = await this.userService.send({ cmd: 'create_user' }, createUserDto).toPromise();
            this.logger.log(`User created successfully: ${createUserDto.email}`);
            return shared_1.ResponseHandler.sendCreated('User created successfully', result, res);
        }
        catch (error) {
            this.logger.error(`Failed to create user: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async getUsers(res) {
        try {
            this.logger.log('Fetching all users');
            const result = await this.userService.send({ cmd: 'get_users' }, {}).toPromise();
            this.logger.log(`Retrieved ${result?.length || 0} users`);
            return shared_1.ResponseHandler.sendSuccess('Users retrieved successfully', result, res);
        }
        catch (error) {
            this.logger.error(`Failed to get users: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async getUser(id, res) {
        try {
            this.logger.log(`Fetching user with ID: ${id}`);
            const result = await this.userService.send({ cmd: 'get_user' }, { id }).toPromise();
            this.logger.log(`User retrieved successfully: ${id}`);
            return shared_1.ResponseHandler.sendSuccess('User retrieved successfully', result, res);
        }
        catch (error) {
            this.logger.error(`Failed to get user ${id}: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async updateUser(id, updateUserDto, res) {
        try {
            this.logger.log(`Updating user with ID: ${id}`);
            const result = await this.userService.send({ cmd: 'update_user' }, { id, ...updateUserDto }).toPromise();
            this.logger.log(`User updated successfully: ${id}`);
            return shared_1.ResponseHandler.sendSuccess('User updated successfully', result, res);
        }
        catch (error) {
            this.logger.error(`Failed to update user ${id}: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async deleteUser(id, res) {
        try {
            this.logger.log(`Deleting user with ID: ${id}`);
            const result = await this.userService.send({ cmd: 'delete_user' }, { id }).toPromise();
            this.logger.log(`User deleted successfully: ${id}`);
            return shared_1.ResponseHandler.sendSuccess('User deleted successfully', result, res);
        }
        catch (error) {
            this.logger.error(`Failed to delete user ${id}: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new user',
        description: 'Creates a new user with the provided name and email address. The email must be unique across all users.',
    }),
    (0, swagger_1.ApiBody)({
        type: shared_1.CreateUserDto,
        description: 'User data for creation',
        examples: {
            example1: {
                summary: 'Basic user creation',
                description: 'Example of creating a new user',
                value: {
                    name: 'John Doe',
                    email: 'john.doe@example.com'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'User successfully created',
        type: shared_1.UserResponseDto,
        example: {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            createdAt: '2025-07-18T07:53:59.561Z',
            updatedAt: '2025-07-18T07:53:59.561Z'
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input data or validation failed',
        example: {
            statusCode: 400,
            message: ['name should not be empty', 'email must be an email'],
            error: 'Bad Request'
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'Email already exists',
        example: {
            statusCode: 409,
            message: 'Email already exists',
            error: 'Conflict'
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
        example: {
            statusCode: 500,
            message: 'Internal server error',
            error: 'Internal Server Error'
        }
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all users',
        description: 'Retrieves a list of all users in the system. Returns an empty array if no users exist.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'List of users retrieved successfully',
        type: [shared_1.UserResponseDto],
        example: [
            {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                createdAt: '2025-07-18T07:53:59.561Z',
                updatedAt: '2025-07-18T07:53:59.561Z'
            }
        ]
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get user by ID',
        description: 'Retrieves a specific user by their unique identifier.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The unique identifier of the user',
        example: 1,
        type: 'integer',
        schema: { minimum: 1 }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User retrieved successfully',
        type: shared_1.UserResponseDto,
        example: {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            createdAt: '2025-07-18T07:53:59.561Z',
            updatedAt: '2025-07-18T07:53:59.561Z'
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid user ID format',
        example: {
            statusCode: 400,
            message: 'Validation failed (numeric string is expected)',
            error: 'Bad Request'
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'User not found',
        example: {
            statusCode: 404,
            message: 'User not found',
            error: 'Not Found'
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update user by ID',
        description: 'Updates an existing user with the provided data. Only provided fields will be updated.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The unique identifier of the user to update',
        example: 1,
        type: 'integer',
        schema: { minimum: 1 }
    }),
    (0, swagger_1.ApiBody)({
        type: shared_1.UpdateUserDto,
        description: 'User data for update (partial)',
        examples: {
            updateName: {
                summary: 'Update only name',
                value: { name: 'John Smith' }
            },
            updateEmail: {
                summary: 'Update only email',
                value: { email: 'john.smith@newemail.com' }
            },
            updateBoth: {
                summary: 'Update both fields',
                value: { name: 'John Smith', email: 'john.smith@newemail.com' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User updated successfully',
        type: shared_1.UserResponseDto,
        example: {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@newemail.com',
            createdAt: '2025-07-18T07:53:59.561Z',
            updatedAt: '2025-07-18T09:30:15.789Z'
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input data or user ID format',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'User not found',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'Email already exists',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, shared_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete user by ID',
        description: 'Permanently deletes a user from the system. This action cannot be undone. All associated orders will also be deleted.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The unique identifier of the user to delete',
        example: 1,
        type: 'integer',
        schema: { minimum: 1 }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User deleted successfully',
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'User deleted successfully',
                },
                deletedCount: {
                    type: 'number',
                    example: 1,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid user ID format',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'User not found',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('users'),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], UserController);
//# sourceMappingURL=user.controller.js.map