import { Module } from '@nestjs/common';
import { TrasactionsService } from './trasactions.service';
import { TrasactionsController } from './trasactions.controller';

@Module({
  controllers: [TrasactionsController],
  providers: [TrasactionsService],
})
export class TrasactionsModule {}
