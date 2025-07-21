import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';
import { LoginDto, RegisterDto, AuthResponseDto } from '../dto/auth';
import { PasswordUtil } from './utils/password.util';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ResponseHandler } from '../dto/response.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   */
  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    try {
      const { name, email, password } = registerDto;
      this.logger.log(`Attempting to register user with email: ${email}`);

      // Check if user already exists
      const existingUser = await this.userModel.findOne({ where: { email } });
      if (existingUser) {
        this.logger.warn(`Registration failed: User with email ${email} already exists`);
        ResponseHandler.sendBadRequest('User with this email already exists');
      }

      // Validate password strength
      const passwordValidation = PasswordUtil.validatePasswordStrength(password);
      if (!passwordValidation.isValid) {
        this.logger.warn(`Registration failed: Password validation failed for ${email}`);
        ResponseHandler.sendValidationError(passwordValidation.errors.join(', '));
      }

      // Hash password
      const hashedPassword = await PasswordUtil.hashPassword(password);

      // Create user
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      // Generate JWT token
      const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
      };

      const access_token = this.jwtService.sign(payload);

      this.logger.log(`User registered successfully: ${email}`);
      return {
        access_token,
        token_type: 'Bearer',
        expires_in: 86400, // 24 hours
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      this.logger.error(`Registration error for ${registerDto.email}: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Login user
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    try {
      const { email, password } = loginDto;
      this.logger.log(`Login attempt for email: ${email}`);

      // Find user by email
      const user = await this.userModel.findOne({ where: { email } });
      if (!user) {
        this.logger.warn(`Login failed: User not found for email ${email}`);
        ResponseHandler.sendUnAuthorised('Invalid credentials');
      }

      // Verify password
      const isPasswordValid = await PasswordUtil.comparePassword(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        this.logger.warn(`Login failed: Invalid password for email ${email}`);
        ResponseHandler.sendUnAuthorised('Invalid credentials');
      }

      // Generate JWT token
      const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
      };

      const access_token = this.jwtService.sign(payload);

      this.logger.log(`User logged in successfully: ${email}`);
      return {
        access_token,
        token_type: 'Bearer',
        expires_in: 86400, // 24 hours
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      this.logger.error(`Login error for ${loginDto.email}: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Validate user by ID (used by JWT strategy)
   */
  async validateUser(userId: number): Promise<User | null> {
    try {
      return await this.userModel.findByPk(userId, {
        attributes: { exclude: ['password'] },
      });
    } catch (error) {
      this.logger.error(`Error validating user ${userId}: ${error.message}`, error.stack);
      return null;
    }
  }

  /**
   * Get user profile
   */
  async getProfile(userId: number): Promise<Omit<User, 'password'>> {
    try {
      const user = await this.userModel.findByPk(userId, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        this.logger.warn(`Profile request failed: User not found for ID ${userId}`);
        ResponseHandler.sendNotFound('User not found');
      }

      return user;
    } catch (error) {
      this.logger.error(`Error getting profile for user ${userId}: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Verify JWT token
   */
  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      this.logger.error(`Token verification failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Generate JWT token for user
   */
  generateToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return this.jwtService.sign(payload);
  }
}