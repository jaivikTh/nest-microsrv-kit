"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceStatus = exports.ApiStatus = exports.PaymentStatus = exports.OrderStatus = exports.UserStatus = void 0;
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "ACTIVE";
    UserStatus["INACTIVE"] = "INACTIVE";
    UserStatus["SUSPENDED"] = "SUSPENDED";
    UserStatus["PENDING"] = "PENDING";
    UserStatus["DELETED"] = "DELETED";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["CONFIRMED"] = "CONFIRMED";
    OrderStatus["PROCESSING"] = "PROCESSING";
    OrderStatus["SHIPPED"] = "SHIPPED";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
    OrderStatus["REFUNDED"] = "REFUNDED";
    OrderStatus["FAILED"] = "FAILED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["PROCESSING"] = "PROCESSING";
    PaymentStatus["COMPLETED"] = "COMPLETED";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["CANCELLED"] = "CANCELLED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
    PaymentStatus["PARTIALLY_REFUNDED"] = "PARTIALLY_REFUNDED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var ApiStatus;
(function (ApiStatus) {
    ApiStatus["SUCCESS"] = "SUCCESS";
    ApiStatus["ERROR"] = "ERROR";
    ApiStatus["PENDING"] = "PENDING";
    ApiStatus["TIMEOUT"] = "TIMEOUT";
    ApiStatus["MAINTENANCE"] = "MAINTENANCE";
})(ApiStatus || (exports.ApiStatus = ApiStatus = {}));
var ServiceStatus;
(function (ServiceStatus) {
    ServiceStatus["ONLINE"] = "ONLINE";
    ServiceStatus["OFFLINE"] = "OFFLINE";
    ServiceStatus["DEGRADED"] = "DEGRADED";
    ServiceStatus["MAINTENANCE"] = "MAINTENANCE";
    ServiceStatus["ERROR"] = "ERROR";
})(ServiceStatus || (exports.ServiceStatus = ServiceStatus = {}));
//# sourceMappingURL=status.enum.js.map