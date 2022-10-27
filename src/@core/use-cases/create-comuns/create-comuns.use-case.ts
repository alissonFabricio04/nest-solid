import { Comuns } from '../../domain/comuns.entity';

import { CreateComunDto } from './create-comun.dto';

import { ComunsRepositoryInterface } from '../../infra/comuns.repository';

import { hash } from 'bcrypt';

export class CreateComunsUseCase {
  constructor(private readonly comunsRepository: ComunsRepositoryInterface) {}

  async execute({ name, cpf, email, password }: CreateComunDto) {
    const comuns = new Comuns(name, cpf, email, 0);

    const cpfAlrightExists = await this.comunsRepository.findByCpf(
      comuns.informations().cpf,
    );
    if (cpfAlrightExists) throw new Error('CPF invalid');

    const emailAlrightExists = await this.comunsRepository.findByEmail(
      comuns.informations().email,
    );
    if (emailAlrightExists) throw new Error('e-mail invalid');

    const passwordHash = await hash(password, 10);

    comuns.setPassword(passwordHash);

    await this.comunsRepository.insert(comuns);
  }
}
