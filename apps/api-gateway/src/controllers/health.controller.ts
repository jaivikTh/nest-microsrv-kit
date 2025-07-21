import { Controller, Get, Res, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { Public, ResponseHandler } from '@app/shared';
import { Response } from 'express';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);
  @Public()
  @Get()
  @ApiOperation({
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
  })
  @ApiOkResponse({
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
  })
  @ApiInternalServerErrorResponse({
    description: 'Service is experiencing issues',
  })
  async check(@Res() res: Response) {
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

      return ResponseHandler.sendSuccess('Service is healthy', healthData, res);
    } catch (error) {
      this.logger.error(`Health check failed: ${error.message}`);
      ResponseHandler.sendError(error);
    }
  }
}