import { Model } from 'sequelize-typescript';
import { Order } from './order.entity';
export declare class User extends Model<User> {
    id: number;
    name: string;
    email: string;
    password: string;
    orders: Order[];
}
