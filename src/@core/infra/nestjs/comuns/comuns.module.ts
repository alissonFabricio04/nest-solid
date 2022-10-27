import { Module } from '@nestjs/common';
import { ComunsService } from './comuns.service';
import { ComunsController } from './comuns.controller';

@Module({
  controllers: [ComunsController],
  providers: [ComunsService],
})
export class ComunsModule {}
