"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const configuration_1 = require("./config/configuration");
const exception_filter_1 = require("./filters/exception.filter");
const globalPrefix = "/api";
const configureSwagger = (app) => {
    const appConfig = app.get(configuration_1.appConfiguration.KEY);
    const baseApis = "/" + appConfig.baseUrl + globalPrefix;
    const baseUrl = baseApis.replace("//", "/");
    const swaggerDocOptions = new swagger_1.DocumentBuilder()
        .setTitle("TASK-MANAGEMENT-APIS")
        .setDescription("Task Management API description")
        .setVersion("1.0.0")
        .addServer(baseUrl)
        .setBasePath(baseUrl)
        .addBearerAuth({
        type: "apiKey",
        scheme: "JWT",
        bearerFormat: "JWT",
        name: "Authorization",
        description: "Type into the text box: Bearer {your JWT token}",
        in: "header",
    }, "JWT")
        .build();
    const swaggerDoc = swagger_1.SwaggerModule.createDocument(app, swaggerDocOptions, {
        ignoreGlobalPrefix: true,
    });
    swagger_1.SwaggerModule.setup("docs", app, swaggerDoc);
};
const configureValidation = (app) => {
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: false,
        transform: true,
        forbidNonWhitelisted: true,
    }));
};
const bootstrap = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger: ["log"] });
    const appConfig = app.get(configuration_1.appConfiguration.KEY);
    app.enableShutdownHooks();
    app.setGlobalPrefix(globalPrefix);
    configureSwagger(app);
    configureValidation(app);
    app.enableCors();
    app.useGlobalFilters(new exception_filter_1.HttpExceptionFilter());
    await app.listen(appConfig.port);
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log("Ready");
};
bootstrap();
//# sourceMappingURL=main.js.map