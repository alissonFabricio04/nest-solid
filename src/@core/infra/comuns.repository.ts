import { Comuns } from '../domain/comuns.entity';

export interface ComunsRepositoryInterface {
  insert(comuns: Comuns): Promise<void>;
  findByCpf(cpf: string): Promise<Comuns | null>;
  findByEmail(email: string): Promise<Comuns | null>;
}
