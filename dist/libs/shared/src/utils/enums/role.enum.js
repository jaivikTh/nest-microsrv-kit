"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceType = exports.AccessLevel = exports.Permission = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["MANAGER"] = "MANAGER";
    UserRole["USER"] = "USER";
    UserRole["GUEST"] = "GUEST";
})(UserRole || (exports.UserRole = UserRole = {}));
var Permission;
(function (Permission) {
    Permission["CREATE_USER"] = "CREATE_USER";
    Permission["READ_USER"] = "READ_USER";
    Permission["UPDATE_USER"] = "UPDATE_USER";
    Permission["DELETE_USER"] = "DELETE_USER";
    Permission["CREATE_ORDER"] = "CREATE_ORDER";
    Permission["READ_ORDER"] = "READ_ORDER";
    Permission["UPDATE_ORDER"] = "UPDATE_ORDER";
    Permission["DELETE_ORDER"] = "DELETE_ORDER";
    Permission["MANAGE_SYSTEM"] = "MANAGE_SYSTEM";
    Permission["VIEW_ANALYTICS"] = "VIEW_ANALYTICS";
    Permission["MANAGE_ROLES"] = "MANAGE_ROLES";
    Permission["EXPORT_DATA"] = "EXPORT_DATA";
})(Permission || (exports.Permission = Permission = {}));
var AccessLevel;
(function (AccessLevel) {
    AccessLevel["PUBLIC"] = "PUBLIC";
    AccessLevel["AUTHENTICATED"] = "AUTHENTICATED";
    AccessLevel["AUTHORIZED"] = "AUTHORIZED";
    AccessLevel["ADMIN_ONLY"] = "ADMIN_ONLY";
    AccessLevel["SUPER_ADMIN_ONLY"] = "SUPER_ADMIN_ONLY";
})(AccessLevel || (exports.AccessLevel = AccessLevel = {}));
var ResourceType;
(function (ResourceType) {
    ResourceType["USER"] = "USER";
    ResourceType["ORDER"] = "ORDER";
    ResourceType["PRODUCT"] = "PRODUCT";
    ResourceType["PAYMENT"] = "PAYMENT";
    ResourceType["SYSTEM"] = "SYSTEM";
    ResourceType["ANALYTICS"] = "ANALYTICS";
})(ResourceType || (exports.ResourceType = ResourceType = {}));
//# sourceMappingURL=role.enum.js.map