import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { MiscModule } from './misc/misc.module';
import { UserModule } from './user/user.module';

import { config, dbConfig, gqlConfig } from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    GraphQLModule.forRootAsync(gqlConfig),
    MikroOrmModule.forRootAsync(dbConfig),
    MiscModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
