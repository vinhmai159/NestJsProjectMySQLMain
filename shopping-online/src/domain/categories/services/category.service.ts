import { Injectable } from '@nestjs/common';
import { ICategoryService } from '../interfaces';
import { Category } from '../entities';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CategoryRepository } from '../repositories';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService implements ICategoryService {
    constructor(
        @InjectRepository(CategoryRepository)
        private readonly categoryRepository: CategoryRepository
    ) {}

    async findAllCategory(): Promise<Category[]> {
        return await this.categoryRepository.findAllCategory();
    }

    async findOneCategory(id: string): Promise<Category> {
        return await this.categoryRepository.getCategoryById(id);
    }

    async createCategory(category: Category): Promise<Category> {
        return await this.categoryRepository.createCategory(category);
    }

    async updateCategory(id: string, category: Category): Promise<UpdateResult> {
        return await this.categoryRepository.updateCategory(id, category);
    }

    async deleteCategory(id: string): Promise<DeleteResult> {
        return await this.categoryRepository.deleteCategory(id);
    }
}
