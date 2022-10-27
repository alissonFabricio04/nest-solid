import { Person } from './person.entity';

export class Shopkeepers extends Person {
  private cnpj: string;
  private email: string;

  constructor(name: string, cnpj: string, email: string, balance: number) {
    super();

    this.cnpj = cnpj;

    this.name = name;
    this.email = email;

    this.balance = balance;
  }

  public informations() {
    return { name: this.name, cnpj: this.cnpj, email: this.email };
  }
}
