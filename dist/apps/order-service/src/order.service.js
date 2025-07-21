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
var OrderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const shared_1 = require("../../../libs/shared/src");
let OrderService = OrderService_1 = class OrderService {
    constructor(orderEntity) {
        this.orderEntity = orderEntity;
        this.logger = new common_1.Logger(OrderService_1.name);
    }
    async create(createOrderDto) {
        try {
            this.logger.log(`Creating order for user ${createOrderDto.userId}: ${createOrderDto.product}`);
            if (createOrderDto.amount <= 0) {
                this.logger.warn(`Order creation failed: Invalid amount ${createOrderDto.amount}`);
                shared_1.ResponseHandler.sendBadRequest('Order amount must be greater than 0');
            }
            const order = await this.orderEntity.create(createOrderDto);
            this.logger.log(`Order created successfully: ${order.id} for user ${createOrderDto.userId}`);
            return order;
        }
        catch (error) {
            this.logger.error(`Failed to create order: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findAll() {
        try {
            this.logger.log('Fetching all orders');
            const orders = await this.orderEntity.findAll();
            this.logger.log(`Retrieved ${orders.length} orders`);
            return orders;
        }
        catch (error) {
            this.logger.error(`Failed to fetch orders: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findOne(id) {
        try {
            this.logger.log(`Fetching order with ID: ${id}`);
            const order = await this.orderEntity.findByPk(id);
            if (!order) {
                this.logger.warn(`Order not found with ID: ${id}`);
                shared_1.ResponseHandler.sendNotFound('Order not found');
            }
            this.logger.log(`Order retrieved successfully: ${id}`);
            return order;
        }
        catch (error) {
            this.logger.error(`Failed to fetch order ${id}: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findByUserId(userId) {
        try {
            this.logger.log(`Fetching orders for user: ${userId}`);
            const orders = await this.orderEntity.findAll({
                where: { userId },
            });
            this.logger.log(`Retrieved ${orders.length} orders for user ${userId}`);
            return orders;
        }
        catch (error) {
            this.logger.error(`Failed to fetch orders for user ${userId}: ${error.message}`, error.stack);
            throw error;
        }
    }
    async update(id, updateOrderDto) {
        try {
            this.logger.log(`Updating order with ID: ${id}`);
            const existingOrder = await this.orderEntity.findByPk(id);
            if (!existingOrder) {
                this.logger.warn(`Update failed: Order not found with ID: ${id}`);
                shared_1.ResponseHandler.sendNotFound('Order not found');
            }
            if (updateOrderDto.amount !== undefined && updateOrderDto.amount <= 0) {
                this.logger.warn(`Update failed: Invalid amount ${updateOrderDto.amount}`);
                shared_1.ResponseHandler.sendBadRequest('Order amount must be greater than 0');
            }
            const result = await this.orderEntity.update(updateOrderDto, {
                where: { id },
                returning: true,
            });
            this.logger.log(`Order updated successfully: ${id}`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to update order ${id}: ${error.message}`, error.stack);
            throw error;
        }
    }
    async remove(id) {
        try {
            this.logger.log(`Deleting order with ID: ${id}`);
            const existingOrder = await this.orderEntity.findByPk(id);
            if (!existingOrder) {
                this.logger.warn(`Delete failed: Order not found with ID: ${id}`);
                shared_1.ResponseHandler.sendNotFound('Order not found');
            }
            const deletedCount = await this.orderEntity.destroy({
                where: { id },
            });
            this.logger.log(`Order deleted successfully: ${id}`);
            return deletedCount;
        }
        catch (error) {
            this.logger.error(`Failed to delete order ${id}: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = OrderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(shared_1.Order)),
    __metadata("design:paramtypes", [Object])
], OrderService);
//# sourceMappingURL=order.service.js.map