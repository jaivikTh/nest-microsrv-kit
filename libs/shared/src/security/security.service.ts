import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { ResponseHandler } from '../dto/response.dto';

@Injectable()
export class SecurityService {
  private readonly encryptionKey: Buffer;
  private readonly algorithm = 'aes-256-cbc';

  constructor() {
    // Generate or use environment-based encryption key
    const keyString = process.env.ENCRYPTION_KEY || 'your-32-character-secret-key-here';
    this.encryptionKey = crypto.scryptSync(keyString, 'salt', 32);
  }

  /**
   * Encrypt sensitive data
   */
  encrypt(text: string): string {
    return ResponseHandler.symEncrypt(text, this.algorithm, this.encryptionKey);
  }

  /**
   * Decrypt sensitive data
   */
  decrypt(encryptedText: string): string {
    return ResponseHandler.symDecrypt(encryptedText, this.algorithm, this.encryptionKey);
  }

  /**
   * Generate secure random token
   */
  generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Generate API key
   */
  generateApiKey(): string {
    const timestamp = Date.now().toString();
    const randomBytes = crypto.randomBytes(16).toString('hex');
    return `ak_${timestamp}_${randomBytes}`;
  }

  /**
   * Hash API key for storage
   */
  async hashApiKey(apiKey: string): Promise<string> {
    return bcrypt.hash(apiKey, 12);
  }

  /**
   * Verify API key
   */
  async verifyApiKey(apiKey: string, hashedApiKey: string): Promise<boolean> {
    return bcrypt.compare(apiKey, hashedApiKey);
  }

  /**
   * Sanitize input to prevent XSS
   */
  sanitizeInput(input: string): string {
    if (typeof input !== 'string') return input;
    
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

  /**
   * Validate and sanitize email
   */
  sanitizeEmail(email: string): string {
    if (!email || typeof email !== 'string') return '';
    
    return email
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9@._-]/g, '');
  }

  /**
   * Generate CSRF token
   */
  generateCSRFToken(): string {
    return crypto.randomBytes(32).toString('base64');
  }

  /**
   * Verify CSRF token
   */
  verifyCSRFToken(token: string, sessionToken: string): boolean {
    return crypto.timingSafeEqual(
      Buffer.from(token, 'base64'),
      Buffer.from(sessionToken, 'base64')
    );
  }

  /**
   * Check for SQL injection patterns
   */
  detectSQLInjection(input: string): boolean {
    if (typeof input !== 'string') return false;
    
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
      /(--|\/\*|\*\/|;|'|"|`)/,
      /(\bOR\b|\bAND\b).*?[=<>]/i,
      /\b(WAITFOR|DELAY)\b/i,
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Check for XSS patterns
   */
  detectXSS(input: string): boolean {
    if (typeof input !== 'string') return false;
    
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<img[^>]+src[\\s]*=[\\s]*[\"\\']?[\\s]*javascript:/gi,
    ];
    
    return xssPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Rate limit key generator
   */
  generateRateLimitKey(ip: string, endpoint: string): string {
    return `rate_limit:${ip}:${endpoint}`;
  }

  /**
   * Generate secure session ID
   */
  generateSessionId(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Mask sensitive data for logging
   */
  maskSensitiveData(data: any): any {
    if (typeof data !== 'object' || data === null) return data;
    
    const sensitiveFields = ['password', 'token', 'secret', 'key', 'authorization'];
    const masked = { ...data };
    
    for (const field of sensitiveFields) {
      if (masked[field]) {
        masked[field] = '***MASKED***';
      }
    }
    
    return masked;
  }
}