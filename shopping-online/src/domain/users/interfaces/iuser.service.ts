import { User } from '../entities';
import { Product } from '../../products/entities';
import { UpdateResult } from 'typeorm';

export interface IUserService {
    logIn(email: string, password: string): User | Promise<User>;

    signIn(user: User): User | Promise<User>;

    addToCart(user: User, productIds: number[]): UpdateResult | Promise<UpdateResult>;
}
