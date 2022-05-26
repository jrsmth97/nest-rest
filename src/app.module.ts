import { CacheModule, Module, CacheInterceptor, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ArticleEntity } from './article/entities/article.entity';
import { AuthorEntity } from './author/entities/author.entity';
import { AuthorModule } from './author/author.module';
import { ArticleModule } from './article/article.module';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './global/filters/all-exception.filter';
import { LogModule } from './log/log.module';
import { LogEntity } from './log/entities/log.entity';
import { CacheMiddleware } from './global/middlewares/cache.middleware';

@Module({
  imports: [
    AuthorModule,
    ArticleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [
        AuthorEntity,
        ArticleEntity,
        LogEntity,
      ],
      synchronize: true,
    }),
    CacheModule.register({ isGlobal: true }),
    LogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CacheMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
