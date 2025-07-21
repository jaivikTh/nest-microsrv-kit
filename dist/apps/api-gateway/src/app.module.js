"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const shared_1 = require("../../../libs/shared/src");
const user_controller_1 = require("./controllers/user.controller");
const order_controller_1 = require("./controllers/order.controller");
const health_controller_1 = require("./controllers/health.controller");
const auth_controller_1 = require("./controllers/auth.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_1.DatabaseModule,
            shared_1.AuthModule,
            microservices_1.ClientsModule.register([
                {
                    name: 'USER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.USER_SERVICE_HOST || 'localhost',
                        port: parseInt(process.env.USER_SERVICE_PORT) || 3001,
                    },
                },
                {
                    name: 'ORDER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.ORDER_SERVICE_HOST || 'localhost',
                        port: parseInt(process.env.ORDER_SERVICE_PORT) || 3002,
                    },
                },
            ]),
        ],
        controllers: [user_controller_1.UserController, order_controller_1.OrderController, health_controller_1.HealthController, auth_controller_1.AuthController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: shared_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map