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
exports.OrderResponseDto = exports.UpdateOrderDto = exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the product being ordered',
        example: 'MacBook Pro 16"',
        minLength: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The amount/price of the order',
        example: 2499.99,
        minimum: 0.01,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the user placing the order',
        example: 1,
        minimum: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "userId", void 0);
class UpdateOrderDto {
}
exports.UpdateOrderDto = UpdateOrderDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The name of the product being ordered',
        example: 'MacBook Pro 14"',
        minLength: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The amount/price of the order',
        example: 1999.99,
        minimum: 0.01,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UpdateOrderDto.prototype, "amount", void 0);
class OrderResponseDto {
}
exports.OrderResponseDto = OrderResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unique identifier of the order',
        example: 1,
    }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the product being ordered',
        example: 'MacBook Pro 16"',
    }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The amount/price of the order',
        example: '2499.99',
    }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the user who placed the order',
        example: 1,
    }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date when the order was created',
        example: '2025-07-18T07:54:33.277Z',
    }),
    __metadata("design:type", Date)
], OrderResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date when the order was last updated',
        example: '2025-07-18T07:54:33.277Z',
    }),
    __metadata("design:type", Date)
], OrderResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=order.dto.js.map