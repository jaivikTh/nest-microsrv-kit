import { Controller, Get, Post, Put, Delete, Body, Param, Inject, ParseIntPipe, HttpStatus, Res, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { 
  CreateUserDto, 
  UpdateUserDto, 
  UserResponseDto,
  ResponseHandler
} from '@app/shared';
import { Response } from 'express';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  
  constructor(@Inject('USER_SERVICE') private userService: ClientProxy) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user with the provided name and email address. The email must be unique across all users.',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'User data for creation',
    examples: {
      example1: {
        summary: 'Basic user creation',
        description: 'Example of creating a new user',
        value: {
          name: 'John Doe',
          email: 'john.doe@example.com'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully created',
    type: UserResponseDto,
    example: {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      createdAt: '2025-07-18T07:53:59.561Z',
      updatedAt: '2025-07-18T07:53:59.561Z'
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data or validation failed',
    example: {
      statusCode: 400,
      message: ['name should not be empty', 'email must be an email'],
      error: 'Bad Request'
    }
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already exists',
    example: {
      statusCode: 409,
      message: 'Email already exists',
      error: 'Conflict'
    }
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    example: {
      statusCode: 500,
      message: 'Internal server error',
      error: 'Internal Server Error'
    }
  })
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      this.logger.log(`Creating user with email: ${createUserDto.email}`);
      const result = await this.userService.send({ cmd: 'create_user' }, createUserDto).toPromise();
      this.logger.log(`User created successfully: ${createUserDto.email}`);
      return ResponseHandler.sendCreated('User created successfully', result, res);
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all users in the system. Returns an empty array if no users exist.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of users retrieved successfully',
    type: [UserResponseDto],
    example: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: '2025-07-18T07:53:59.561Z',
        updatedAt: '2025-07-18T07:53:59.561Z'
      }
    ]
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async getUsers(@Res() res: Response) {
    try {
      this.logger.log('Fetching all users');
      const result = await this.userService.send({ cmd: 'get_users' }, {}).toPromise();
      this.logger.log(`Retrieved ${result?.length || 0} users`);
      return ResponseHandler.sendSuccess('Users retrieved successfully', result, res);
    } catch (error) {
      this.logger.error(`Failed to get users: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieves a specific user by their unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user',
    example: 1,
    type: 'integer',
    schema: { minimum: 1 }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User retrieved successfully',
    type: UserResponseDto,
    example: {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      createdAt: '2025-07-18T07:53:59.561Z',
      updatedAt: '2025-07-18T07:53:59.561Z'
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid user ID format',
    example: {
      statusCode: 400,
      message: 'Validation failed (numeric string is expected)',
      error: 'Bad Request'
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    example: {
      statusCode: 404,
      message: 'User not found',
      error: 'Not Found'
    }
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async getUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      this.logger.log(`Fetching user with ID: ${id}`);
      const result = await this.userService.send({ cmd: 'get_user' }, { id }).toPromise();
      this.logger.log(`User retrieved successfully: ${id}`);
      return ResponseHandler.sendSuccess('User retrieved successfully', result, res);
    } catch (error) {
      this.logger.error(`Failed to get user ${id}: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user by ID',
    description: 'Updates an existing user with the provided data. Only provided fields will be updated.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user to update',
    example: 1,
    type: 'integer',
    schema: { minimum: 1 }
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'User data for update (partial)',
    examples: {
      updateName: {
        summary: 'Update only name',
        value: { name: 'John Smith' }
      },
      updateEmail: {
        summary: 'Update only email',
        value: { email: 'john.smith@newemail.com' }
      },
      updateBoth: {
        summary: 'Update both fields',
        value: { name: 'John Smith', email: 'john.smith@newemail.com' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    type: UserResponseDto,
    example: {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@newemail.com',
      createdAt: '2025-07-18T07:53:59.561Z',
      updatedAt: '2025-07-18T09:30:15.789Z'
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data or user ID format',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already exists',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    try {
      this.logger.log(`Updating user with ID: ${id}`);
      const result = await this.userService.send({ cmd: 'update_user' }, { id, ...updateUserDto }).toPromise();
      this.logger.log(`User updated successfully: ${id}`);
      return ResponseHandler.sendSuccess('User updated successfully', result, res);
    } catch (error) {
      this.logger.error(`Failed to update user ${id}: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user by ID',
    description: 'Permanently deletes a user from the system. This action cannot be undone. All associated orders will also be deleted.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user to delete',
    example: 1,
    type: 'integer',
    schema: { minimum: 1 }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User deleted successfully',
        },
        deletedCount: {
          type: 'number',
          example: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid user ID format',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async deleteUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      this.logger.log(`Deleting user with ID: ${id}`);
      const result = await this.userService.send({ cmd: 'delete_user' }, { id }).toPromise();
      this.logger.log(`User deleted successfully: ${id}`);
      return ResponseHandler.sendSuccess('User deleted successfully', result, res);
    } catch (error) {
      this.logger.error(`Failed to delete user ${id}: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }
}