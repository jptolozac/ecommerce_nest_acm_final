import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //configuracion swagger
  const config = new DocumentBuilder()
    .setTitle('API REST ACM')
    .setDescription('Servicio REST - ACM')
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  await app.listen(process.env.PORT || 3000);
  console.log(`Ambiente de ejecucion ${process.env.PORT}`);
  console.log(`Apllicacion corriendo en: ${await app.getUrl()}`);
}
bootstrap();
