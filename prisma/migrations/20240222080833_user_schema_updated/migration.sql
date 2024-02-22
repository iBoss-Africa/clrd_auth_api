/*
  Warnings:

  - You are about to drop the column `driverlicenseNo` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "driverlicenseNo",
ADD COLUMN     "driverLicenseNo" TEXT;
