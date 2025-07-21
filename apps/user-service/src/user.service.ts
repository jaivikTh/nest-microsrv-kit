import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, CreateUserDto, UpdateUserDto, ResponseHandler } from '@app/shared';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User)
    private userEntity: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      this.logger.log(`Creating user with email: ${createUserDto.email}`);
      
      // Check if user already exists
      const existingUser = await this.userEntity.findOne({ 
        where: { email: createUserDto.email } 
      });
      
      if (existingUser) {
        this.logger.warn(`User creation failed: Email ${createUserDto.email} already exists`);
        ResponseHandler.sendBadRequest('User with this email already exists');
      }

      const user = await this.userEntity.create(createUserDto);
      this.logger.log(`User created successfully: ${createUserDto.email}`);
      return user;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      this.logger.log('Fetching all users');
      const users = await this.userEntity.findAll();
      this.logger.log(`Retrieved ${users.length} users`);
      return users;
    } catch (error) {
      this.logger.error(`Failed to fetch users: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      this.logger.log(`Fetching user with ID: ${id}`);
      const user = await this.userEntity.findByPk(id);
      
      if (!user) {
        this.logger.warn(`User not found with ID: ${id}`);
        ResponseHandler.sendNotFound('User not found');
      }

      this.logger.log(`User retrieved successfully: ${id}`);
      return user;
    } catch (error) {
      this.logger.error(`Failed to fetch user ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<[number, User[]]> {
    try {
      this.logger.log(`Updating user with ID: ${id}`);
      
      // Check if user exists
      const existingUser = await this.userEntity.findByPk(id);
      if (!existingUser) {
        this.logger.warn(`Update failed: User not found with ID: ${id}`);
        ResponseHandler.sendNotFound('User not found');
      }

      // Check if email is being updated and already exists
      if (updateUserDto.email) {
        const emailExists = await this.userEntity.findOne({
          where: { email: updateUserDto.email }
        });
        
        if (emailExists && emailExists.id !== id) {
          this.logger.warn(`Update failed: Email ${updateUserDto.email} already exists`);
          ResponseHandler.sendBadRequest('Email already exists');
        }
      }

      const result = await this.userEntity.update(updateUserDto, {
        where: { id },
        returning: true,
      });

      this.logger.log(`User updated successfully: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to update user ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: number): Promise<number> {
    try {
      this.logger.log(`Deleting user with ID: ${id}`);
      
      // Check if user exists
      const existingUser = await this.userEntity.findByPk(id);
      if (!existingUser) {
        this.logger.warn(`Delete failed: User not found with ID: ${id}`);
        ResponseHandler.sendNotFound('User not found');
      }

      const deletedCount = await this.userEntity.destroy({
        where: { id },
      });

      this.logger.log(`User deleted successfully: ${id}`);
      return deletedCount;
    } catch (error) {
      this.logger.error(`Failed to delete user ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }
}