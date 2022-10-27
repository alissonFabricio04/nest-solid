import { Transference } from '../domain/transference.entity';

export interface TransferRepositoryInterface {
  createTransferComunsForComuns(data: Transference): Promise<void>;
  createTransferComunsForShopkeepers(data: Transference): Promise<void>;
}
