import { Category } from "../entities";
import { UpdateResult, DeleteResult } from "typeorm";

export interface ICategoryService {
    findAllCategory(): Category[] | Promise<Category[]>;

    findOneCategory(id: string): Category | Promise<Category>;

    createCategory(category: Category): Category | Promise<Category>;

    updateCategory(id: string, category: Category): UpdateResult | Promise<UpdateResult>;

    deleteCategory(id: string): DeleteResult | Promise<DeleteResult>;
}