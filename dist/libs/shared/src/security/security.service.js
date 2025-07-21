"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const response_dto_1 = require("../dto/response.dto");
let SecurityService = class SecurityService {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        const keyString = process.env.ENCRYPTION_KEY || 'your-32-character-secret-key-here';
        this.encryptionKey = crypto.scryptSync(keyString, 'salt', 32);
    }
    encrypt(text) {
        return response_dto_1.ResponseHandler.symEncrypt(text, this.algorithm, this.encryptionKey);
    }
    decrypt(encryptedText) {
        return response_dto_1.ResponseHandler.symDecrypt(encryptedText, this.algorithm, this.encryptionKey);
    }
    generateSecureToken(length = 32) {
        return crypto.randomBytes(length).toString('hex');
    }
    generateApiKey() {
        const timestamp = Date.now().toString();
        const randomBytes = crypto.randomBytes(16).toString('hex');
        return `ak_${timestamp}_${randomBytes}`;
    }
    async hashApiKey(apiKey) {
        return bcrypt.hash(apiKey, 12);
    }
    async verifyApiKey(apiKey, hashedApiKey) {
        return bcrypt.compare(apiKey, hashedApiKey);
    }
    sanitizeInput(input) {
        if (typeof input !== 'string')
            return input;
        return input
            .replace(/[<>\"']/g, (match) => {
            const entities = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
            };
            return entities[match] || match;
        })
            .trim();
    }
    sanitizeEmail(email) {
        if (!email || typeof email !== 'string')
            return '';
        return email
            .toLowerCase()
            .trim()
            .replace(/[^a-zA-Z0-9@._-]/g, '');
    }
    generateCSRFToken() {
        return crypto.randomBytes(32).toString('base64');
    }
    verifyCSRFToken(token, sessionToken) {
        return crypto.timingSafeEqual(Buffer.from(token, 'base64'), Buffer.from(sessionToken, 'base64'));
    }
    detectSQLInjection(input) {
        if (typeof input !== 'string')
            return false;
        const sqlPatterns = [
            /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
            /(--|\/\*|\*\/|;|'|"|`)/,
            /(\bOR\b|\bAND\b).*?[=<>]/i,
            /\b(WAITFOR|DELAY)\b/i,
        ];
        return sqlPatterns.some(pattern => pattern.test(input));
    }
    detectXSS(input) {
        if (typeof input !== 'string')
            return false;
        const xssPatterns = [
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,
            /<img[^>]+src[\\s]*=[\\s]*[\"\\']?[\\s]*javascript:/gi,
        ];
        return xssPatterns.some(pattern => pattern.test(input));
    }
    generateRateLimitKey(ip, endpoint) {
        return `rate_limit:${ip}:${endpoint}`;
    }
    generateSessionId() {
        return crypto.randomBytes(32).toString('hex');
    }
    maskSensitiveData(data) {
        if (typeof data !== 'object' || data === null)
            return data;
        const sensitiveFields = ['password', 'token', 'secret', 'key', 'authorization'];
        const masked = { ...data };
        for (const field of sensitiveFields) {
            if (masked[field]) {
                masked[field] = '***MASKED***';
            }
        }
        return masked;
    }
};
exports.SecurityService = SecurityService;
exports.SecurityService = SecurityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SecurityService);
//# sourceMappingURL=security.service.js.map