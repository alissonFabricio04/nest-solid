import { PrismaClient } from '@prisma/client';

import { ShopkeepersRepositoryInterface } from '../shopkeepers.repository';

import { Shopkeepers } from '../../domain/shopkeepers.entity';

export class ShopkeepersRepository implements ShopkeepersRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async insert(shopkeepers: Shopkeepers): Promise<void> {
    const info = shopkeepers.informations();

    await this.prisma.persons.create({
      data: {
        name: info.name,
        email: info.email,
        cpf_cnpj: info.cnpj,
        password: shopkeepers.getPassword(),
        type: 'Shopkeepers',
        balance: 0,
        created_at: new Date(),
      },
    });
  }

  async findByCnpj(cnpj: string): Promise<Shopkeepers | null> {
    const data = await this.prisma.persons.findUnique({
      where: { cpf_cnpj: cnpj },
    });

    if (data) {
      const shopkeepers = new Shopkeepers(
        data.name,
        data.cpf_cnpj,
        data.email,
        data.balance,
      );
      return shopkeepers;
    }

    return null;
  }

  async findByEmail(email: string): Promise<Shopkeepers | null> {
    const data = await this.prisma.persons.findUnique({ where: { email } });

    if (data) {
      const shopkeepers = new Shopkeepers(
        data.name,
        data.cpf_cnpj,
        data.email,
        data.balance,
      );
      return shopkeepers;
    }

    return null;
  }
}
