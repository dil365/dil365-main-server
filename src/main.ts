import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.enableCors({
        origin: 'http://localhost:5500/api/v1',
        credentials: true,
    });
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    await app.startAllMicroservices();
    await app.listen(process.env.SERVER_PORT);
}

bootstrap();