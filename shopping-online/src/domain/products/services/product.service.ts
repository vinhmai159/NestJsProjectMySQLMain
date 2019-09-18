import { Injectable } from '@nestjs/common';
import { IProductService } from '../interfaces';
import { Product } from '../entities';
import { ProductRepository } from '../repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductService implements IProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private readonly productRepository: ProductRepository
    ) {}

    async findAll(): Promise<Product[]> {
        return await this.productRepository.findAll();
    }

    async createProduct(product: Product): Promise<Product> {
        product.salePrice = product.price * product.discount;
        let save = await this.productRepository.createProduct(product);

        for( let i = 0; i < product.categories.length; i++) {
            await this.productRepository.saveCategory(product.id, product.categories[i]);
            console.log('a\n');
        }

        return save;
    }

    async findOne(id?: string): Promise<Product> {
        return this.productRepository.findOneById(id);
    }

    async update(id: string, product: Product): Promise<UpdateResult> {
        return await this.productRepository.updateProduct(id, product);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.productRepository.delete(id);
    }

    async searchProducts(keyWord: string): Promise<Product[]> {
        return await this.productRepository.search(keyWord);
    }

    async newProduct(): Promise<Product[]> {
        return await this.productRepository.newProduct();
    }

    async saleProduct(): Promise<Product[]> {
        return await this.productRepository.saleProduct();
    }

    hotProduct(): Promise<Product[]> {
        throw new Error('Method not implemented.');
    }
}
