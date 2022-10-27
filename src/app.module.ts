import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ShopkeepersModule } from './@core/infra/nestjs/shopkeepers/shopkeepers.module';
import { ComunsModule } from './@core/infra/nestjs/comuns/comuns.module';
import { TrasactionsModule } from './@core/infra/nestjs/trasactions/trasactions.module';
import { LoginModule } from './@core/infra/nestjs/login/login.module';
import { AuthorizationMiddleware } from './@core/infra/nestjs/authorization.middleware';
// import { TrasactionsController } from './@core/infra/nestjs/trasactions/trasactions.controller';

@Module({
  imports: [ComunsModule, ShopkeepersModule, TrasactionsModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes('/trasactions');
  }
}
