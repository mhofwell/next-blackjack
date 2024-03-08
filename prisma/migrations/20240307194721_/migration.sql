/*
  Warnings:

  - Added the required column `fn` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ln` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fn" TEXT NOT NULL,
ADD COLUMN     "ln" TEXT NOT NULL;
