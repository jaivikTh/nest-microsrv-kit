"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordUtil = void 0;
const bcrypt = require("bcrypt");
class PasswordUtil {
    static async hashPassword(password) {
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }
    static async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
    static validatePasswordStrength(password) {
        const errors = [];
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        if (!/(?=.*[a-z])/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (!/(?=.*\d)/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        if (!/(?=.*[@$!%*?&])/.test(password)) {
            errors.push('Password must contain at least one special character (@$!%*?&)');
        }
        return {
            isValid: errors.length === 0,
            errors,
        };
    }
}
exports.PasswordUtil = PasswordUtil;
PasswordUtil.SALT_ROUNDS = 12;
//# sourceMappingURL=password.util.js.map