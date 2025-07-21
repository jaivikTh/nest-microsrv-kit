import { LoginDto, RegisterDto, AuthService } from '@app/shared';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto, res: Response): Promise<any>;
    login(loginDto: LoginDto, res: Response): Promise<any>;
    getProfile(user: any, res: Response): Promise<any>;
    verifyToken(user: any, res: Response): Promise<any>;
}
