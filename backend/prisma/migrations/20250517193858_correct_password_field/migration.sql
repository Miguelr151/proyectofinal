/*
  Warnings:

  - You are about to drop the column `pasword` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `pasword` on the `Tutor` table. All the data in the column will be lost.
  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Tutor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "pasword",
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "pasword",
ADD COLUMN     "password" TEXT NOT NULL;
