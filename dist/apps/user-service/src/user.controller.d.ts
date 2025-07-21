import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@app/shared';
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    createUser(data: CreateUserDto): Promise<import("@app/shared").User>;
    getUsers(): Promise<import("@app/shared").User[]>;
    getUser(data: {
        id: number;
    }): Promise<import("@app/shared").User>;
    updateUser(data: {
        id: number;
    } & UpdateUserDto): Promise<[number, import("@app/shared").User[]]>;
    deleteUser(data: {
        id: number;
    }): Promise<number>;
}
