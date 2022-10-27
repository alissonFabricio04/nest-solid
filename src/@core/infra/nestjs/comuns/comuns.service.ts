import { Injectable } from '@nestjs/common';

import { CreateComunsDto } from './dto/create-comuns.dto';
import { CreateComunsUseCase } from 'src/@core/use-cases/create-comuns/create-comuns.use-case';

import { PrismaService } from '../../../../prisma.service';
import { ComunsRepository } from '../../prismaORM/comuns.repository';

@Injectable()
export class ComunsService {
  async create(createComunsDto: CreateComunsDto) {
    if (!createComunsDto.cpf) return 'cpf invalido';
    if (!createComunsDto.email) return 'e-mail invalido';
    if (!createComunsDto.name) return 'nome invalido';
    if (!createComunsDto.password) return 'senha invalido';

    const comunsRepository = new ComunsRepository(PrismaService);

    const createComunsUseCase = new CreateComunsUseCase(comunsRepository);

    try {
      await createComunsUseCase.execute(createComunsDto);
    } catch (e) {
      return (e as Error).message;
    }
  }

  async findAll() {
    // await PrismaService.persons.update({
    //   where: { cpf_cnpj: '522.493.768-08' },
    //   data: { balance: 10 },
    // });
    return await PrismaService.persons.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} create`;
  }
}
