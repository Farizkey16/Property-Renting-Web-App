/*
  Warnings:

  - Added the required column `check_in_date` to the `booking_rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `check_out_date` to the `booking_rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."booking_rooms" ADD COLUMN     "check_in_date" DATE NOT NULL,
ADD COLUMN     "check_out_date" DATE NOT NULL;
