"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelmetConfigService = void 0;
const common_1 = require("@nestjs/common");
let HelmetConfigService = class HelmetConfigService {
    getHelmetConfig() {
        return {
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
                    fontSrc: ["'self'", 'https://fonts.gstatic.com'],
                    imgSrc: ["'self'", 'data:', 'https:'],
                    scriptSrc: ["'self'"],
                    objectSrc: ["'none'"],
                    upgradeInsecureRequests: [],
                },
            },
            crossOriginEmbedderPolicy: false,
            hsts: {
                maxAge: 31536000,
                includeSubDomains: true,
                preload: true,
            },
            noSniff: true,
            frameguard: { action: 'deny' },
            xssFilter: true,
            referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
            permissionsPolicy: {
                features: {
                    geolocation: [],
                    microphone: [],
                    camera: [],
                    payment: [],
                    usb: [],
                },
            },
        };
    }
};
exports.HelmetConfigService = HelmetConfigService;
exports.HelmetConfigService = HelmetConfigService = __decorate([
    (0, common_1.Injectable)()
], HelmetConfigService);
//# sourceMappingURL=helmet-config.service.js.map