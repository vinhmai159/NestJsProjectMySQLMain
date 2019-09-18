import { IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateCategorytDto {
    @ApiModelProperty()
    @Expose()
    @IsNumber()
    id: number;
}
