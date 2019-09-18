import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities";
import { CategoryController } from "./controllers/category.controller";
import { CategoryService } from "./services";
import { CategoryRepository } from "./repositories";

@Module({
    imports: [TypeOrmModule.forFeature([CategoryRepository])],
    controllers: [CategoryController],
    providers: [CategoryService],
})

export class CategoryModule {}
