import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import configuration from './config/configuration';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger();
  const config = configuration();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors({
    origin: 'http://localhost:3000', // Zastąp to odpowiednim adresem URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  

  const configApi = new DocumentBuilder()
    .setTitle('DoggieNote')
    .setDescription('The DoggieNote API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http', 
      scheme: 'bearer', 
      bearerFormat: 'JWT',
    }, 'access-token')
    .addTag('dogs', 'Operations related to dogs')
    .addTag('dict-activity', 'Operations related to dictionary activities')
    .addTag('activities', 'Operations related to activities')
    .addTag('user','Operations related to user')
    .build();
    
  const document = SwaggerModule.createDocument(app, configApi);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.PORT);
  logger.log(`Server listening: http://localhost:${config.PORT}`);
  
}
bootstrap();
