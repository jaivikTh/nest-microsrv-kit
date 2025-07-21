"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const errors_enum_1 = require("../utils/enums/errors.enum");
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    constructor() {
        this.logger = new common_1.Logger(AllExceptionsFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = exception instanceof common_2.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let info = exception instanceof common_2.HttpException ? exception.getResponse() : {};
        this.logger.error(`Exception caught: ${exception instanceof Error ? exception.message : 'Unknown error'}`, exception instanceof Error ? exception.stack : undefined);
        response.status(status).json({
            error: true,
            statusCode: info.statusCode || status,
            errorType: info.errorType || errors_enum_1.HttpError.GENERIC_ERROR,
            message: info.message || (exception instanceof Error ? exception.message : errors_enum_1.HttpError.INTERNAL_SERVER_ERROR),
            data: info.data || null,
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
class errorHandler {
    sendError(error, msg) {
        throw new common_2.HttpException({ message: msg, details: error }, common_1.HttpStatus.OK);
    }
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=all-exception.filter.js.map