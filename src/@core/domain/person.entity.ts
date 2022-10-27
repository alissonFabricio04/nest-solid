export abstract class Person {
  protected name: string;
  protected password: string;

  public balance: number;

  public setPassword(password: string) {
    this.password = password;
  }

  public getPassword(): string {
    return this.password;
  }

  // add creditos
  public credit(value: number) {
    this.balance = this.balance + value;

    return this.balance;
  }
}
