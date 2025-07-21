import { User, CreateUserDto, UpdateUserDto } from '@app/shared';
export declare class UserService {
    private userEntity;
    private readonly logger;
    constructor(userEntity: typeof User);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<[number, User[]]>;
    remove(id: number): Promise<number>;
}
