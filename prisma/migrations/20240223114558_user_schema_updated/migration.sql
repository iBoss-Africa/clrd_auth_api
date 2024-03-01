/*
  Warnings:

  - You are about to drop the column `company_id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_company_id_fkey";

-- DropIndex
DROP INDEX "User_company_id_key";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "user_id" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "company_id";

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
