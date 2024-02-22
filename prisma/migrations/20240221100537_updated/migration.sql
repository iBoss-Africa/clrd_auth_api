-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" VARCHAR(45),
ADD COLUMN     "country" VARCHAR(7),
ADD COLUMN     "driverLicense" TEXT,
ADD COLUMN     "driverlicenseNo" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "state" VARCHAR(40),
ADD COLUMN     "streetAddress" VARCHAR(150);
