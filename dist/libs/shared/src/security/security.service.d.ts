export declare class SecurityService {
    private readonly encryptionKey;
    private readonly algorithm;
    constructor();
    encrypt(text: string): string;
    decrypt(encryptedText: string): string;
    generateSecureToken(length?: number): string;
    generateApiKey(): string;
    hashApiKey(apiKey: string): Promise<string>;
    verifyApiKey(apiKey: string, hashedApiKey: string): Promise<boolean>;
    sanitizeInput(input: string): string;
    sanitizeEmail(email: string): string;
    generateCSRFToken(): string;
    verifyCSRFToken(token: string, sessionToken: string): boolean;
    detectSQLInjection(input: string): boolean;
    detectXSS(input: string): boolean;
    generateRateLimitKey(ip: string, endpoint: string): string;
    generateSessionId(): string;
    maskSensitiveData(data: any): any;
}
