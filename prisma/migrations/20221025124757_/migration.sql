-- CreateEnum
CREATE TYPE "TypePersons" AS ENUM ('Comuns', 'Shopkeepers');

-- CreateEnum
CREATE TYPE "TypeTransaction" AS ENUM ('ComunsForComuns', 'ComunsForShopkeepers');

-- CreateTable
CREATE TABLE "Persons" (
    "id" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "type" "TypePersons" NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "sender_cpf" TEXT NOT NULL,
    "current_sender" INTEGER NOT NULL,
    "recipient_cpf" TEXT NOT NULL,
    "current_recipient" INTEGER NOT NULL,
    "type" "TypeTransaction" NOT NULL,
    "value" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Persons_cpf_cnpj_key" ON "Persons"("cpf_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Persons_email_key" ON "Persons"("email");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_sender_cpf_fkey" FOREIGN KEY ("sender_cpf") REFERENCES "Persons"("cpf_cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_recipient_cpf_fkey" FOREIGN KEY ("recipient_cpf") REFERENCES "Persons"("cpf_cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;
