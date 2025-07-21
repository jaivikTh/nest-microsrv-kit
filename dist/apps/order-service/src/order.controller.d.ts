import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from '@app/shared';
export declare class OrderController {
    private readonly orderService;
    private readonly logger;
    constructor(orderService: OrderService);
    createOrder(data: CreateOrderDto): Promise<import("@app/shared").Order>;
    getOrders(): Promise<import("@app/shared").Order[]>;
    getOrder(data: {
        id: number;
    }): Promise<import("@app/shared").Order>;
    getUserOrders(data: {
        userId: number;
    }): Promise<import("@app/shared").Order[]>;
    updateOrder(data: {
        id: number;
    } & UpdateOrderDto): Promise<[number, import("@app/shared").Order[]]>;
    deleteOrder(data: {
        id: number;
    }): Promise<number>;
}
