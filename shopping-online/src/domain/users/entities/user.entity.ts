import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinTable,
    BeforeUpdate
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import * as bcrypt from 'bcrypt';

export enum Role {
    visitor = 'visitor',
    user = 'user',
    author = 'author',
    editor = 'editor',
    admin = 'admin'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 30 })
    email: string;

    @Column({ type: 'text' })
    password: string;

    @Column('text')
    address: string[];

    @Column('text')
    phone: string[];

    @ManyToMany(type => Product)
    @JoinTable()
    carts: Product[];

    @Column('text', { default: 'user' })
    role: Role;

    @Column('timestamp')
    public date: Date;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt: Date;

    // @BeforeUpdate()
    // updatePassword() {
    //     if (!this.password) {
    //         return;
    //     }
    //     this.password = bcrypt.hashSync(this.password, 10);
    // }
}

