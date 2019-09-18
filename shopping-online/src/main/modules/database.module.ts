import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '../../configs';
import { User, Product, Category } from '../../domain';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return new Promise(resolve =>
                    resolve({
                        ...configService.getJSON('DATABASE'),
                        entities: [User, Product, Category],
                        synchronize: true
                    })
                );
            },
            inject: [ConfigService]
        })
    ],
    controllers: [],
    providers: []
})
export class DatabaseModule {}
