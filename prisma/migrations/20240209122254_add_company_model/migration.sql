/*
  Warnings:

  - You are about to drop the column `fullname` on the `User` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fullname",
ADD COLUMN     "firstName" VARCHAR(30) NOT NULL,
ADD COLUMN     "lastName" VARCHAR(30) NOT NULL;

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "companyName" VARCHAR(100) NOT NULL,
    "country" VARCHAR(45),
    "state" VARCHAR(40),
    "city" VARCHAR(45),
    "streetAddress" VARCHAR(150),
    "postalCode" TEXT,
    "cacUrl" TEXT,
    "cacNo" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);
