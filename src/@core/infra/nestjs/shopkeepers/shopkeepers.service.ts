import { Injectable } from '@nestjs/common';

import { CreateShopkeepersDto } from './dto/create-shopkeepers.dto';
import { CreateShopkeepersUseCase } from '../../../use-cases/create-shopkeeper/create-shopkeepers.use-case';

import { PrismaService } from '../../../../prisma.service';
import { ShopkeepersRepository } from '../../prismaORM/shopkeepers.repository';

@Injectable()
export class ShopkeepersService {
  create(createShopkeepersDto: CreateShopkeepersDto) {
    if (!createShopkeepersDto.cnpj) return 'cnpj invalido';
    if (!createShopkeepersDto.email) return 'e-mail invalido';
    if (!createShopkeepersDto.name) return 'nome invalido';
    if (!createShopkeepersDto.password) return 'senha invalido';

    const shopkeepersRepository = new ShopkeepersRepository(PrismaService);

    const createShopkeepersUseCase = new CreateShopkeepersUseCase(
      shopkeepersRepository,
    );

    createShopkeepersUseCase.execute(createShopkeepersDto);
  }

  findAll() {
    return `This action returns all create`;
  }

  findOne(id: number) {
    return `This action returns a #${id} create`;
  }
}
