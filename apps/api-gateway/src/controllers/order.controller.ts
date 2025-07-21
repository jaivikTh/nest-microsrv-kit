import { Controller, Get, Post, Put, Delete, Body, Param, Inject, ParseIntPipe, Res, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { 
  ApiTags, 
  ApiOperation, 
  ApiParam, 
  ApiBody,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth
} from '@nestjs/swagger';
import { 
  CreateOrderDto, 
  CreateOrderRequestDto,
  UpdateOrderDto, 
  OrderResponseDto,
  CurrentUser,
  ResponseHandler
} from '@app/shared';
import { Response } from 'express';

@ApiTags('Orders')
@ApiBearerAuth('JWT-auth')
@Controller('orders')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  
  constructor(@Inject('ORDER_SERVICE') private orderService: ClientProxy) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new order',
    description: 'Creates a new order for the authenticated user with product details and amount.',
  })
  @ApiBody({
    type: CreateOrderRequestDto,
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
  })
  @ApiCreatedResponse({
    description: 'Order successfully created',
    type: OrderResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed or user does not exist',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async createOrder(@Body() createOrderRequestDto: CreateOrderRequestDto, @CurrentUser() user: any, @Res() res: Response) {
    try {
      this.logger.log(`Creating order for user ${user.userId}: ${createOrderRequestDto.product}`);
      const orderData: CreateOrderDto = { ...createOrderRequestDto, userId: user.userId };
      const result = await this.orderService.send({ cmd: 'create_order' }, orderData).toPromise();
      this.logger.log(`Order created successfully for user ${user.userId}`);
      return ResponseHandler.sendCreated('Order created successfully', result, res);
    } catch (error) {
      this.logger.error(`Failed to create order for user ${user.userId}: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get all orders',
    description: 'Retrieves all orders for the authenticated user.',
  })
  @ApiOkResponse({
    description: 'List of orders retrieved successfully',
    type: [OrderResponseDto],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getOrders(@CurrentUser() user: any, @Res() res: Response) {
    try {
      this.logger.log(`Fetching orders for user ${user.userId}`);
      const result = await this.orderService.send({ cmd: 'get_user_orders' }, { userId: user.userId }).toPromise();
      this.logger.log(`Retrieved ${result?.length || 0} orders for user ${user.userId}`);
      return ResponseHandler.sendSuccess('Orders retrieved successfully', result, res);
    } catch (error) {
      this.logger.error(`Failed to get orders for user ${user.userId}: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get order by ID',
    description: 'Retrieves a specific order by its unique identifier (only if it belongs to the authenticated user).',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Unique identifier of the order',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Order found and returned successfully',
    type: OrderResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Order not found or does not belong to user',
  })
  @ApiBadRequestResponse({
    description: 'Invalid order ID format',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getOrder(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: any, @Res() res: Response) {
    try {
      this.logger.log(`Fetching order ${id} for user ${user.userId}`);
      const result = await this.orderService.send({ cmd: 'get_order' }, { id, userId: user.userId }).toPromise();
      this.logger.log(`Order ${id} retrieved successfully for user ${user.userId}`);
      return ResponseHandler.sendSuccess('Order retrieved successfully', result, res);
    } catch (error) {
      this.logger.error(`Failed to get order ${id} for user ${user.userId}: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get orders by user ID',
    description: 'Retrieves all orders for a specific user (only accessible by the same user).',
  })
  @ApiParam({
    name: 'userId',
    type: 'integer',
    description: 'Unique identifier of the user',
    example: 1,
  })
  @ApiOkResponse({
    description: 'User orders retrieved successfully',
    type: [OrderResponseDto],
  })
  @ApiNotFoundResponse({
    description: 'User not found or access denied',
  })
  @ApiBadRequestResponse({
    description: 'Invalid user ID format',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getUserOrders(@Param('userId', ParseIntPipe) userId: number, @CurrentUser() user: any, @Res() res: Response) {
    try {
      // Only allow users to access their own orders
      if (userId !== user.userId) {
        this.logger.warn(`Access denied: User ${user.userId} tried to access orders for user ${userId}`);
        ResponseHandler.sendForbidden('Access denied: You can only access your own orders');
      }
      
      this.logger.log(`Fetching orders for user ${userId}`);
      const result = await this.orderService.send({ cmd: 'get_user_orders' }, { userId }).toPromise();
      this.logger.log(`Retrieved ${result?.length || 0} orders for user ${userId}`);
      return ResponseHandler.sendSuccess('User orders retrieved successfully', result, res);
    } catch (error) {
      this.logger.error(`Failed to get orders for user ${userId}: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update order information',
    description: 'Updates an existing order (only if it belongs to the authenticated user).',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Unique identifier of the order to update',
    example: 1,
  })
  @ApiBody({
    type: UpdateOrderDto,
    description: 'Order data to update',
    examples: {
      updateProduct: {
        summary: 'Update product only',
        value: {
          product: 'MacBook Pro 14" (Updated)'
        }
      }
    }
  })
  @ApiOkResponse({
    description: 'Order updated successfully',
    type: OrderResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Order not found or does not belong to user',
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async updateOrder(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto, @CurrentUser() user: any, @Res() res: Response) {
    try {
      this.logger.log(`Updating order ${id} for user ${user.userId}`);
      const result = await this.orderService.send({ cmd: 'update_order' }, { id, userId: user.userId, ...updateOrderDto }).toPromise();
      this.logger.log(`Order ${id} updated successfully for user ${user.userId}`);
      return ResponseHandler.sendSuccess('Order updated successfully', result, res);
    } catch (error) {
      this.logger.error(`Failed to update order ${id} for user ${user.userId}: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an order',
    description: 'Permanently deletes an order (only if it belongs to the authenticated user).',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Unique identifier of the order to delete',
    example: 1,
  })
  @ApiOkResponse({
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
  })
  @ApiNotFoundResponse({
    description: 'Order not found or does not belong to user',
  })
  @ApiBadRequestResponse({
    description: 'Invalid order ID format',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async deleteOrder(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: any, @Res() res: Response) {
    try {
      this.logger.log(`Deleting order ${id} for user ${user.userId}`);
      const result = await this.orderService.send({ cmd: 'delete_order' }, { id, userId: user.userId }).toPromise();
      this.logger.log(`Order ${id} deleted successfully for user ${user.userId}`);
      return ResponseHandler.sendSuccess('Order deleted successfully', result, res);
    } catch (error) {
      this.logger.error(`Failed to delete order ${id} for user ${user.userId}: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }
}