import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule, AuthModule, JwtAuthGuard } from '@app/shared';
import { UserController } from './controllers/user.controller';
import { OrderController } from './controllers/order.controller';
import { HealthController } from './controllers/health.controller';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.USER_SERVICE_PORT) || 3001,
        },
      },
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.ORDER_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.ORDER_SERVICE_PORT) || 3002,
        },
      },
    ]),
  ],
  controllers: [UserController, OrderController, HealthController, AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}