"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const configuration_1 = require("./config/configuration");
const health_module_1 = require("./health/health.module");
const auth_module_1 = require("./auth/auth.module");
const task_module_1 = require("./tasks/task.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.appConfiguration],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                inject: [configuration_1.appConfiguration.KEY],
                useFactory: (config) => {
                    return {
                        uri: config.mongodb.uri,
                    };
                },
            }),
            auth_module_1.AuthModule,
            health_module_1.HealthModule,
            task_module_1.TaskModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map