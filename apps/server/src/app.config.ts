import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GqlModuleAsyncOptions } from '@nestjs/graphql';
import { MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';

const dbLogger = new Logger('Database');
const gqlLogger = new Logger('GraphQL');

/**
 * App Configuration
 */
export const config = {
  envFilePath: '.env',
  isGlobal: true,
} as ConfigModuleOptions;

/**
 * Database Configuration
 */
export const dbConfig = {
  useFactory: (configService: ConfigService) => ({
    type: configService.get('DB_DRIVER'),
    host: configService.get('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    user: configService.get('DB_USER'),
    password: configService.get('DB_PASS'),
    dbName: configService.get('DB_NAME'),
    autoLoadEntities: true,
    debug: configService.get('NODE_ENV') !== 'production',
    logger: dbLogger.log.bind(dbLogger),
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  }),

  inject: [ConfigService],
} as MikroOrmModuleAsyncOptions;

/**
 * GraphQL Configuration
 */
export const gqlConfig = {
  useFactory: (configService: ConfigService) => ({
    path: configService.get('GQL_PATH'),
    cors: false,
    context: ({ req }) => ({ req, headers: req.headers }),
    debug: configService.get('NODE_ENV') !== 'production',
    logger: gqlLogger.log.bind(gqlLogger),
    autoSchemaFile: 'schema.graphql',
    sortSchema: true,
  }),

  inject: [ConfigService],
} as GqlModuleAsyncOptions;
