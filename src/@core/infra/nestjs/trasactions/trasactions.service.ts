import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../prisma.service';

import { TransactionUseCase } from '../../../use-cases/transaction/transaction.use-case';

import { ComunsRepository } from '../../prismaORM/comuns.repository';
import { ShopkeepersRepository } from '../../prismaORM/shopkeepers.repository';
import { TransactionRepository } from '../../prismaORM/transaction.repository';

import { CreateTrasactionDto } from './dto/create-trasaction.dto';

@Injectable()
export class TrasactionsService {
  async create(createTrasactionDto: CreateTrasactionDto) {
    if (!createTrasactionDto.recipient_cpf_cnpj) return 'cpf ou cnpj invalido';
    if (!createTrasactionDto.sender_cpf) return 'cpf ou cnpj invalido';
    if (!createTrasactionDto.value) return 'valor invalido';

    const transactionRepository = new TransactionRepository(PrismaService);

    const transactionUseCase = new TransactionUseCase(transactionRepository);

    // 864.593.438-88
    if (createTrasactionDto.recipient_cpf_cnpj.length === 14) {
      const comunsRepository = new ComunsRepository(PrismaService);

      try {
        await transactionUseCase.transactionComunsForComuns(
          comunsRepository,
          createTrasactionDto.sender_cpf,
          createTrasactionDto.recipient_cpf_cnpj,
          createTrasactionDto.value,
        );
      } catch (e) {
        return (e as Error).message;
      }
      // 11.157.211/0001-59
    } else if (createTrasactionDto.recipient_cpf_cnpj.length === 18) {
      const shopkeepersRepository = new ShopkeepersRepository(PrismaService);
      const comunsRepository = new ComunsRepository(PrismaService);

      try {
        await transactionUseCase.transactionComunsForShopkeepers(
          shopkeepersRepository,
          comunsRepository,
          createTrasactionDto.sender_cpf,
          createTrasactionDto.recipient_cpf_cnpj,
          createTrasactionDto.value,
        );
      } catch (e) {
        return (e as Error).message;
      }
    } else {
      return 'cpf ou cnpj invalido';
    }
  }

  async findAll() {
    return await PrismaService.transactions.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} trasaction`;
  }
}
