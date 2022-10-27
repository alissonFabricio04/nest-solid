// import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// export class PrismaService extends PrismaClient {
// async onModuleInit() {
//   await this.$connect();
// }
// async enableShutdownHooks(app: INestApplication) {
//   this.$on('beforeExit', async () => {
//     await app.close();
//   });
// }
// }

export const PrismaService = new PrismaClient();
