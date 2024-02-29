/*
  Warnings:

  - You are about to drop the column `user_id` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[admin_id]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `admin_id` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_user_id_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "user_id",
ADD COLUMN     "admin_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_admin_id_key" ON "Company"("admin_id");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
