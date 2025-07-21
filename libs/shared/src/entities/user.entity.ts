import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Order } from './order.entity';
import { UserModel } from '../utils/model.constants';

@Table({
  tableName: UserModel,
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Order)
  orders: Order[];
}