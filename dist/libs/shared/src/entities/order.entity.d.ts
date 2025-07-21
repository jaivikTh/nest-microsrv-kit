import { Model } from 'sequelize-typescript';
import { User } from './user.entity';
export declare class Order extends Model<Order> {
    id: number;
    product: string;
    amount: number;
    userId: number;
    user: User;
}
