/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "phone" VARCHAR(11) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_phone_key" ON "Company"("phone");
