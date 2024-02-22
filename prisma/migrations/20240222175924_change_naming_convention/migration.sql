/*
  Warnings:

  - You are about to drop the column `user_id` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_role_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_id_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "role_id",
ADD COLUMN     "roleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role_id",
ADD COLUMN     "roleId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
