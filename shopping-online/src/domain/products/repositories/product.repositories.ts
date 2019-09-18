import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityRepository, UpdateResult, DeleteResult } from 'typeorm';
import { Product } from '../entities';
import { ProductDto } from '../dtos';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async findAll(): Promise<Product[]> {
        return await this.createQueryBuilder('Product').getMany();
    }

    async createProduct(product: Product) {
        // return await this.createQueryBuilder('product_categories_category')
        //     .insert()
        //     .into('product_categories_category')
        //     .values([{ productId, categoryId }])
        //     .execute();

        // for( let i = 0; i < product.categories.length; i++) {
        //     await this.createQueryBuilder('product_categories_category')
        //     .insert()
        //     .into('product_categories_category')
        //     .values([{ productId: product.id, categoryId: product.categories[i] }])
        //     .execute();
        // }

        return await this.save(product);
    }

    async saveCategory(productId: Number, categoryId: any): Promise<any> {
        return await this.createQueryBuilder('product_categories_category')
            .insert()
            .into('product_categories_category')
            .values([{ productId: productId, categoryId: categoryId }])
            .execute();
    }

    async findOneById(id?: string): Promise<Product> {
        return await this.createQueryBuilder('product')
            .where('product.id = :id', { id: id })
            .getOne();
    }

    async updateProduct(id: string, product: Product): Promise<UpdateResult> {
        return await this.createQueryBuilder('product')
            .update(Product)
            .set(product)
            .where('product.id = :id', { id: id })
            .execute();
        // return await this.update(id, product);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.createQueryBuilder('product')
            .delete()
            .from(Product)
            .where('product.id = :id', { id: id })
            .execute();
    }

    async search(keyWord: string): Promise<Product[]> {
        return await this.createQueryBuilder('product; ')
            .where('product.name LIKE :keyword', { keyword: '%' + keyWord + '%' })
            .getMany();
    }

    async newProduct(): Promise<Product[]> {
        return await this.createQueryBuilder('product')
            .where('CURRENT_TIMESTAMP - createdAt <= 3600*24')
            .getMany();
    }

    async saleProduct(): Promise<Product[]> {
        return await this.createQueryBuilder('product')
            .where('product.discount > 0')
            .orderBy('product.discount', 'ASC')
            .getMany();
    }
}
