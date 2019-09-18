import { IsNotEmpty, IsNumber, IsEmail, IsString, IsInt, IsDateString, Max, Min, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CreateCategorytDto } from './create-category.dto';

export class CreateProductDto {
    @ApiModelProperty({ type: [CreateCategorytDto] })
    @Expose()
    @Type(() => CreateCategorytDto)
    categories: CreateCategorytDto[];

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
    @IsArray()
    colors: string[];

    @ApiModelProperty()
    @Expose()
    @IsArray()
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
    // date: string;

    @ApiModelProperty()
    @Expose()
    @IsDateString()
    createdAt: Date;

    @ApiModelProperty()
    @Expose()
    @IsDateString()
    updatedAt: Date;
}
