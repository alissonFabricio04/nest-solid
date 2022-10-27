import { PrismaClient } from '@prisma/client';

import { TransferRepositoryInterface } from '../transfer.repository';

import { Transference } from '../../domain/transference.entity';

export class TransactionRepository implements TransferRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async createTransferComunsForComuns(data: Transference) {
    await this.prisma.$transaction(async () => {
      // const sender_info = await this.prisma.persons.findFirst({
      //   where: { cpf_cnpj: data.sender_cpf },
      // });

      // const recipient_info = await this.prisma.persons.findFirst({
      //   where: { cpf_cnpj: data.recipient_cpf_cnpj },
      // });

      // const sender = new Comuns(
      //   sender_info.name,
      //   sender_info.cpf_cnpj,
      //   sender_info.email,
      //   sender_info.balance,
      // );

      // const recipient = new Comuns(
      //   recipient_info.name,
      //   recipient_info.cpf_cnpj,
      //   recipient_info.email,
      //   recipient_info.balance,
      // );

      // const currentSenderBalance = sender.debit(data.value);
      // const currentRecipientBalance = recipient.credit(data.value);

      await this.prisma.persons.update({
        where: { cpf_cnpj: data.sender_cpf },
        data: { balance: data.current_sender },
      });

      await this.prisma.persons.update({
        where: { cpf_cnpj: data.recipient_cpf_cnpj },
        data: { balance: data.current_recipient },
      });

      await this.prisma.transactions.create({
        data: {
          sender_cpf: data.sender_cpf as never,
          current_sender: data.current_sender,

          recipient_cpf: data.recipient_cpf_cnpj as never,
          current_recipient: data.current_recipient,

          type: 'ComunsForComuns',
          value: data.value,
          date: new Date(),
        },
      });
    });
  }

  async createTransferComunsForShopkeepers(data: Transference) {
    await this.prisma.$transaction(async () => {
      // const sender_info = await this.prisma.persons.findFirst({
      //   where: { cpf_cnpj: data.sender_cpf },
      // });

      // const recipient_info = await this.prisma.persons.findFirst({
      //   where: { cpf_cnpj: data.recipient_cpf_cnpj },
      // });

      // const sender = new Comuns(
      //   sender_info.name,
      //   sender_info.cpf_cnpj,
      //   sender_info.email,
      //   sender_info.balance,
      // );

      // const recipient = new Shopkeepers(
      //   recipient_info.name,
      //   recipient_info.cpf_cnpj,
      //   recipient_info.email,
      //   recipient_info.balance,
      // );

      // const currentSenderBalance = sender.debit(data.value);
      // const currentRecipientBalance = recipient.credit(data.value);

      await this.prisma.persons.update({
        where: { cpf_cnpj: data.sender_cpf },
        data: { balance: data.current_sender },
      });

      await this.prisma.persons.update({
        where: { cpf_cnpj: data.recipient_cpf_cnpj },
        data: { balance: data.current_recipient },
      });

      await this.prisma.transactions.create({
        data: {
          sender_cpf: data.sender_cpf as never,
          current_sender: data.current_sender,

          recipient_cpf: data.recipient_cpf_cnpj as never,
          current_recipient: data.current_recipient,

          type: 'ComunsForShopkeepers',
          value: data.value,
          date: new Date(),
        },
      });
    });
  }
}
