import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from '../services';
import { Product } from '../entities';
import { ProductDto, CreateProductDto } from '../dtos';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Jwt, AuthGuard, Mapper, RolesGuard } from '../../../common';
import { plainToClass } from 'class-transformer';
import { Roles } from '../../../common/decorator';

@Controller('product')
// @UseGuards(AuthGuard)
// @UseGuards(RolesGuard)

@UseGuards(AuthGuard, RolesGuard)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @Roles('user')
    async findAll(@Jwt() user): Promise<Product[]> {
        console.log(user);
        return this.productService.findAll();
    }

    @Post('create')
    async create(@Body() productDto: CreateProductDto): Promise<Product> {
        // const product = this.productService.createProduct(Mapper.toEntity(Product, productDto));
        // return Mapper.toDto(ProductDto, product);

        return await this.productService.createProduct(plainToClass(Product, productDto));
    }

    @Get(':id/view')
    async findOne(@Param('id') id?: string): Promise<Product> {
        return this.productService.findOne(id);
    }

    @Put(':id/update')
    async update(@Param('id') id: string, @Body() productDto: ProductDto): Promise<UpdateResult> {
        return this.productService.update(id, Mapper.toEntity(Product, productDto));
    }

    @Delete(':id/delete')
    async delete(@Param('id') id: string): Promise<DeleteResult> {
        return this.productService.delete(id);
    }

    @Post('/search')
    async serach(@Body('keyWord') keyWord: string): Promise<Product[]> {
        return this.productService.searchProducts(keyWord);
    }

    @Get('/new')
    async newProduct(): Promise<Product[]> {
        return this.productService.newProduct();
    }

    @Get('sale')
    async sale(): Promise<Product[]> {
        return await this.productService.saleProduct();
    }
}
