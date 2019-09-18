import { IsNotEmpty, IsNumber, IsEmail, IsString, IsInt, IsDateString, Max, Min } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductDto {
    @ApiModelProperty()
    @Expose()
    @IsNumber()
    categories: number[];

    @ApiModelProperty()
    @Expose()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiModelProperty()
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiModelProperty()
    @Expose()
    @IsNotEmpty()
    @IsInt()
    amounts: number;

    @ApiModelProperty()
    @Expose()
    @IsNumber()
    salePrice: number;

    @ApiModelProperty()
    @Expose()
    @IsString()
    colors: string[];

    @ApiModelProperty()
    @Expose()
    @IsString()
    sizes: string[];

    @ApiModelProperty()
    @Expose()
    @IsNumber()
    @Max(1)
    @Min(0)
    discount: number;

    @ApiModelProperty()
    @Expose()
    @IsNumber()
    hot: number;

    // @ApiModelProperty()
    // @Expose()
    // @IsDateString()
    // date: Date;

    @ApiModelProperty()
    @Expose()
    @IsDateString()
    createdAt: Date;

    @ApiModelProperty()
    @Expose()
    @IsDateString()
    updatedAt: Date;
}
