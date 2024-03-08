/*
  Warnings:

  - You are about to drop the column `isAuth` on the `User` table. All the data in the column will be lost.
  - The `paid` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAuth",
ALTER COLUMN "hashedPassword" SET DEFAULT '',
DROP COLUMN "paid",
ADD COLUMN     "paid" "Paid" NOT NULL DEFAULT 'NO';
