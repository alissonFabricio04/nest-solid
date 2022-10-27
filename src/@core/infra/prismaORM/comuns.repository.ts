import { PrismaClient } from '@prisma/client';

import { ComunsRepositoryInterface } from '../comuns.repository';

import { Comuns } from '../../domain/comuns.entity';

export class ComunsRepository implements ComunsRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async insert(comuns: Comuns): Promise<void> {
    const info = comuns.informations();

    await this.prisma.persons.create({
      data: {
        name: info.name,
        email: info.email,
        cpf_cnpj: info.cpf,
        password: comuns.getPassword(),
        type: 'Comuns',
        balance: 0,
        created_at: new Date(),
      },
    });
  }

  async findByCpf(cpf: string): Promise<Comuns | null> {
    const data = await this.prisma.persons.findUnique({
      where: { cpf_cnpj: cpf },
    });

    if (data) {
      const comuns = new Comuns(
        data.name,
        data.cpf_cnpj,
        data.email,
        data.balance,
      );
      return comuns;
    }

    return null;
  }

  async findByEmail(email: string): Promise<Comuns | null> {
    const data = await this.prisma.persons.findUnique({ where: { email } });

    if (data) {
      const comuns = new Comuns(
        data.name,
        data.cpf_cnpj,
        data.email,
        data.balance,
      );
      return comuns;
    }

    return null;
  }
}
