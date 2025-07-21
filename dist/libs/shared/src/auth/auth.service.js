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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("../entities/user.entity");
const password_util_1 = require("./utils/password.util");
const response_dto_1 = require("../dto/response.dto");
let AuthService = AuthService_1 = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async register(registerDto) {
        try {
            const { name, email, password } = registerDto;
            this.logger.log(`Attempting to register user with email: ${email}`);
            const existingUser = await this.userModel.findOne({ where: { email } });
            if (existingUser) {
                this.logger.warn(`Registration failed: User with email ${email} already exists`);
                response_dto_1.ResponseHandler.sendBadRequest('User with this email already exists');
            }
            const passwordValidation = password_util_1.PasswordUtil.validatePasswordStrength(password);
            if (!passwordValidation.isValid) {
                this.logger.warn(`Registration failed: Password validation failed for ${email}`);
                response_dto_1.ResponseHandler.sendValidationError(passwordValidation.errors.join(', '));
            }
            const hashedPassword = await password_util_1.PasswordUtil.hashPassword(password);
            const user = await this.userModel.create({
                name,
                email,
                password: hashedPassword,
            });
            const payload = {
                sub: user.id,
                email: user.email,
                name: user.name,
            };
            const access_token = this.jwtService.sign(payload);
            this.logger.log(`User registered successfully: ${email}`);
            return {
                access_token,
                token_type: 'Bearer',
                expires_in: 86400,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            };
        }
        catch (error) {
            this.logger.error(`Registration error for ${registerDto.email}: ${error.message}`, error.stack);
            throw error;
        }
    }
    async login(loginDto) {
        try {
            const { email, password } = loginDto;
            this.logger.log(`Login attempt for email: ${email}`);
            const user = await this.userModel.findOne({ where: { email } });
            if (!user) {
                this.logger.warn(`Login failed: User not found for email ${email}`);
                response_dto_1.ResponseHandler.sendUnAuthorised('Invalid credentials');
            }
            const isPasswordValid = await password_util_1.PasswordUtil.comparePassword(password, user.password);
            if (!isPasswordValid) {
                this.logger.warn(`Login failed: Invalid password for email ${email}`);
                response_dto_1.ResponseHandler.sendUnAuthorised('Invalid credentials');
            }
            const payload = {
                sub: user.id,
                email: user.email,
                name: user.name,
            };
            const access_token = this.jwtService.sign(payload);
            this.logger.log(`User logged in successfully: ${email}`);
            return {
                access_token,
                token_type: 'Bearer',
                expires_in: 86400,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            };
        }
        catch (error) {
            this.logger.error(`Login error for ${loginDto.email}: ${error.message}`, error.stack);
            throw error;
        }
    }
    async validateUser(userId) {
        try {
            return await this.userModel.findByPk(userId, {
                attributes: { exclude: ['password'] },
            });
        }
        catch (error) {
            this.logger.error(`Error validating user ${userId}: ${error.message}`, error.stack);
            return null;
        }
    }
    async getProfile(userId) {
        try {
            const user = await this.userModel.findByPk(userId, {
                attributes: { exclude: ['password'] },
            });
            if (!user) {
                this.logger.warn(`Profile request failed: User not found for ID ${userId}`);
                response_dto_1.ResponseHandler.sendNotFound('User not found');
            }
            return user;
        }
        catch (error) {
            this.logger.error(`Error getting profile for user ${userId}: ${error.message}`, error.stack);
            throw error;
        }
    }
    async verifyToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (error) {
            this.logger.error(`Token verification failed: ${error.message}`, error.stack);
            throw error;
        }
    }
    generateToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };
        return this.jwtService.sign(payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map