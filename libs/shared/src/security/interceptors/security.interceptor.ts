import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { SecurityService } from '../security.service';
import { ResponseHandler } from '../../dto/response.dto';

@Injectable()
export class SecurityInterceptor implements NestInterceptor {
  private readonly logger = new Logger(SecurityInterceptor.name);

  constructor(private readonly securityService: SecurityService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const startTime = Date.now();

    // Add security headers
    this.addSecurityHeaders(response);

    // Validate and sanitize request
    this.validateRequest(request);

    // Log request (with masked sensitive data)
    this.logRequest(request);

    return next.handle().pipe(
      tap((data) => {
        // Log successful response
        this.logResponse(request, response, startTime, data);
      }),
      catchError((error) => {
        // Log error
        this.logError(request, error, startTime);
        throw error;
      }),
    );
  }

  private addSecurityHeaders(response: any): void {
    // Security headers
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('X-Frame-Options', 'DENY');
    response.setHeader('X-XSS-Protection', '1; mode=block');
    response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    response.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload',
    );
    
    // Remove server information
    response.removeHeader('X-Powered-By');
    response.removeHeader('Server');
  }

  private validateRequest(request: any): void {
    const { body, query, params } = request;

    // Check for SQL injection in all inputs
    this.checkForSQLInjection(body, 'body');
    this.checkForSQLInjection(query, 'query');
    this.checkForSQLInjection(params, 'params');

    // Check for XSS in all inputs
    this.checkForXSS(body, 'body');
    this.checkForXSS(query, 'query');
    this.checkForXSS(params, 'params');

    // Validate content length
    if (request.headers['content-length']) {
      const contentLength = parseInt(request.headers['content-length']);
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (contentLength > maxSize) {
        ResponseHandler.sendBadRequest('Request payload too large');
      }
    }
  }

  private checkForSQLInjection(data: any, source: string): void {
    if (!data) return;

    const checkValue = (value: any, path: string) => {
      if (typeof value === 'string' && this.securityService.detectSQLInjection(value)) {
        this.logger.warn(`SQL injection attempt detected in ${source}.${path}: ${value}`);
        ResponseHandler.sendBadRequest('Invalid input detected');
      } else if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach(key => {
          checkValue(value[key], `${path}.${key}`);
        });
      }
    };

    Object.keys(data).forEach(key => {
      checkValue(data[key], key);
    });
  }

  private checkForXSS(data: any, source: string): void {
    if (!data) return;

    const checkValue = (value: any, path: string) => {
      if (typeof value === 'string' && this.securityService.detectXSS(value)) {
        this.logger.warn(`XSS attempt detected in ${source}.${path}: ${value}`);
        ResponseHandler.sendBadRequest('Invalid input detected');
      } else if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach(key => {
          checkValue(value[key], `${path}.${key}`);
        });
      }
    };

    Object.keys(data).forEach(key => {
      checkValue(data[key], key);
    });
  }

  private logRequest(request: any): void {
    const { method, url, ip, headers, body, query, params } = request;
    
    const logData = {
      method,
      url,
      ip: ip || request.connection?.remoteAddress,
      userAgent: headers['user-agent'],
      body: this.securityService.maskSensitiveData(body),
      query: this.securityService.maskSensitiveData(query),
      params: this.securityService.maskSensitiveData(params),
      timestamp: new Date().toISOString(),
    };

    this.logger.log(`Incoming Request: ${JSON.stringify(logData)}`);
  }

  private logResponse(request: any, response: any, startTime: number, data: any): void {
    const duration = Date.now() - startTime;
    
    const logData = {
      method: request.method,
      url: request.url,
      statusCode: response.statusCode,
      duration: `${duration}ms`,
      responseSize: JSON.stringify(data).length,
      timestamp: new Date().toISOString(),
    };

    this.logger.log(`Response: ${JSON.stringify(logData)}`);
  }

  private logError(request: any, error: any, startTime: number): void {
    const duration = Date.now() - startTime;
    
    const logData = {
      method: request.method,
      url: request.url,
      error: error.message,
      stack: error.stack,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    };

    this.logger.error(`Request Error: ${JSON.stringify(logData)}`);
  }
}