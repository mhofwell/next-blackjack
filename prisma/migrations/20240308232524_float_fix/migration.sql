-- AlterTable
ALTER TABLE "Pool" ALTER COLUMN "fee" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "treasury" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hashedPassword" SET DEFAULT '11111111';