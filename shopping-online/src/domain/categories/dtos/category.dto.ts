import { IsNotEmpty, IsDateString, IsString, IsNumber } from 'class-validator';

export class CategoryDto{
    @IsNotEmpty()
    @IsNumber()
    id: number;
    
    @IsNotEmpty()
    @IsString()
    categories: string[];

    @IsNotEmpty()
    @IsString()
    parentCategories: string;

    @IsDateString()
    public date: Date;

    @IsDateString()
    public createdAt: Date;

    @IsDateString()
    public updatedAt: Date;
}