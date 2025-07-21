import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order, CreateOrderDto, UpdateOrderDto, ResponseHandler } from '@app/shared';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectModel(Order)
    private orderEntity: typeof Order,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      this.logger.log(`Creating order for user ${createOrderDto.userId}: ${createOrderDto.product}`);
      
      // Validate amount
      if (createOrderDto.amount <= 0) {
        this.logger.warn(`Order creation failed: Invalid amount ${createOrderDto.amount}`);
        ResponseHandler.sendBadRequest('Order amount must be greater than 0');
      }

      const order = await this.orderEntity.create(createOrderDto);
      this.logger.log(`Order created successfully: ${order.id} for user ${createOrderDto.userId}`);
      return order;
    } catch (error) {
      this.logger.error(`Failed to create order: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      this.logger.log('Fetching all orders');
      const orders = await this.orderEntity.findAll();
      this.logger.log(`Retrieved ${orders.length} orders`);
      return orders;
    } catch (error) {
      this.logger.error(`Failed to fetch orders: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOne(id: number): Promise<Order> {
    try {
      this.logger.log(`Fetching order with ID: ${id}`);
      const order = await this.orderEntity.findByPk(id);
      
      if (!order) {
        this.logger.warn(`Order not found with ID: ${id}`);
        ResponseHandler.sendNotFound('Order not found');
      }

      this.logger.log(`Order retrieved successfully: ${id}`);
      return order;
    } catch (error) {
      this.logger.error(`Failed to fetch order ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findByUserId(userId: number): Promise<Order[]> {
    try {
      this.logger.log(`Fetching orders for user: ${userId}`);
      const orders = await this.orderEntity.findAll({
        where: { userId },
      });
      this.logger.log(`Retrieved ${orders.length} orders for user ${userId}`);
      return orders;
    } catch (error) {
      this.logger.error(`Failed to fetch orders for user ${userId}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<[number, Order[]]> {
    try {
      this.logger.log(`Updating order with ID: ${id}`);
      
      // Check if order exists
      const existingOrder = await this.orderEntity.findByPk(id);
      if (!existingOrder) {
        this.logger.warn(`Update failed: Order not found with ID: ${id}`);
        ResponseHandler.sendNotFound('Order not found');
      }

      // Validate amount if being updated
      if (updateOrderDto.amount !== undefined && updateOrderDto.amount <= 0) {
        this.logger.warn(`Update failed: Invalid amount ${updateOrderDto.amount}`);
        ResponseHandler.sendBadRequest('Order amount must be greater than 0');
      }

      const result = await this.orderEntity.update(updateOrderDto, {
        where: { id },
        returning: true,
      });

      this.logger.log(`Order updated successfully: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to update order ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: number): Promise<number> {
    try {
      this.logger.log(`Deleting order with ID: ${id}`);
      
      // Check if order exists
      const existingOrder = await this.orderEntity.findByPk(id);
      if (!existingOrder) {
        this.logger.warn(`Delete failed: Order not found with ID: ${id}`);
        ResponseHandler.sendNotFound('Order not found');
      }

      const deletedCount = await this.orderEntity.destroy({
        where: { id },
      });

      this.logger.log(`Order deleted successfully: ${id}`);
      return deletedCount;
    } catch (error) {
      this.logger.error(`Failed to delete order ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }
}