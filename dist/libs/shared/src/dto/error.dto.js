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
exports.ConflictErrorResponseDto = exports.InternalServerErrorResponseDto = exports.NotFoundErrorResponseDto = exports.ValidationErrorResponseDto = exports.ErrorResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ErrorResponseDto {
}
exports.ErrorResponseDto = ErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTTP status code',
        example: 400,
    }),
    __metadata("design:type", Number)
], ErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error message or array of validation errors',
        example: 'Bad Request',
        oneOf: [
            { type: 'string' },
            { type: 'array', items: { type: 'string' } }
        ],
    }),
    __metadata("design:type", Object)
], ErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error type',
        example: 'Bad Request',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "error", void 0);
class ValidationErrorResponseDto {
}
exports.ValidationErrorResponseDto = ValidationErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTTP status code',
        example: 400,
    }),
    __metadata("design:type", Number)
], ValidationErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of validation error messages',
        example: ['name should not be empty', 'email must be an email'],
        type: [String],
    }),
    __metadata("design:type", Array)
], ValidationErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error type',
        example: 'Bad Request',
    }),
    __metadata("design:type", String)
], ValidationErrorResponseDto.prototype, "error", void 0);
class NotFoundErrorResponseDto {
}
exports.NotFoundErrorResponseDto = NotFoundErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTTP status code',
        example: 404,
    }),
    __metadata("design:type", Number)
], NotFoundErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error message',
        example: 'User not found',
    }),
    __metadata("design:type", String)
], NotFoundErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error type',
        example: 'Not Found',
    }),
    __metadata("design:type", String)
], NotFoundErrorResponseDto.prototype, "error", void 0);
class InternalServerErrorResponseDto {
}
exports.InternalServerErrorResponseDto = InternalServerErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTTP status code',
        example: 500,
    }),
    __metadata("design:type", Number)
], InternalServerErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error message',
        example: 'Internal server error',
    }),
    __metadata("design:type", String)
], InternalServerErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error type',
        example: 'Internal Server Error',
    }),
    __metadata("design:type", String)
], InternalServerErrorResponseDto.prototype, "error", void 0);
class ConflictErrorResponseDto {
}
exports.ConflictErrorResponseDto = ConflictErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTTP status code',
        example: 409,
    }),
    __metadata("design:type", Number)
], ConflictErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error message',
        example: 'Email already exists',
    }),
    __metadata("design:type", String)
], ConflictErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error type',
        example: 'Conflict',
    }),
    __metadata("design:type", String)
], ConflictErrorResponseDto.prototype, "error", void 0);
//# sourceMappingURL=error.dto.js.map