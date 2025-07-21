import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Res,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import {
  LoginDto,
  RegisterDto,
  AuthResponseDto,
  AuthService,
  CurrentUser,
  Public,
  UserResponseDto,
  ResponseHandler,
} from '@app/shared';
import { Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Create a new user account with email and password',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation errors or user already exists',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Email already exists'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    try {
      this.logger.log(`User registration attempt for email: ${registerDto.email}`);
      const result = await this.authService.register(registerDto);
      this.logger.log(`User registered successfully: ${registerDto.email}`);
      return ResponseHandler.sendCreated('User registered successfully', result, res);
    } catch (error) {
      this.logger.error(`Registration failed for ${registerDto.email}: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login user',
    description: 'Authenticate user with email and password',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully authenticated',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid credentials',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Invalid credentials' },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      this.logger.log(`User login attempt for email: ${loginDto.email}`);
      const result = await this.authService.login(loginDto);
      this.logger.log(`User logged in successfully: ${loginDto.email}`);
      return ResponseHandler.sendSuccess('User logged in successfully', result, res);
    } catch (error) {
      this.logger.error(`Login failed for ${loginDto.email}: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }

  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get user profile',
    description: 'Get the authenticated user profile information',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or missing token',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  async getProfile(@CurrentUser() user: any, @Res() res: Response) {
    try {
      this.logger.log(`Profile request for user ID: ${user.userId}`);
      const result = await this.authService.getProfile(user.userId);
      this.logger.log(`Profile retrieved successfully for user ID: ${user.userId}`);
      return ResponseHandler.sendSuccess('Profile retrieved successfully', result, res);
    } catch (error) {
      this.logger.error(`Profile retrieval failed for user ID ${user.userId}: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }

  @Post('verify')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Verify JWT token',
    description: 'Verify if the provided JWT token is valid',
  })
  @ApiResponse({
    status: 200,
    description: 'Token is valid',
    schema: {
      type: 'object',
      properties: {
        valid: { type: 'boolean', example: true },
        user: {
          type: 'object',
          properties: {
            userId: { type: 'number', example: 1 },
            email: { type: 'string', example: 'john@example.com' },
            name: { type: 'string', example: 'John Doe' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token is invalid',
  })
  async verifyToken(@CurrentUser() user: any, @Res() res: Response) {
    try {
      this.logger.log(`Token verification for user ID: ${user.userId}`);
      const result = {
        valid: true,
        user,
      };
      return ResponseHandler.sendSuccess('Token is valid', result, res);
    } catch (error) {
      this.logger.error(`Token verification failed: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }
}