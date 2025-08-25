/*
  Warnings:

  - Added the required column `quantity` to the `booking_rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."booking_rooms" ADD COLUMN     "quantity" INTEGER NOT NULL;
