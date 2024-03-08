/*
  Warnings:

  - You are about to drop the column `isLoggedIn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `team` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Init` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('GBP', 'CAD', 'USD');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'BUST', 'ELIMINATED', 'WINNER');

-- CreateEnum
CREATE TYPE "Paid" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "League" AS ENUM ('PL');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isLoggedIn",
DROP COLUMN "team",
ADD COLUMN     "isAuth" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paid" TEXT DEFAULT '',
ADD COLUMN     "team_id" INTEGER;

-- DropTable
DROP TABLE "Init";

-- CreateTable
CREATE TABLE "Pool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "league" "League" NOT NULL,
    "gameweek" INTEGER NOT NULL,
    "fee" INTEGER NOT NULL,
    "treasury" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "own_goals" INTEGER NOT NULL DEFAULT 0,
    "net_goals" INTEGER NOT NULL DEFAULT 0,
    "status" "Status" NOT NULL DEFAULT 'INACTIVE',
    "paid" "Paid" NOT NULL DEFAULT 'NO',
    "poolId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "standing" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL,
    "fn" TEXT NOT NULL,
    "ln" TEXT NOT NULL,
    "team_id" INTEGER NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EntryToPlayer" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pool_id_key" ON "Pool"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_id_key" ON "Entry"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_userId_poolId_key" ON "Entry"("userId", "poolId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_EntryToPlayer_AB_unique" ON "_EntryToPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_EntryToPlayer_B_index" ON "_EntryToPlayer"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pool" ADD CONSTRAINT "Pool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToPlayer" ADD CONSTRAINT "_EntryToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToPlayer" ADD CONSTRAINT "_EntryToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
