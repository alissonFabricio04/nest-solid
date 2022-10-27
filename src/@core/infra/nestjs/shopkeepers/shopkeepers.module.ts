import { Module } from '@nestjs/common';
import { ShopkeepersService } from './shopkeepers.service';
import { ShopkeepersController } from './shopkeepers.controller';

@Module({
  controllers: [ShopkeepersController],
  providers: [ShopkeepersService],
})
export class ShopkeepersModule {}
