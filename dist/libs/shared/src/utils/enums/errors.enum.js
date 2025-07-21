"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
var HttpError;
(function (HttpError) {
    HttpError["GENERIC_ERROR"] = "GENERIC_ERROR";
    HttpError["INTERNAL_SERVER_ERROR"] = "Internal Server Error";
    HttpError["BAD_REQUEST"] = "Bad Request";
    HttpError["UNAUTHORIZED"] = "Unauthorized";
    HttpError["FORBIDDEN"] = "Forbidden";
    HttpError["NOT_FOUND"] = "Not Found";
    HttpError["FOUND"] = "Found";
    HttpError["VALIDATION_ERROR"] = "Validation Error";
    HttpError["DATABASE_ERROR"] = "Database Error";
    HttpError["AUTHENTICATION_ERROR"] = "Authentication Error";
    HttpError["AUTHORIZATION_ERROR"] = "Authorization Error";
})(HttpError || (exports.HttpError = HttpError = {}));
//# sourceMappingURL=errors.enum.js.map