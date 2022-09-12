import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import compression from '@fastify/compress';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: {
        origin: [
          'http://braxtondiggs.com',
          'http://www.braxtondiggs.com',
          'https://braxtondiggs.com',
          'https://www.braxtondiggs.com'
        ],
        methods: ['GET']
      }
    }
  );
  const port = process.env.PORT || 3000;

  await app.register(helmet);
  await app.register(fastifyCsrf);
  await app.register(compression);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on port ${port}`);
  });
}
bootstrap();
