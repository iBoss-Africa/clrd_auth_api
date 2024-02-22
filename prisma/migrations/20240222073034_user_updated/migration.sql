/*
  Warnings:

  - You are about to drop the column `driverLicense` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "user_id" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "driverLicense",
ADD COLUMN     "driverLicenseUrl" TEXT;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
