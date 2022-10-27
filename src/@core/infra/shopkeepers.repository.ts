import { Shopkeepers } from '../domain/shopkeepers.entity';

export interface ShopkeepersRepositoryInterface {
  insert(comuns: Shopkeepers): Promise<void>;
  findByCnpj(cnpj: string): Promise<Shopkeepers | null>;
  findByEmail(email: string): Promise<Shopkeepers | null>;
}
