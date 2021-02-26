import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { apiInfo } from './models/api-info.dto';
import * as helmet from 'helmet';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(cors());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api')

  if (process.env.NODE_ENV !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(apiInfo.title)
      .setDescription(apiInfo.description)
      .setVersion(apiInfo.version)
      .build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, swaggerDoc);
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Home Weather Backend started on http://localhost:${port}`);
}
bootstrap();
