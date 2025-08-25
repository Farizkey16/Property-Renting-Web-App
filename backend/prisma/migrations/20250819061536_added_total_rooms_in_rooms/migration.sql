/*
  Warnings:

  - Added the required column `total_rooms` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."rooms" ADD COLUMN     "total_rooms" INTEGER NOT NULL;
