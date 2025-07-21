"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
const common_1 = require("@nestjs/common");
const errors_enum_1 = require("../utils/enums/errors.enum");
const crypto = require("crypto");
class ResponseHandler {
    static symEncrypt(text, algorithm, key) {
        let iv = Buffer.from(crypto.randomBytes(16));
        console.log('Generated IV:', iv.toString('hex'), 'Length:', iv.length);
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return `${iv.toString('hex')}:${encrypted}`;
    }
    static symDecrypt(encryptedText, algorithm, key) {
        const [ivHex, encrypted] = encryptedText.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        console.log('Received IV:', iv.toString('hex'), 'Length:', iv.length);
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encrypted, 'base64', 'utf8');
        console.log(decrypted);
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    static sendSuccess(message, data, res) {
        res.status(common_1.HttpStatus.OK).json({
            error: false,
            statusCode: common_1.HttpStatus.OK,
            message: message,
            data: data,
        });
    }
    static sendCreated(message, data, res) {
        res.status(common_1.HttpStatus.CREATED).json({
            error: false,
            statusCode: common_1.HttpStatus.CREATED,
            message: message,
            data: data,
        });
    }
    static sendFound(message) {
        throw new common_1.HttpException({
            statusCode: common_1.HttpStatus.FOUND,
            errorType: errors_enum_1.HttpError.FOUND,
            message: message,
            data: null,
        }, common_1.HttpStatus.FOUND);
    }
    static sendNotFound(message, errorType) {
        throw new common_1.HttpException({
            statusCode: common_1.HttpStatus.NOT_FOUND,
            errorType: errors_enum_1.HttpError.NOT_FOUND,
            message: message,
            data: null,
        }, common_1.HttpStatus.NOT_FOUND);
    }
    static sendBadRequest(message) {
        throw new common_1.HttpException({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            errorType: errors_enum_1.HttpError.BAD_REQUEST,
            message: message,
            data: null,
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    static sendUnAuthorised(message) {
        throw new common_1.HttpException({
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
            errorType: errors_enum_1.HttpError.UNAUTHORIZED,
            message: message,
            data: null,
        }, common_1.HttpStatus.UNAUTHORIZED);
    }
    static sendForbidden(message) {
        throw new common_1.HttpException({
            statusCode: common_1.HttpStatus.FORBIDDEN,
            errorType: errors_enum_1.HttpError.FORBIDDEN,
            message: message,
            data: null,
        }, common_1.HttpStatus.FORBIDDEN);
    }
    static sendInternalServerError(message) {
        throw new common_1.HttpException({
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            errorType: errors_enum_1.HttpError.INTERNAL_SERVER_ERROR,
            message: message,
            data: null,
        }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    static sendValidationError(message) {
        throw new common_1.HttpException({
            statusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
            errorType: errors_enum_1.HttpError.VALIDATION_ERROR,
            message: message,
            data: null,
        }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
    static sendOTPRateLimitError(message) {
        throw new common_1.HttpException({
            statusCode: common_1.HttpStatus.TOO_MANY_REQUESTS,
            errorType: errors_enum_1.HttpError.VALIDATION_ERROR,
            message: message,
            data: null,
        }, common_1.HttpStatus.TOO_MANY_REQUESTS);
    }
    static sendError(err) {
        switch (err.status) {
            case common_1.HttpStatus.UNPROCESSABLE_ENTITY:
                this.sendValidationError(err.message);
                break;
            case common_1.HttpStatus.INTERNAL_SERVER_ERROR:
                this.sendInternalServerError(err.message);
                break;
            case common_1.HttpStatus.FORBIDDEN:
                this.sendForbidden(err.message);
                break;
            case common_1.HttpStatus.UNAUTHORIZED:
                this.sendUnAuthorised(err.message);
                break;
            case common_1.HttpStatus.BAD_REQUEST:
                this.sendBadRequest(err.message);
                break;
            case common_1.HttpStatus.NOT_FOUND:
                this.sendNotFound(err.message);
                break;
            case common_1.HttpStatus.FOUND:
                this.sendFound(err.message);
                break;
            case common_1.HttpStatus.TOO_MANY_REQUESTS:
                this.sendOTPRateLimitError(err.message);
                break;
            default:
                this.sendInternalServerError(err.message);
                break;
        }
    }
    static sendResponse(message, result) {
        return { result, message };
    }
}
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=response.dto.js.map