import { Order, CreateOrderDto, UpdateOrderDto } from '@app/shared';
export declare class OrderService {
    private orderEntity;
    private readonly logger;
    constructor(orderEntity: typeof Order);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    findByUserId(userId: number): Promise<Order[]>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<[number, Order[]]>;
    remove(id: number): Promise<number>;
}
