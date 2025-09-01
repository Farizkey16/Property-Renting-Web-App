/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `check_in_date` to the `booking_rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `check_out_date` to the `booking_rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `booking_rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_rooms` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."booking_rooms" ADD COLUMN     "check_in_date" DATE NOT NULL,
ADD COLUMN     "check_out_date" DATE NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."rooms" ADD COLUMN     "total_rooms" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tenants_user_id_key" ON "public"."tenants"("user_id");
