/*
  Warnings:

  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Tutor` table. All the data in the column will be lost.
  - Added the required column `pasword` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pasword` to the `Tutor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "password",
ADD COLUMN     "pasword" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "password",
ADD COLUMN     "pasword" TEXT NOT NULL;
