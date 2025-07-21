import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto, ResponseHandler } from '@app/shared';

@Controller()
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'create_order' })
  async createOrder(data: CreateOrderDto) {
    try {
      this.logger.log(`Received create order request for user ${data.userId}: ${data.product}`);
      const result = await this.orderService.create(data);
      this.logger.log(`Order created successfully: ${result.id} for user ${data.userId}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to create order: ${error.message}`, error.stack);
      ResponseHandler.sendError(error);
    }
  }

  @MessagePattern({ cmd: 'get_orders' })
  async getOrders() {
    try {
      this.logger.log('Received get orders request');
      const result = await this.orderService.findAll();
      this.logger.log(`Retrieved ${result?.length || 0} orders`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to get orders: ${error.message}`, error.stack);
      ResponseHandler.sendError(error);
    }
  }

  @MessagePattern({ cmd: 'get_order' })
  async getOrder(data: { id: number }) {
    try {
      this.logger.log(`Received get order request: ${data.id}`);
      const result = await this.orderService.findOne(data.id);
      this.logger.log(`Order retrieved successfully: ${data.id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to get order ${data.id}: ${error.message}`, error.stack);
      ResponseHandler.sendError(error);
    }
  }

  @MessagePattern({ cmd: 'get_user_orders' })
  async getUserOrders(data: { userId: number }) {
    try {
      this.logger.log(`Received get user orders request: ${data.userId}`);
      const result = await this.orderService.findByUserId(data.userId);
      this.logger.log(`Retrieved ${result?.length || 0} orders for user ${data.userId}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to get orders for user ${data.userId}: ${error.message}`, error.stack);
      ResponseHandler.sendError(error);
    }
  }

  @MessagePattern({ cmd: 'update_order' })
  async updateOrder(data: { id: number } & UpdateOrderDto) {
    try {
      const { id, ...updateData } = data;
      this.logger.log(`Received update order request: ${id}`);
      const result = await this.orderService.update(id, updateData);
      this.logger.log(`Order updated successfully: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to update order ${data.id}: ${error.message}`, error.stack);
      ResponseHandler.sendError(error);
    }
  }

  @MessagePattern({ cmd: 'delete_order' })
  async deleteOrder(data: { id: number }) {
    try {
      this.logger.log(`Received delete order request: ${data.id}`);
      const result = await this.orderService.remove(data.id);
      this.logger.log(`Order deleted successfully: ${data.id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to delete order ${data.id}: ${error.message}`, error.stack);
      ResponseHandler.sendError(error);
    }
  }
}