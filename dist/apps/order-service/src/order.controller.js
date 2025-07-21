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
var OrderController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const order_service_1 = require("./order.service");
const shared_1 = require("../../../libs/shared/src");
let OrderController = OrderController_1 = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
        this.logger = new common_1.Logger(OrderController_1.name);
    }
    async createOrder(data) {
        try {
            this.logger.log(`Received create order request for user ${data.userId}: ${data.product}`);
            const result = await this.orderService.create(data);
            this.logger.log(`Order created successfully: ${result.id} for user ${data.userId}`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to create order: ${error.message}`, error.stack);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async getOrders() {
        try {
            this.logger.log('Received get orders request');
            const result = await this.orderService.findAll();
            this.logger.log(`Retrieved ${result?.length || 0} orders`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to get orders: ${error.message}`, error.stack);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async getOrder(data) {
        try {
            this.logger.log(`Received get order request: ${data.id}`);
            const result = await this.orderService.findOne(data.id);
            this.logger.log(`Order retrieved successfully: ${data.id}`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to get order ${data.id}: ${error.message}`, error.stack);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async getUserOrders(data) {
        try {
            this.logger.log(`Received get user orders request: ${data.userId}`);
            const result = await this.orderService.findByUserId(data.userId);
            this.logger.log(`Retrieved ${result?.length || 0} orders for user ${data.userId}`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to get orders for user ${data.userId}: ${error.message}`, error.stack);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async updateOrder(data) {
        try {
            const { id, ...updateData } = data;
            this.logger.log(`Received update order request: ${id}`);
            const result = await this.orderService.update(id, updateData);
            this.logger.log(`Order updated successfully: ${id}`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to update order ${data.id}: ${error.message}`, error.stack);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async deleteOrder(data) {
        try {
            this.logger.log(`Received delete order request: ${data.id}`);
            const result = await this.orderService.remove(data.id);
            this.logger.log(`Order deleted successfully: ${data.id}`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to delete order ${data.id}: ${error.message}`, error.stack);
            shared_1.ResponseHandler.sendError(error);
        }
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_order' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_orders' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrders", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_order' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrder", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_user_orders' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getUserOrders", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_order' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_order' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
exports.OrderController = OrderController = OrderController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map