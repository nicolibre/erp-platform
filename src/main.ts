import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { ResponseInterceptor } from "./core/http";

import { GlobalExceptionFilter } from "./core/exceptions";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  app.useGlobalInterceptors(
  new ResponseInterceptor(),
  );

  const config = new DocumentBuilder()
    .setTitle("ERP Platform API")
    .setDescription("API REST del ERP Platform")
    .setVersion("1.0.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Ingrese el token JWT",
      },
      "access-token",
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    `🚀 API ejecutándose en http://localhost:${process.env.PORT ?? 3000}`,
  );

  console.log(
    `📘 Swagger disponible en http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}

bootstrap();
