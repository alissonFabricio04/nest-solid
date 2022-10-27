import { randomUUID } from 'crypto';

import { Comuns } from '../../domain/comuns.entity';
import { Shopkeepers } from '../../domain/shopkeepers.entity';

import { ComunsRepositoryInterface } from '../../infra/comuns.repository';
import { ShopkeepersRepositoryInterface } from '../../infra/shopkeepers.repository';
import { TransferRepositoryInterface } from '../../infra/transfer.repository';

export class TransactionUseCase {
  private sender: Comuns;
  private recipient: Comuns | Shopkeepers;

  private shopkeepersRepository: ShopkeepersRepositoryInterface;
  private comunsRepository: ComunsRepositoryInterface;
  private readonly transferRepository: TransferRepositoryInterface;

  constructor(transferRepository: TransferRepositoryInterface) {
    this.transferRepository = transferRepository;
  }

  public async transactionComunsForComuns(
    comunsRepository: ComunsRepositoryInterface,
    sender_cpf: string,
    recipient_cpf: string,
    value: number,
  ) {
    if (!sender_cpf) throw new Error('sender is required');
    if (!recipient_cpf) throw new Error('recipient is required');

    this.comunsRepository = comunsRepository;

    const cpfExistsSender = await this.comunsRepository.findByCpf(sender_cpf);
    if (!cpfExistsSender) throw new Error('cpf dont alright exists');

    this.sender = cpfExistsSender;

    const cpfExistsRecipient = await this.comunsRepository.findByCpf(
      recipient_cpf,
    );
    if (!cpfExistsRecipient) throw new Error('cpf dont exists');

    this.recipient = cpfExistsRecipient;

    this.sender.debit(value);
    this.recipient.credit(value);

    await this.transferRepository.createTransferComunsForComuns({
      id: randomUUID(),
      sender_cpf: this.sender.informations().cpf, // remetente: remetente é aquele que envia
      current_sender: this.sender.balance,
      recipient_cpf_cnpj: this.recipient.informations().cpf,
      current_recipient: this.recipient.balance,
      value,
      date: new Date(),
    });
  }

  public async transactionComunsForShopkeepers(
    shopkeepersRepository: ShopkeepersRepositoryInterface,
    comunsRepository: ComunsRepositoryInterface,
    sender_cpf: string,
    recipient_cnpj: string,
    value: number,
  ) {
    if (!sender_cpf) throw new Error('sender is required');
    if (!recipient_cnpj) throw new Error('recipient is required');

    this.shopkeepersRepository = shopkeepersRepository;
    this.comunsRepository = comunsRepository;

    const cpfExistsSender = await this.comunsRepository.findByCpf(sender_cpf);
    if (!cpfExistsSender) throw new Error('cpf dont alright exists');

    this.sender = cpfExistsSender;

    const cnpjExistsRecipient = await this.shopkeepersRepository.findByCnpj(
      recipient_cnpj,
    );
    if (!cnpjExistsRecipient) throw new Error('cnpj dont exists');

    this.recipient = cnpjExistsRecipient;

    this.sender.debit(value);
    this.recipient.credit(value);

    await this.transferRepository.createTransferComunsForShopkeepers({
      id: randomUUID(),
      sender_cpf: this.sender.informations().cpf, // remetente: remetente é aquele que envia
      current_sender: this.sender.balance,
      recipient_cpf_cnpj: this.recipient.informations().cnpj,
      current_recipient: this.recipient.balance,
      value,
      date: new Date(),
    });
  }
}
