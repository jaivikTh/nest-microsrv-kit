import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { SecurityService } from '../security.service';

@Injectable()
export class InputSanitizationPipe implements PipeTransform {
  constructor(private readonly securityService: SecurityService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'object') {
      return this.sanitizeValue(value);
    }

    return this.sanitizeObject(value);
  }

  private sanitizeObject(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObject(item));
    }

    if (obj && typeof obj === 'object') {
      const sanitized = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          sanitized[key] = this.sanitizeObject(obj[key]);
        }
      }
      return sanitized;
    }

    return this.sanitizeValue(obj);
  }

  private sanitizeValue(value: any): any {
    if (typeof value === 'string') {
      // Special handling for email fields
      if (this.isEmailField(value)) {
        return this.securityService.sanitizeEmail(value);
      }
      
      // General string sanitization
      return this.securityService.sanitizeInput(value);
    }

    return value;
  }

  private isEmailField(value: string): boolean {
    // Simple email detection
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}