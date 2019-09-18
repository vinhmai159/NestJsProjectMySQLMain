import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinTable,
    Double,
    ManyToOne
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToMany(type => Category)
    @JoinTable()
    categories: Category[];

    @Column({ length: 50 })
    name: string;

    @Column({ default: 0, type: 'double' })
    price: number;

    @Column('double')
    salePrice: number;

    @Column({ default: 1 })
    amounts: number;

    @Column('text')
    colors: string[];

    @Column('text')
    sizes: string[];

    @Column({
        type: 'double',
        default: 0,
    })
    discount: number;

    @Column({ default: 0 })
    hot: number;

    // @CreateDateColumn('timestamp')
    // public date: Date;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt: Date;
}
