import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { SecurityService } from './security.service';
import { RateLimitGuard } from './guards/rate-limit.guard';
import { SecurityInterceptor } from './interceptors/security.interceptor';
import { InputSanitizationPipe } from './pipes/input-sanitization.pipe';
import { CorsConfigService } from './services/cors-config.service';
import { HelmetConfigService } from './services/helmet-config.service';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 second
        limit: 3, // 3 requests per second
      },
      {
        name: 'medium',
        ttl: 10000, // 10 seconds
        limit: 20, // 20 requests per 10 seconds
      },
      {
        name: 'long',
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),
  ],
  providers: [
    SecurityService,
    RateLimitGuard,
    SecurityInterceptor,
    InputSanitizationPipe,
    CorsConfigService,
    HelmetConfigService,
  ],
  exports: [
    SecurityService,
    RateLimitGuard,
    SecurityInterceptor,
    InputSanitizationPipe,
    CorsConfigService,
    HelmetConfigService,
    ThrottlerModule,
  ],
})
export class SecurityModule {}