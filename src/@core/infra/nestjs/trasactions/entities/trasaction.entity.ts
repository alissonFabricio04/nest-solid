import { Transference } from '../../../../domain/transference.entity';

export class Trasaction implements Transference {
  id: string;
  sender_cpf: string;
  current_sender: number;
  recipient_cpf_cnpj: string;
  current_recipient: number;
  value: number;
  date: Date;
}
