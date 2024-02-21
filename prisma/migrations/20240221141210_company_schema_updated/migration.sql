/*
  Warnings:

  - You are about to drop the column `avatar` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `Company` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_role_id_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "avatar",
DROP COLUMN "password",
DROP COLUMN "role_id",
ADD COLUMN     "user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
