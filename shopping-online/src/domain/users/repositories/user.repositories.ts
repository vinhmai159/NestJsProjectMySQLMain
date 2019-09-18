import { EntityRepository, Repository, UpdateResult, getConnection } from 'typeorm';
import { User } from '../entities';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/domain/products';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    private saltRounds = 10;
    async findEmail(email: string): Promise<any> {
        return await this.findOne({ email: email });
    }
    async register(user: User): Promise<User> {
        user.password = await bcrypt.hashSync(user.password, this.saltRounds);
        return await this.save(user);
    }

    async addToCart(user: User, ProductId: Number): Promise<any> {
        return await this.createQueryBuilder('user_carts_product')
            .insert()
            .into('user_carts_product')
            .values([{ userId: user.id, productId: ProductId }])
            .execute();
    }

    async removeToCart(user: User, Product: Product): Promise<any> {
        return await this.createQueryBuilder('user_carts_product')
            .delete()
            .from('user_carts_product')
            .where({ userId: user.id, productId: Product.id })
            .execute();
    }

    async showCart(user: User): Promise<any[]> {
        return await this.createQueryBuilder('user')
            .leftJoinAndSelect('user.carts', 'product')
            .where({ id: user.id })
            .getMany();
        // return await this.createQueryBuilder('user').leftJoin('user_carts_product', 'UCP', 'user.Id = UCP.userId').where({ 'user.id': user.id}).getMany();
    }

    async getHash(passwrod: string | undefined): Promise<string> {
        return bcrypt.hash(passwrod, this.saltRounds);
    }

    async compareHash(password: string, hash: string): Promise<string> {
        return bcrypt.compareSync(password, hash);
    }
}
