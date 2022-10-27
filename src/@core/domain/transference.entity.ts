export interface Transference {
  id: string;

  sender_cpf: string; // remetente: remetente é aquele que envia
  current_sender: number;

  recipient_cpf_cnpj: string; // destinatário: o destinatário é recebedor final
  current_recipient: number;

  value: number;
  date: Date;
}
