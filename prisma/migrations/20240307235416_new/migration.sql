/*
  Warnings:

  - You are about to drop the column `team_id` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `team_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `teamId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_team_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_team_id_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "team_id",
ADD COLUMN     "teamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "team_id",
ADD COLUMN     "teamId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
