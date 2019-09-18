import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserService } from '../services';
import { UsreDto, AddToCartDto } from '../dtos';
import { User } from '../entities';
import { Product } from '../../products/entities';
import { UpdateResult } from 'typeorm';
import { Jwt, AuthGuard, Mapper } from '../../../common';
import { ProductDto, CreateProductC2Dto } from '../../products/dtos';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('user')
@ApiBearerAuth()
export class UserController {
    constructor(private userService: UserService) {}

    @Post('login')
    async logIn(@Body('email') email: string, @Body('password') password: string): Promise<any> {
        return await this.userService.logIn(email, password);
    }

    @Post('resgister')
    async signIn(@Body() userDto: UsreDto): Promise<User> {
        return await this.userService.signIn(plainToClass(User, userDto));
    }

    @Post('addtocart')
    @UseGuards(AuthGuard)
    async addToCart(@Jwt() user, @Body('productIds') productIds: AddToCartDto[]): Promise<any> {
        // return await this.userService.addToCart(
        //     Mapper.toEntity(User, user),
        //     dto.productIds
        // );
        return await this.userService.addToCart(user, plainToClass(Number, productIds));
    }

    @Post('removetocart')
    @UseGuards(AuthGuard)
    async removeToCart(@Jwt() user, @Body() productDto: ProductDto): Promise<any> {
        return await this.userService.removeToCart(plainToClass(User, user), plainToClass(Product, productDto));
    }

    @Get('showcart')
    @UseGuards(AuthGuard)
    async showCart(@Jwt() user): Promise<any[]> {
        return await this.userService.showCart(user);
    }
}
