export declare class CreateUserDto {
    name: string;
    email: string;
}
export declare class UpdateUserDto {
    name?: string;
    email?: string;
}
export declare class UserResponseDto {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
