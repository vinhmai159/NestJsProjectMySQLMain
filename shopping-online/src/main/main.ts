import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFillter } from '../common/exception';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // app.useGlobalFilters(new HttpExceptionFillter);

    const options = new DocumentBuilder()
        .addBearerAuth('authorization')
        .setTitle('Shopping online API')
        .setDescription('The API of Shop online web!')
        .setVersion('1')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
