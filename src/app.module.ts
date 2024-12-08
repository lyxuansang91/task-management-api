import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AppConfiguration, appConfiguration } from "./config/configuration";

import { HealthModule } from "./health/health.module";
import { AuthModule } from "./auth/auth.module";
import { TaskModule } from "./tasks/task.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration],
    }),
    MongooseModule.forRootAsync({
      inject: [appConfiguration.KEY],
      useFactory: (config: AppConfiguration) => {
        return {
          uri: config.mongodb.uri,
        };
      },
    }),

    AuthModule,
    HealthModule,
    TaskModule,
  ],
})
export class AppModule {}
