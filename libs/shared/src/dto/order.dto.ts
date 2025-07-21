import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsPositive, Min, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The name of the product being ordered',
    example: 'MacBook Pro 16"',
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  product: string;

  @ApiProperty({
    description: 'The amount/price of the order',
    example: 2499.99,
    minimum: 0.01,
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: 'The ID of the user placing the order',
    example: 1,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  userId: number;
}

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'The name of the product being ordered',
    example: 'MacBook Pro 14"',
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  product?: string;

  @ApiPropertyOptional({
    description: 'The amount/price of the order',
    example: 1999.99,
    minimum: 0.01,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount?: number;
}

export class OrderResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the order',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the product being ordered',
    example: 'MacBook Pro 16"',
  })
  product: string;

  @ApiProperty({
    description: 'The amount/price of the order',
    example: '2499.99',
  })
  amount: string;

  @ApiProperty({
    description: 'The ID of the user who placed the order',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'The date when the order was created',
    example: '2025-07-18T07:54:33.277Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the order was last updated',
    example: '2025-07-18T07:54:33.277Z',
  })
  updatedAt: Date;
}