import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ShopkeepersService } from './shopkeepers.service';
import { CreateShopkeepersDto } from './dto/create-shopkeepers.dto';

@Controller('shopkeepers')
export class ShopkeepersController {
  constructor(private readonly shopkeepersService: ShopkeepersService) {}

  @Post()
  create(@Body() createShopkeepersDto: CreateShopkeepersDto) {
    return this.shopkeepersService.create(createShopkeepersDto);
  }

  @Get()
  findAll() {
    return this.shopkeepersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopkeepersService.findOne(+id);
  }
}
