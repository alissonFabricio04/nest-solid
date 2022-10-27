export class CreateTrasactionDto {
  authorization: string;
  sender_cpf: string;
  recipient_cpf_cnpj: string;
  value: number;
}
