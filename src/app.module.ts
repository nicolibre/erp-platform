import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";

import { DatabaseModule } from "./database/database.module";

import { AuthModule } from "./platform/security/auth/auth.module";
import { UsersModule } from "./platform/security/users/users.module";

import { CategoriesModule } from "./masters/categories/categories.module";
import { BrandsModule } from "./masters/brands/brands.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),

    DatabaseModule,

    AuthModule,
    UsersModule,

    CategoriesModule,
    BrandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}