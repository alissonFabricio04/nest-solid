import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ComunsService } from './comuns.service';
import { CreateComunsDto } from './dto/create-comuns.dto';

@Controller('comuns')
export class ComunsController {
  constructor(private readonly comunService: ComunsService) {}

  @Post()
  create(@Body() createComunsDto: CreateComunsDto) {
    return this.comunService.create(createComunsDto);
  }

  @Get()
  findAll() {
    return this.comunService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunService.findOne(+id);
  }
}
