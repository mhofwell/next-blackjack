/*
  Warnings:

  - You are about to drop the column `adjustment` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "adjustment",
ADD COLUMN     "goal_adjustment" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "own_goal_adjustment" INTEGER NOT NULL DEFAULT 0;
