import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from '@app/shared';
import { Response } from 'express';
export declare class UserController {
    private userService;
    private readonly logger;
    constructor(userService: ClientProxy);
    createUser(createUserDto: CreateUserDto, res: Response): Promise<any>;
    getUsers(res: Response): Promise<any>;
    getUser(id: number, res: Response): Promise<any>;
    updateUser(id: number, updateUserDto: UpdateUserDto, res: Response): Promise<any>;
    deleteUser(id: number, res: Response): Promise<any>;
}
