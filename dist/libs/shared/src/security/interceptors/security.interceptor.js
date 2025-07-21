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
var SecurityInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const security_service_1 = require("../security.service");
const response_dto_1 = require("../../dto/response.dto");
let SecurityInterceptor = SecurityInterceptor_1 = class SecurityInterceptor {
    constructor(securityService) {
        this.securityService = securityService;
        this.logger = new common_1.Logger(SecurityInterceptor_1.name);
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const startTime = Date.now();
        this.addSecurityHeaders(response);
        this.validateRequest(request);
        this.logRequest(request);
        return next.handle().pipe((0, operators_1.tap)((data) => {
            this.logResponse(request, response, startTime, data);
        }), (0, operators_1.catchError)((error) => {
            this.logError(request, error, startTime);
            throw error;
        }));
    }
    addSecurityHeaders(response) {
        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.setHeader('X-Frame-Options', 'DENY');
        response.setHeader('X-XSS-Protection', '1; mode=block');
        response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        response.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
        response.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        response.removeHeader('X-Powered-By');
        response.removeHeader('Server');
    }
    validateRequest(request) {
        const { body, query, params } = request;
        this.checkForSQLInjection(body, 'body');
        this.checkForSQLInjection(query, 'query');
        this.checkForSQLInjection(params, 'params');
        this.checkForXSS(body, 'body');
        this.checkForXSS(query, 'query');
        this.checkForXSS(params, 'params');
        if (request.headers['content-length']) {
            const contentLength = parseInt(request.headers['content-length']);
            const maxSize = 10 * 1024 * 1024;
            if (contentLength > maxSize) {
                response_dto_1.ResponseHandler.sendBadRequest('Request payload too large');
            }
        }
    }
    checkForSQLInjection(data, source) {
        if (!data)
            return;
        const checkValue = (value, path) => {
            if (typeof value === 'string' && this.securityService.detectSQLInjection(value)) {
                this.logger.warn(`SQL injection attempt detected in ${source}.${path}: ${value}`);
                response_dto_1.ResponseHandler.sendBadRequest('Invalid input detected');
            }
            else if (typeof value === 'object' && value !== null) {
                Object.keys(value).forEach(key => {
                    checkValue(value[key], `${path}.${key}`);
                });
            }
        };
        Object.keys(data).forEach(key => {
            checkValue(data[key], key);
        });
    }
    checkForXSS(data, source) {
        if (!data)
            return;
        const checkValue = (value, path) => {
            if (typeof value === 'string' && this.securityService.detectXSS(value)) {
                this.logger.warn(`XSS attempt detected in ${source}.${path}: ${value}`);
                response_dto_1.ResponseHandler.sendBadRequest('Invalid input detected');
            }
            else if (typeof value === 'object' && value !== null) {
                Object.keys(value).forEach(key => {
                    checkValue(value[key], `${path}.${key}`);
                });
            }
        };
        Object.keys(data).forEach(key => {
            checkValue(data[key], key);
        });
    }
    logRequest(request) {
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
    logResponse(request, response, startTime, data) {
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
    logError(request, error, startTime) {
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
};
exports.SecurityInterceptor = SecurityInterceptor;
exports.SecurityInterceptor = SecurityInterceptor = SecurityInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [security_service_1.SecurityService])
], SecurityInterceptor);
//# sourceMappingURL=security.interceptor.js.map