"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityModule = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const security_service_1 = require("./security.service");
const rate_limit_guard_1 = require("./guards/rate-limit.guard");
const security_interceptor_1 = require("./interceptors/security.interceptor");
const input_sanitization_pipe_1 = require("./pipes/input-sanitization.pipe");
const cors_config_service_1 = require("./services/cors-config.service");
const helmet_config_service_1 = require("./services/helmet-config.service");
let SecurityModule = class SecurityModule {
};
exports.SecurityModule = SecurityModule;
exports.SecurityModule = SecurityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: 'short',
                    ttl: 1000,
                    limit: 3,
                },
                {
                    name: 'medium',
                    ttl: 10000,
                    limit: 20,
                },
                {
                    name: 'long',
                    ttl: 60000,
                    limit: 100,
                },
            ]),
        ],
        providers: [
            security_service_1.SecurityService,
            rate_limit_guard_1.RateLimitGuard,
            security_interceptor_1.SecurityInterceptor,
            input_sanitization_pipe_1.InputSanitizationPipe,
            cors_config_service_1.CorsConfigService,
            helmet_config_service_1.HelmetConfigService,
        ],
        exports: [
            security_service_1.SecurityService,
            rate_limit_guard_1.RateLimitGuard,
            security_interceptor_1.SecurityInterceptor,
            input_sanitization_pipe_1.InputSanitizationPipe,
            cors_config_service_1.CorsConfigService,
            helmet_config_service_1.HelmetConfigService,
            throttler_1.ThrottlerModule,
        ],
    })
], SecurityModule);
//# sourceMappingURL=security.module.js.map