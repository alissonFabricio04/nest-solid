import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TrasactionsService } from './trasactions.service';
import { CreateTrasactionDto } from './dto/create-trasaction.dto';

@Controller('trasactions')
export class TrasactionsController {
  constructor(private readonly trasactionsService: TrasactionsService) {}

  @Post()
  create(@Body() createTrasactionDto: CreateTrasactionDto) {
    return this.trasactionsService.create(createTrasactionDto);
  }

  @Get()
  findAll() {
    return this.trasactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trasactionsService.findOne(+id);
  }
}
