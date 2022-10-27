import { Person } from './person.entity';

export class Comuns extends Person {
  private cpf: string;
  private email: string;

  constructor(name: string, cpf: string, email: string, balance: number) {
    super();
    this.cpf = cpf;
    this.name = name;
    this.email = email;
    this.balance = balance;
  }

  public informations() {
    return { name: this.name, cpf: this.cpf, email: this.email };
  }

  // saca os creditos
  public debit(value: number) {
    if (this.balance < value) {
      throw new Error('impossivel realizar transação');
    }

    this.balance = this.balance - value;

    return this.balance;
  }
}
