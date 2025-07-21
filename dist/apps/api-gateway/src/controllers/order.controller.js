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
var OrderController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const shared_1 = require("../../../../libs/shared/src");
let OrderController = OrderController_1 = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
        this.logger = new common_1.Logger(OrderController_1.name);
    }
    async createOrder(createOrderRequestDto, user, res) {
        try {
            this.logger.log(`Creating order for user ${user.userId}: ${createOrderRequestDto.product}`);
            const orderData = { ...createOrderRequestDto, userId: user.userId };
            const result = await this.orderService.send({ cmd: 'create_order' }, orderData).toPromise();
            this.logger.log(`Order created successfully for user ${user.userId}`);
            return shared_1.ResponseHandler.sendCreated('Order created successfully', result, res);
        }
        catch (error) {
            this.logger.error(`Failed to create order for user ${user.userId}: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async getOrders(user, res) {
        try {
            this.logger.log(`Fetching orders for user ${user.userId}`);
            const result = await this.orderService.send({ cmd: 'get_user_orders' }, { userId: user.userId }).toPromise();
            this.logger.log(`Retrieved ${result?.length || 0} orders for user ${user.userId}`);
            return shared_1.ResponseHandler.sendSuccess('Orders retrieved successfully', result, res);
        }
        catch (error) {
            this.logger.error(`Failed to get orders for user ${user.userId}: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async getOrder(id, user, res) {
        try {
            this.logger.log(`Fetching order ${id} for user ${user.userId}`);
            const result = await this.orderService.send({ cmd: 'get_order' }, { id, userId: user.userId }).toPromise();
            this.logger.log(`Order ${id} retrieved successfully for user ${user.userId}`);
            return shared_1.ResponseHandler.sendSuccess('Order retrieved successfully', result, res);
        }
        catch (error) {
            this.logger.error(`Failed to get order ${id} for user ${user.userId}: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async getUserOrders(userId, user, res) {
        try {
            if (userId !== user.userId) {
                this.logger.warn(`Access denied: User ${user.userId} tried to access orders for user ${userId}`);
                shared_1.ResponseHandler.sendForbidden('Access denied: You can only access your own orders');
            }
            this.logger.log(`Fetching orders for user ${userId}`);
            const result = await this.orderService.send({ cmd: 'get_user_orders' }, { userId }).toPromise();
            this.logger.log(`Retrieved ${result?.length || 0} orders for user ${userId}`);
            return shared_1.ResponseHandler.sendSuccess('User orders retrieved successfully', result, res);
        }
        catch (error) {
            this.logger.error(`Failed to get orders for user ${userId}: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async updateOrder(id, updateOrderDto, user, res) {
        try {
            this.logger.log(`Updating order ${id} for user ${user.userId}`);
            const result = await this.orderService.send({ cmd: 'update_order' }, { id, userId: user.userId, ...updateOrderDto }).toPromise();
            this.logger.log(`Order ${id} updated successfully for user ${user.userId}`);
            return shared_1.ResponseHandler.sendSuccess('Order updated successfully', result, res);
        }
        catch (error) {
            this.logger.error(`Failed to update order ${id} for user ${user.userId}: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
    async deleteOrder(id, user, res) {
        try {
            this.logger.log(`Deleting order ${id} for user ${user.userId}`);
            const result = await this.orderService.send({ cmd: 'delete_order' }, { id, userId: user.userId }).toPromise();
            this.logger.log(`Order ${id} deleted successfully for user ${user.userId}`);
            return shared_1.ResponseHandler.sendSuccess('Order deleted successfully', result, res);
        }
        catch (error) {
            this.logger.error(`Failed to delete order ${id} for user ${user.userId}: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new order',
        description: 'Creates a new order for the authenticated user with product details and amount.',
    }),
    (0, swagger_1.ApiBody)({
        type: shared_1.CreateOrderRequestDto,
        description: 'Order data for creating a new order',
        examples: {
            electronics: {
                summary: 'Electronics order',
                value: {
                    product: 'MacBook Pro 16"',
                    amount: 2499.99
                }
            }
        }
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Order successfully created',
        type: shared_1.OrderResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Validation failed or user does not exist',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Internal server error',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, shared_1.CurrentUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_1.CreateOrderRequestDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all orders',
        description: 'Retrieves all orders for the authenticated user.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of orders retrieved successfully',
        type: [shared_1.OrderResponseDto],
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Internal server error',
    }),
    __param(0, (0, shared_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get order by ID',
        description: 'Retrieves a specific order by its unique identifier (only if it belongs to the authenticated user).',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'integer',
        description: 'Unique identifier of the order',
        example: 1,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Order found and returned successfully',
        type: shared_1.OrderResponseDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Order not found or does not belong to user',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid order ID format',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Internal server error',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, shared_1.CurrentUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get orders by user ID',
        description: 'Retrieves all orders for a specific user (only accessible by the same user).',
    }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        type: 'integer',
        description: 'Unique identifier of the user',
        example: 1,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User orders retrieved successfully',
        type: [shared_1.OrderResponseDto],
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'User not found or access denied',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid user ID format',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Internal server error',
    }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, shared_1.CurrentUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getUserOrders", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update order information',
        description: 'Updates an existing order (only if it belongs to the authenticated user).',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'integer',
        description: 'Unique identifier of the order to update',
        example: 1,
    }),
    (0, swagger_1.ApiBody)({
        type: shared_1.UpdateOrderDto,
        description: 'Order data to update',
        examples: {
            updateProduct: {
                summary: 'Update product only',
                value: {
                    product: 'MacBook Pro 14" (Updated)'
                }
            }
        }
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Order updated successfully',
        type: shared_1.OrderResponseDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Order not found or does not belong to user',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Validation failed',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Internal server error',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.CurrentUser)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, shared_1.UpdateOrderDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete an order',
        description: 'Permanently deletes an order (only if it belongs to the authenticated user).',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'integer',
        description: 'Unique identifier of the order to delete',
        example: 1,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Order deleted successfully',
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Order deleted successfully'
                },
                deletedOrderId: {
                    type: 'number',
                    example: 1
                }
            }
        }
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Order not found or does not belong to user',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid order ID format',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Internal server error',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, shared_1.CurrentUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
exports.OrderController = OrderController = OrderController_1 = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('orders'),
    __param(0, (0, common_1.Inject)('ORDER_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], OrderController);
//# sourceMappingURL=order.controller.js.map