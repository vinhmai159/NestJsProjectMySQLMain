import { IsNotEmpty, IsNumber, IsEmail, IsEnum, IsString, IsInt, IsDateString } from 'class-validator';

export enum Role {
    visitor = 'visitor',
    user = 'user',
    author = 'author',
    editor = 'editor',
    admin = 'admin',
}

export class UsreDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    address: Array<string>;
    
    @IsNotEmpty()
    @IsInt()
    phone: Array<string>;

    @IsString()
    cart;
    
    @IsEnum(Role)
    role;

    @IsDateString()
    public date: Date;

    @IsDateString()
    public createdAt: Date;

    @IsDateString()
    public updatedAt: Date;
}