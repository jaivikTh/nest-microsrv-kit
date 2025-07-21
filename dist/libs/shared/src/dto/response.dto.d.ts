export declare class ResponseHandler {
    static symEncrypt(text: string, algorithm: string, key: Buffer): string;
    static symDecrypt(encryptedText: string, algorithm: string, key: Buffer): string;
    static sendSuccess(message: string, data: any, res: any): any;
    static sendCreated(message: string, data: any, res: any): any;
    static sendFound(message: string): any;
    static sendNotFound(message: string, errorType?: string): any;
    static sendBadRequest(message: string): any;
    static sendUnAuthorised(message: string): any;
    static sendForbidden(message: string): any;
    static sendInternalServerError(message: string): any;
    static sendValidationError(message: string): any;
    static sendOTPRateLimitError(message: string): any;
    static sendError(err: any): void;
    static sendResponse(message: string, result: any): {
        result: any;
        message: string;
    };
}
