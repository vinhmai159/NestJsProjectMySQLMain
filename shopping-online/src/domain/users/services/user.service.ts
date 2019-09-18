import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { UserRepository } from '../repositories';
import { User } from '../entities';
import { Product } from '../../products/entities';
import { IUserService } from '../interfaces';
import { Category } from '../../categories';
import { AddToCartDto } from '../dtos';

@Injectable()
export class UserService implements IUserService {
    constructor(
        private readonly jwtService: JwtService,

        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    async logIn(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findEmail(email);
        if (user && bcrypt.compareSync(password, user.password)) {
            //const token = jwt.sign({ id: user.id }, 'sereckey', { expiresIn: '1h' });
            const payload = {
                name: user.name,
                id: user.id,
                email: user.email,
                address: user.address,
                phone: user.phone,
                role: user.role
            };
            const token = this.jwtService.sign(payload);
            return { token, ...user };
        }
        throw new BadRequestException('User or passord is incorrect');
    }

    async signIn(user: User): Promise<User> {
        return await this.userRepository.register(user);
    }

    async addToCart(user: User, productIds: Number[]): Promise<any> {
        // user.carts = productIds.map((item) => {
        //     const product = new Product();
        //     product.id = item;
        //     return product;
        // })
        for(let i = 0; i < productIds.length; i++) {
            await this.userRepository.addToCart(user, productIds[i])
        }
        return {message: 'successfully!'};
    }

    async removeToCart(user: User, product: Product): Promise<any> {
        return await this.userRepository.removeToCart(user, product);
    }

    async showCart(user: User): Promise<any[]> {
        return await this.userRepository.showCart(user);
    }
}
