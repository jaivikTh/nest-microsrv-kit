"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsConfigService = void 0;
const common_1 = require("@nestjs/common");
let CorsConfigService = class CorsConfigService {
    getCorsConfig() {
        const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:8080',
            'https://yourdomain.com',
        ];
        return {
            origin: (origin, callback) => {
                if (!origin)
                    return callback(null, true);
                if (allowedOrigins.includes(origin)) {
                    callback(null, true);
                }
                else {
                    console.warn(`CORS blocked origin: ${origin}`);
                    callback(new Error('Not allowed by CORS'), false);
                }
            },
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'Authorization',
                'X-API-Key',
                'X-CSRF-Token',
            ],
            exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
            credentials: true,
            maxAge: 86400,
            preflightContinue: false,
            optionsSuccessStatus: 204,
        };
    }
};
exports.CorsConfigService = CorsConfigService;
exports.CorsConfigService = CorsConfigService = __decorate([
    (0, common_1.Injectable)()
], CorsConfigService);
//# sourceMappingURL=cors-config.service.js.map