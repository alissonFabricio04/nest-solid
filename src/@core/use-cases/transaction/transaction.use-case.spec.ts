import { Comuns } from '../../domain/comuns.entity';
import { Shopkeepers } from '../../domain/shopkeepers.entity';
import { TransactionUseCase } from './transaction.use-case';

describe('create Payment', () => {
  it('should not be able create transaction between users', async () => {
    const client01 = new Comuns(
      'Alisson Fabricio Bonfim',
      '52249376808', // '522.493.768-08',
      'test@gmail.com',
      0,
    );

    const client02 = new Comuns(
      'Marcio Ferreira',
      '27269523879', // '272.695.238-79',
      'test2@gmail.com',
      0,
    );

    // {
    //   insert: jest.fn(),
    //   findByCnpj: () => new Promise((resolve) => resolve(shopkeepers01)),
    //   findByEmail: () => new Promise((resolve) => resolve(shopkeepers01)),
    // },
    // {
    //   insert: jest.fn(),
    //   findByCpf: () => new Promise((resolve) => resolve(client01)),
    //   findByEmail: () => new Promise((resolve) => resolve(client01)),
    // },
    // {
    //   createTransferComunsForComuns: jest.fn(),
    //   createTransferComunsForShopkeepers: jest.fn(),
    // },

    const transactionUseCase = new TransactionUseCase({
      createTransferComunsForComuns: jest.fn(),
      createTransferComunsForShopkeepers: jest.fn(),
    });

    await expect(
      transactionUseCase.transactionComunsForComuns(
        {
          insert: jest.fn(),
          findByCpf: () => new Promise((resolve) => resolve(client01)),
          findByEmail: () => new Promise((resolve) => resolve(client01)),
        },
        client01.informations().cpf,
        client02.informations().cpf,
        1,
      ),
    ).rejects.toThrowError('impossivel realizar transação');
  });

  it('should be able create transaction between users with balance', async () => {
    const client01 = new Comuns(
      'Alisson Fabricio Bonfim',
      '52249376808', // '522.493.768-08',
      'test@gmail.com',
      10,
    );

    const client02 = new Comuns(
      'Marcio Ferreira',
      '27269523879', // '272.695.238-79',
      'test2@gmail.com',
      0,
    );

    const transactionUseCase = new TransactionUseCase({
      createTransferComunsForComuns: jest.fn(),
      createTransferComunsForShopkeepers: jest.fn(),
    });

    await expect(
      transactionUseCase.transactionComunsForComuns(
        {
          insert: jest.fn(),
          findByCpf: () => new Promise((resolve) => resolve(client01)),
          findByEmail: () => new Promise((resolve) => resolve(client01)),
        },
        client01.informations().cpf,
        client02.informations().cpf,
        7,
      ),
    ).resolves.not.toThrow();
  });

  it('should not be able create transaction between users and shopkeepers', async () => {
    const client01 = new Comuns(
      'Alisson Fabricio Bonfim',
      '52249376808', // '522.493.768-08',
      'test@gmail.com',
      0,
    );

    const shopkeepers01 = new Shopkeepers(
      'Alisson Fabricio Bonfim',
      '85034431000121',
      'test@gmail.com',
      0,
    );

    const transactionUseCase = new TransactionUseCase({
      createTransferComunsForComuns: jest.fn(),
      createTransferComunsForShopkeepers: jest.fn(),
    });

    await expect(
      transactionUseCase.transactionComunsForShopkeepers(
        {
          insert: jest.fn(),
          findByCnpj: () => new Promise((resolve) => resolve(shopkeepers01)),
          findByEmail: () => new Promise((resolve) => resolve(shopkeepers01)),
        },
        {
          insert: jest.fn(),
          findByCpf: () => new Promise((resolve) => resolve(client01)),
          findByEmail: () => new Promise((resolve) => resolve(client01)),
        },
        client01.informations().cpf,
        shopkeepers01.informations().cnpj,
        1,
      ),
    ).rejects.toThrowError('impossivel realizar transação');
  });

  it('should be able create transaction between users and shopkeepers even with balance', async () => {
    const client01 = new Comuns(
      'Alisson Fabricio Bonfim',
      '52249376808', // '522.493.768-08',
      'test@gmail.com',
      30,
    );

    const shopkeepers01 = new Shopkeepers(
      'Alisson Fabricio Bonfim',
      '85034431000121',
      'test@gmail.com',
      0,
    );

    const transactionUseCase = new TransactionUseCase({
      createTransferComunsForComuns: jest.fn(),
      createTransferComunsForShopkeepers: jest.fn(),
    });

    await expect(
      transactionUseCase.transactionComunsForShopkeepers(
        {
          insert: jest.fn(),
          findByCnpj: () => new Promise((resolve) => resolve(shopkeepers01)),
          findByEmail: () => new Promise((resolve) => resolve(shopkeepers01)),
        },
        {
          insert: jest.fn(),
          findByCpf: () => new Promise((resolve) => resolve(client01)),
          findByEmail: () => new Promise((resolve) => resolve(client01)),
        },
        client01.informations().cpf,
        shopkeepers01.informations().cnpj,
        20,
      ),
    ).resolves.not.toThrow();
  });
});
