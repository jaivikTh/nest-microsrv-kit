import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, ResponseHandler } from '@app/shared';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) { }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(data: CreateUserDto) {
    try {
      this.logger.log(`Received create user request: ${data.email}`);
      const result = await this.userService.create(data);
      this.logger.log(`User created successfully: ${data.email}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      ResponseHandler.sendError(error);
    }
  }

  @MessagePattern({ cmd: 'get_users' })
  async getUsers() {
    try {
      this.logger.log('Received get users request');
      const result = await this.userService.findAll();
      this.logger.log(`Retrieved ${result?.length || 0} users`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to get users: ${error.message}`, error.stack);
      ResponseHandler.sendError(error);
    }
  }

  @MessagePattern({ cmd: 'get_user' })
  async getUser(data: { id: number }) {
    try {
      this.logger.log(`Received get user request: ${data.id}`);
      const result = await this.userService.findOne(data.id);
      this.logger.log(`User retrieved successfully: ${data.id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to get user ${data.id}: ${error.message}`, error.stack);
      ResponseHandler.sendError(error);
    }
  }

  @MessagePattern({ cmd: 'update_user' })
  async updateUser(data: { id: number } & UpdateUserDto) {
    try {
      const { id, ...updateData } = data;
      this.logger.log(`Received update user request: ${id}`);
      const result = await this.userService.update(id, updateData);
      this.logger.log(`User updated successfully: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to update user ${data.id}: ${error.message}`, error.stack);
      ResponseHandler.sendError(error);
    }
  }

  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser(data: { id: number }) {
    try {
      this.logger.log(`Received delete user request: ${data.id}`);
      const result = await this.userService.remove(data.id);
      this.logger.log(`User deleted successfully: ${data.id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to delete user ${data.id}: ${error.message}`, error.stack);
      ResponseHandler.sendError(error);
    }
  }
}