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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSanitizationPipe = void 0;
const common_1 = require("@nestjs/common");
const security_service_1 = require("../security.service");
let InputSanitizationPipe = class InputSanitizationPipe {
    constructor(securityService) {
        this.securityService = securityService;
    }
    transform(value, metadata) {
        if (!value || typeof value !== 'object') {
            return this.sanitizeValue(value);
        }
        return this.sanitizeObject(value);
    }
    sanitizeObject(obj) {
        if (Array.isArray(obj)) {
            return obj.map(item => this.sanitizeObject(item));
        }
        if (obj && typeof obj === 'object') {
            const sanitized = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    sanitized[key] = this.sanitizeObject(obj[key]);
                }
            }
            return sanitized;
        }
        return this.sanitizeValue(obj);
    }
    sanitizeValue(value) {
        if (typeof value === 'string') {
            if (this.isEmailField(value)) {
                return this.securityService.sanitizeEmail(value);
            }
            return this.securityService.sanitizeInput(value);
        }
        return value;
    }
    isEmailField(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
};
exports.InputSanitizationPipe = InputSanitizationPipe;
exports.InputSanitizationPipe = InputSanitizationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [security_service_1.SecurityService])
], InputSanitizationPipe);
//# sourceMappingURL=input-sanitization.pipe.js.map