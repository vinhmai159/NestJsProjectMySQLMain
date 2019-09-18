import { IsNotEmpty, IsNumber, IsEmail, IsString, IsInt, IsDateString, Max, Min, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Product } from 'src/domain/products';

export class AddToCartDto {
    @ApiModelProperty()
    @Expose()
    @IsArray()
    productIds: number[];
}
