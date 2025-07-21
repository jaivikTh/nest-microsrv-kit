import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderRequestDto {
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
}