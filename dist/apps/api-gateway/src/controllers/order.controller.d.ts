import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderRequestDto, UpdateOrderDto } from '@app/shared';
import { Response } from 'express';
export declare class OrderController {
    private orderService;
    private readonly logger;
    constructor(orderService: ClientProxy);
    createOrder(createOrderRequestDto: CreateOrderRequestDto, user: any, res: Response): Promise<any>;
    getOrders(user: any, res: Response): Promise<any>;
    getOrder(id: number, user: any, res: Response): Promise<any>;
    getUserOrders(userId: number, user: any, res: Response): Promise<any>;
    updateOrder(id: number, updateOrderDto: UpdateOrderDto, user: any, res: Response): Promise<any>;
    deleteOrder(id: number, user: any, res: Response): Promise<any>;
}
