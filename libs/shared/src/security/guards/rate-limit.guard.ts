import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ResponseHandler } from '../../dto/response.dto';

@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  protected async throwThrottlingException(context: ExecutionContext): Promise<void> {
    const request = context.switchToHttp().getRequest();
    const endpoint = request.route?.path || request.url;
    const ip = request.ip || request.connection.remoteAddress;
    
    // Log rate limit violation
    console.warn(`Rate limit exceeded for IP: ${ip}, Endpoint: ${endpoint}, Time: ${new Date().toISOString()}`);
    
    // Use custom response handler
    ResponseHandler.sendOTPRateLimitError(
      'Too many requests. Please try again later.'
    );
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    // Create unique tracker based on IP and user ID (if authenticated)
    const ip = req.ip || req.connection.remoteAddress;
    const userId = req.user?.userId || 'anonymous';
    const endpoint = req.route?.path || req.url;
    
    return `${ip}:${userId}:${endpoint}`;
  }
}