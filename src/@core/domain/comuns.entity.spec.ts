import { Comuns } from './comuns.entity';

describe('create Comuns', () => {
  it('should not be able debit a larger amount than you have in your account', () => {
    const user1 = new Comuns(
      'Alisson Fabricio Bonfim',
      '522.493.768-08',
      'test@gmail.com',
      0,
    );

    expect(() => {
      user1.debit(10);
    }).toThrow();
  });
});
