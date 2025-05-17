/*
  Warnings:

  - Added the required column `pasword` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pasword` to the `Tutor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "pasword" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tutor" ADD COLUMN     "pasword" TEXT NOT NULL;
