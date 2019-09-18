import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
import { UserController } from './controllers/user.controller';
import { UserService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories';
import { JwtModule } from '@nestjs/jwt';
import { SerectKey } from './constants';
import { LocalStrategy, JwtStrategy } from './strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        JwtModule.register({
            secret: SerectKey.serect,
            signOptions: { expiresIn: '1h' }
        })
    ],
    controllers: [UserController],
    providers: [UserService]
    //, LocalStrategy, JwtStrategy],
})
export class UserModule {}
