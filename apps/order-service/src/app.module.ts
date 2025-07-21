import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule, Order } from '@app/shared';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([Order]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class AppModule {}