/*
  Warnings:

  - Added the required column `scheduledAt` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "scheduledAt" TIMESTAMP(3) NOT NULL;
