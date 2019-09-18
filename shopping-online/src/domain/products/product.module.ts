import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './repositories';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services';

@Module({
    imports: [TypeOrmModule.forFeature([ProductRepository])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
