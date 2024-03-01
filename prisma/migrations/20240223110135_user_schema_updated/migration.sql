/*
  Warnings:

  - You are about to drop the column `admin_id` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[company_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_admin_id_fkey";

-- DropIndex
DROP INDEX "Company_admin_id_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "admin_id",
ADD COLUMN     "password" VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "company_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_company_id_key" ON "User"("company_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
