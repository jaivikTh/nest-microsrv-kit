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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const shared_1 = require("../../../libs/shared/src");
let UserService = UserService_1 = class UserService {
    constructor(userEntity) {
        this.userEntity = userEntity;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async create(createUserDto) {
        try {
            this.logger.log(`Creating user with email: ${createUserDto.email}`);
            const existingUser = await this.userEntity.findOne({
                where: { email: createUserDto.email }
            });
            if (existingUser) {
                this.logger.warn(`User creation failed: Email ${createUserDto.email} already exists`);
                shared_1.ResponseHandler.sendBadRequest('User with this email already exists');
            }
            const user = await this.userEntity.create(createUserDto);
            this.logger.log(`User created successfully: ${createUserDto.email}`);
            return user;
        }
        catch (error) {
            this.logger.error(`Failed to create user: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findAll() {
        try {
            this.logger.log('Fetching all users');
            const users = await this.userEntity.findAll();
            this.logger.log(`Retrieved ${users.length} users`);
            return users;
        }
        catch (error) {
            this.logger.error(`Failed to fetch users: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findOne(id) {
        try {
            this.logger.log(`Fetching user with ID: ${id}`);
            const user = await this.userEntity.findByPk(id);
            if (!user) {
                this.logger.warn(`User not found with ID: ${id}`);
                shared_1.ResponseHandler.sendNotFound('User not found');
            }
            this.logger.log(`User retrieved successfully: ${id}`);
            return user;
        }
        catch (error) {
            this.logger.error(`Failed to fetch user ${id}: ${error.message}`, error.stack);
            throw error;
        }
    }
    async update(id, updateUserDto) {
        try {
            this.logger.log(`Updating user with ID: ${id}`);
            const existingUser = await this.userEntity.findByPk(id);
            if (!existingUser) {
                this.logger.warn(`Update failed: User not found with ID: ${id}`);
                shared_1.ResponseHandler.sendNotFound('User not found');
            }
            if (updateUserDto.email) {
                const emailExists = await this.userEntity.findOne({
                    where: { email: updateUserDto.email }
                });
                if (emailExists && emailExists.id !== id) {
                    this.logger.warn(`Update failed: Email ${updateUserDto.email} already exists`);
                    shared_1.ResponseHandler.sendBadRequest('Email already exists');
                }
            }
            const result = await this.userEntity.update(updateUserDto, {
                where: { id },
                returning: true,
            });
            this.logger.log(`User updated successfully: ${id}`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to update user ${id}: ${error.message}`, error.stack);
            throw error;
        }
    }
    async remove(id) {
        try {
            this.logger.log(`Deleting user with ID: ${id}`);
            const existingUser = await this.userEntity.findByPk(id);
            if (!existingUser) {
                this.logger.warn(`Delete failed: User not found with ID: ${id}`);
                shared_1.ResponseHandler.sendNotFound('User not found');
            }
            const deletedCount = await this.userEntity.destroy({
                where: { id },
            });
            this.logger.log(`User deleted successfully: ${id}`);
            return deletedCount;
        }
        catch (error) {
            this.logger.error(`Failed to delete user ${id}: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(shared_1.User)),
    __metadata("design:paramtypes", [Object])
], UserService);
//# sourceMappingURL=user.service.js.map