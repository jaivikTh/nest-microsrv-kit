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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var HealthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shared_1 = require("../../../../libs/shared/src");
let HealthController = HealthController_1 = class HealthController {
    constructor() {
        this.logger = new common_1.Logger(HealthController_1.name);
    }
    async check(res) {
        try {
            this.logger.log('Health check requested');
            const uptime = process.uptime();
            const healthData = {
                status: 'ok',
                timestamp: new Date().toISOString(),
                service: 'api-gateway',
                uptime: uptime,
                version: process.env.npm_package_version || '1.0.0',
                environment: process.env.NODE_ENV || 'development',
                memory: {
                    used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
                    total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
                    unit: 'MB'
                }
            };
            return shared_1.ResponseHandler.sendSuccess('Service is healthy', healthData, res);
        }
        catch (error) {
            this.logger.error(`Health check failed: ${error.message}`);
            shared_1.ResponseHandler.sendError(error);
        }
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, shared_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Health check endpoint',
        description: `
      Returns the current health status of the API Gateway service.
      
      **Purpose:**
      - Monitor service availability
      - Load balancer health checks
      - System monitoring and alerting
      - Service discovery health verification
      
      **Response:**
      - Always returns 200 OK if the service is running
      - Includes timestamp for request tracking
      - Service identifier for multi-service environments
      
      **Use Cases:**
      - Kubernetes liveness/readiness probes
      - Load balancer health checks
      - Monitoring system integration
      - Service mesh health verification
    `,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Service is healthy and operational',
        schema: {
            type: 'object',
            properties: {
                status: {
                    type: 'string',
                    example: 'ok',
                    description: 'Health status indicator'
                },
                timestamp: {
                    type: 'string',
                    format: 'date-time',
                    example: '2025-07-18T07:53:59.561Z',
                    description: 'ISO timestamp when health check was performed'
                },
                service: {
                    type: 'string',
                    example: 'api-gateway',
                    description: 'Service identifier'
                },
                uptime: {
                    type: 'number',
                    example: 3600.123,
                    description: 'Service uptime in seconds'
                },
                version: {
                    type: 'string',
                    example: '1.0.0',
                    description: 'Service version'
                }
            },
            required: ['status', 'timestamp', 'service']
        }
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Service is experiencing issues',
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "check", null);
exports.HealthController = HealthController = HealthController_1 = __decorate([
    (0, swagger_1.ApiTags)('Health'),
    (0, common_1.Controller)('health')
], HealthController);
//# sourceMappingURL=health.controller.js.map