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
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shared_1 = require("../../../../libs/shared/src");
let AuthController = AuthController_1 = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    async register(registerDto, res) {
        try {
            this.logger.log(`User registration attempt for email: ${registerDto.email}`);
            const result = await this.authService.register(registerDto);
            this.logger.log(`User registered successfully: ${registerDto.email}`);
            return shared_1.ResponseHandler.sendCreated('User registered successfully', result, res);
        }
        catch (error) {
            this.logger.error(`Registration failed for ${registerDto.email}: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async login(loginDto, res) {
        try {
            this.logger.log(`User login attempt for email: ${loginDto.email}`);
            const result = await this.authService.login(loginDto);
            this.logger.log(`User logged in successfully: ${loginDto.email}`);
            return shared_1.ResponseHandler.sendSuccess('User logged in successfully', result, res);
        }
        catch (error) {
            this.logger.error(`Login failed for ${loginDto.email}: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async getProfile(user, res) {
        try {
            this.logger.log(`Profile request for user ID: ${user.userId}`);
            const result = await this.authService.getProfile(user.userId);
            this.logger.log(`Profile retrieved successfully for user ID: ${user.userId}`);
            return shared_1.ResponseHandler.sendSuccess('Profile retrieved successfully', result, res);
        }
        catch (error) {
            this.logger.error(`Profile retrieval failed for user ID ${user.userId}: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async verifyToken(user, res) {
        try {
            this.logger.log(`Token verification for user ID: ${user.userId}`);
            const result = {
                valid: true,
                user,
            };
            return shared_1.ResponseHandler.sendSuccess('Token is valid', result, res);
        }
        catch (error) {
            this.logger.error(`Token verification failed: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, shared_1.Public)(),
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Register a new user',
        description: 'Create a new user account with email and password',
    }),
    (0, swagger_1.ApiBody)({ type: shared_1.RegisterDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User successfully registered',
        type: shared_1.AuthResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - validation errors or user already exists',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: {
                    type: 'array',
                    items: { type: 'string' },
                    example: ['Email already exists'],
                },
                error: { type: 'string', example: 'Bad Request' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, shared_1.Public)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Login user',
        description: 'Authenticate user with email and password',
    }),
    (0, swagger_1.ApiBody)({ type: shared_1.LoginDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User successfully authenticated',
        type: shared_1.AuthResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - invalid credentials',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 401 },
                message: { type: 'string', example: 'Invalid credentials' },
                error: { type: 'string', example: 'Unauthorized' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get user profile',
        description: 'Get the authenticated user profile information',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile retrieved successfully',
        type: shared_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - invalid or missing token',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 401 },
                message: { type: 'string', example: 'Unauthorized' },
                error: { type: 'string', example: 'Unauthorized' },
            },
        },
    }),
    __param(0, (0, shared_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Verify JWT token',
        description: 'Verify if the provided JWT token is valid',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Token is valid',
        schema: {
            type: 'object',
            properties: {
                valid: { type: 'boolean', example: true },
                user: {
                    type: 'object',
                    properties: {
                        userId: { type: 'number', example: 1 },
                        email: { type: 'string', example: 'john@example.com' },
                        name: { type: 'string', example: 'John Doe' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Token is invalid',
    }),
    __param(0, (0, shared_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
exports.AuthController = AuthController = AuthController_1 = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [shared_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map