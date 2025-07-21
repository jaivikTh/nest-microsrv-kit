export declare enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED",
    PENDING = "PENDING",
    DELETED = "DELETED"
}
export declare enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
    FAILED = "FAILED"
}
export declare enum PaymentStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
    PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED"
}
export declare enum ApiStatus {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    PENDING = "PENDING",
    TIMEOUT = "TIMEOUT",
    MAINTENANCE = "MAINTENANCE"
}
export declare enum ServiceStatus {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE",
    DEGRADED = "DEGRADED",
    MAINTENANCE = "MAINTENANCE",
    ERROR = "ERROR"
}
