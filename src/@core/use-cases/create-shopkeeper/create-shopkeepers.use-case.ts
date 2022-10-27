import { Shopkeepers } from '../../domain/shopkeepers.entity';

import { CreateShopkeeperDto } from './create-shopkeeper.dto';

import { ShopkeepersRepositoryInterface } from '../../infra/shopkeepers.repository';

import { hash } from 'bcrypt';

export class CreateShopkeepersUseCase {
  constructor(
    private readonly shopkeepersRepository: ShopkeepersRepositoryInterface,
  ) {}

  async execute({ name, cnpj, email, password }: CreateShopkeeperDto) {
    const shopkeepers = new Shopkeepers(name, cnpj, email, 0);

    const cnpjAlrightExists = await this.shopkeepersRepository.findByCnpj(
      shopkeepers.informations().cnpj,
    );
    if (cnpjAlrightExists) throw new Error('CNPJ invalid');

    const emailAlrightExists = await this.shopkeepersRepository.findByEmail(
      shopkeepers.informations().email,
    );
    if (emailAlrightExists) throw new Error('e-mail invalid');

    const passwordHash = await hash(password, 10);

    shopkeepers.setPassword(passwordHash);

    await this.shopkeepersRepository.insert(shopkeepers);
  }
}
