import { EntityRepository, Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Category } from '../entities';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    async findAllCategory(): Promise<Category[]> {
        return await this.createQueryBuilder('category').getMany();
    }

    async getCategoryById(id: string): Promise<Category> {
        return await this.createQueryBuilder('category')
            .where('category.id = :id', { id: id })
            .getOne();
    }

    async createCategory(category: Category): Promise<Category> {
        return await this.save(category);
    }

    async updateCategory(id: string, category: Category): Promise<UpdateResult> {
        return await this.createQueryBuilder('category')
            .update(Category)
            .set(category)
            .where('category.id = :id', { id: id })
            .execute();

        // this.save(category);
    }

    async deleteCategory(id: string): Promise<DeleteResult> {
        return await this.createQueryBuilder('category')
            .delete()
            .where('category.id = :id', { id: id })
            .execute();
    }
}
