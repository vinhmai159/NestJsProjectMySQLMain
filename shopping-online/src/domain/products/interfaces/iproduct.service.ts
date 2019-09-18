import { Product } from '../entities';
import { ProductDto } from '../dtos';
import { UpdateResult, DeleteResult } from 'typeorm';

export interface IProductService {
    findAll(): Product[] | Promise<Product[]>;

    createProduct(product: Product): Product | Promise<Product>;

    findOne(id: string): Product | Promise<Product>;

    update(id: string, product: Product): UpdateResult | Promise<UpdateResult>;

    delete(id: string): DeleteResult | Promise<DeleteResult>;

    searchProducts(keyWord: string): Product[] | Promise<Product[]>;

    newProduct(): Product[] | Promise<Product[]>;

    saleProduct(): Product[] | Promise<Product[]>;

    hotProduct(): Product[] | Promise<Product[]>;
}
