import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from '../services';
import { Category } from '../entities';
import { CategoryDto } from '../dtos';
import { plainToClass } from 'class-transformer';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async findAllCategory(): Promise<Category[]> {
        return await this.categoryService.findAllCategory();
    }

    @Post('create')
    async createCategory(@Body() categoryDto: CategoryDto): Promise<Category> {
        return await this.categoryService.createCategory(plainToClass(Category, categoryDto));
    }

    @Get(':id')
    async getOneCategory(@Param('id') id: string): Promise<Category> {
        return await this.categoryService.findOneCategory(id);
    }

    @Put(':id/update')
    async updateCategory(@Param('id') id: string,@Body() categoryDto: CategoryDto): Promise<UpdateResult> {
        return await this.categoryService.updateCategory(id, plainToClass(Category, categoryDto));
    }

    @Delete(':id/delete')
    async deleteCategory(@Param('id') id: string): Promise<DeleteResult> {
        return await this.categoryService.deleteCategory(id);
    }
}
