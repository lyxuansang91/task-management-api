import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AppConfiguration, appConfiguration } from "./config/configuration";
import { HttpExceptionFilter } from "./filters/exception.filter";

const globalPrefix = "/api";
const configureSwagger = (app: INestApplication) => {
  const appConfig = app.get<AppConfiguration>(appConfiguration.KEY);
  const baseApis = "/" + appConfig.baseUrl + globalPrefix;
  const baseUrl = baseApis.replace("//", "/");
  const swaggerDocOptions = new DocumentBuilder()
    .setTitle("TASK-MANAGEMENT-APIS")
    .setDescription("Task Management API description")
    .setVersion("1.0.0")
    .addServer(baseUrl)
    .setBasePath(baseUrl)
    .addBearerAuth(
      {
        type: "apiKey",
        scheme: "JWT",
        bearerFormat: "JWT",
        name: "Authorization",
        description: "Type into the text box: Bearer {your JWT token}",
        in: "header",
      },
      "JWT"
    )
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup("docs", app, swaggerDoc);
};

const configureValidation = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { logger: ["log"] });
  const appConfig = app.get<AppConfiguration>(appConfiguration.KEY);
  app.enableShutdownHooks();
  app.setGlobalPrefix(globalPrefix);

  configureSwagger(app);
  configureValidation(app);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(appConfig.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log("Ready");
};
bootstrap();
