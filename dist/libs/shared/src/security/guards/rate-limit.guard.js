"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitGuard = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const response_dto_1 = require("../../dto/response.dto");
let RateLimitGuard = class RateLimitGuard extends throttler_1.ThrottlerGuard {
    async throwThrottlingException(context) {
        const request = context.switchToHttp().getRequest();
        const endpoint = request.route?.path || request.url;
        const ip = request.ip || request.connection.remoteAddress;
        console.warn(`Rate limit exceeded for IP: ${ip}, Endpoint: ${endpoint}, Time: ${new Date().toISOString()}`);
        response_dto_1.ResponseHandler.sendOTPRateLimitError('Too many requests. Please try again later.');
    }
    async getTracker(req) {
        const ip = req.ip || req.connection.remoteAddress;
        const userId = req.user?.userId || 'anonymous';
        const endpoint = req.route?.path || req.url;
        return `${ip}:${userId}:${endpoint}`;
    }
};
exports.RateLimitGuard = RateLimitGuard;
exports.RateLimitGuard = RateLimitGuard = __decorate([
    (0, common_1.Injectable)()
], RateLimitGuard);
//# sourceMappingURL=rate-limit.guard.js.map