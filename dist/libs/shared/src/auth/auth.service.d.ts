import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { LoginDto, RegisterDto, AuthResponseDto } from '../dto/auth';
import { JwtPayload } from './interfaces/jwt-payload.interface';
export declare class AuthService {
    private userModel;
    private jwtService;
    private readonly logger;
    constructor(userModel: typeof User, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    validateUser(userId: number): Promise<User | null>;
    getProfile(userId: number): Promise<Omit<User, 'password'>>;
    verifyToken(token: string): Promise<JwtPayload>;
    generateToken(user: User): string;
}
