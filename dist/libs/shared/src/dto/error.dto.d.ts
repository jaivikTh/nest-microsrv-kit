export declare class ErrorResponseDto {
    statusCode: number;
    message: string | string[];
    error: string;
}
export declare class ValidationErrorResponseDto {
    statusCode: number;
    message: string[];
    error: string;
}
export declare class NotFoundErrorResponseDto {
    statusCode: number;
    message: string;
    error: string;
}
export declare class InternalServerErrorResponseDto {
    statusCode: number;
    message: string;
    error: string;
}
export declare class ConflictErrorResponseDto {
    statusCode: number;
    message: string;
    error: string;
}
