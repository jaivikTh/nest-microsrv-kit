import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SecurityService } from '../security.service';
export declare class SecurityInterceptor implements NestInterceptor {
    private readonly securityService;
    private readonly logger;
    constructor(securityService: SecurityService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private addSecurityHeaders;
    private validateRequest;
    private checkForSQLInjection;
    private checkForXSS;
    private logRequest;
    private logResponse;
    private logError;
}
