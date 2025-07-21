export declare class CreateOrderDto {
    product: string;
    amount: number;
    userId: number;
}
export declare class UpdateOrderDto {
    product?: string;
    amount?: number;
}
export declare class OrderResponseDto {
    id: number;
    product: string;
    amount: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}
