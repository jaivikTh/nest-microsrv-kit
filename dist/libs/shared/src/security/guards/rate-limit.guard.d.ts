import { ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
export declare class RateLimitGuard extends ThrottlerGuard {
    protected throwThrottlingException(context: ExecutionContext): Promise<void>;
    protected getTracker(req: Record<string, any>): Promise<string>;
}
