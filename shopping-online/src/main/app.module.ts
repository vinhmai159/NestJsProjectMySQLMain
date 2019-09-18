import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { HttpExceptionFillter, LoggingInterceptor } from '../common';
import { AppController } from './controllers';
import { AppService } from './sevices';
import { UserModule, CategoryModule, ProductModule } from '../domain';
import { DatabaseModule } from './modules';
import { ConfigModule } from '../configs';

const providers = [
    {
        provide: APP_FILTER,
        useClass: HttpExceptionFillter
    },
    {
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor
    }
];

@Module({
    imports: [ConfigModule, UserModule, DatabaseModule, CategoryModule, ProductModule],
    controllers: [AppController],
    providers: [AppService, ...providers]
})
export class AppModule  {
    // configure(consumer: MiddlewareConsumer) {
    //     consumer
    //         .apply(CheckTokenMiddleWare)
    //         .forRoutes(
    //             { path: 'product/', method: RequestMethod.GET },
    //             { path: 'user/addtocart', method: RequestMethod.POST }
    //         );
    //     // .exclude({ path: 'prouduct/', method: RequestMethod.GET })
    //     // .forRoutes(ProductController);
    // }
}
