/*
  Warnings:

  - Added the required column `password` to the `Persons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Persons" ADD COLUMN     "password" TEXT NOT NULL;
