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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const user_service_1 = require("./user.service");
const shared_1 = require("../../../libs/shared/src");
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async createUser(data) {
        try {
            this.logger.log(`Received create user request: ${data.email}`);
            const result = await this.userService.create(data);
            this.logger.log(`User created successfully: ${data.email}`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to create user: ${error.message}`, error.stack);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async getUsers() {
        try {
            this.logger.log('Received get users request');
            const result = await this.userService.findAll();
            this.logger.log(`Retrieved ${result?.length || 0} users`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to get users: ${error.message}`, error.stack);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async getUser(data) {
        try {
            this.logger.log(`Received get user request: ${data.id}`);
            const result = await this.userService.findOne(data.id);
            this.logger.log(`User retrieved successfully: ${data.id}`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to get user ${data.id}: ${error.message}`, error.stack);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async updateUser(data) {
        try {
            const { id, ...updateData } = data;
            this.logger.log(`Received update user request: ${id}`);
            const result = await this.userService.update(id, updateData);
            this.logger.log(`User updated successfully: ${id}`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to update user ${data.id}: ${error.message}`, error.stack);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async deleteUser(data) {
        try {
            this.logger.log(`Received delete user request: ${data.id}`);
            const result = await this.userService.remove(data.id);
            this.logger.log(`User deleted successfully: ${data.id}`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to delete user ${data.id}: ${error.message}`, error.stack);
            shared_1.ResponseHandler.sendError(error);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_user' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_user' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_user' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_user' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map