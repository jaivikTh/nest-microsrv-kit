export declare class AuthResponseDto {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
}
