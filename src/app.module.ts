import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { AuthModule } from "./platform/auth/auth.module";
import { UsersModule } from "./platform/users/users.module";

import { DatabaseModule } from "./database/database.module";
import { CategoriesModule } from "./categories/categories.module";

import { BrandsModule } from "./brands/brands.module";

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [appConfig, databaseConfig],
  }),

  AuthModule,
  UsersModule,
  DatabaseModule,

  CategoriesModule,
  BrandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}