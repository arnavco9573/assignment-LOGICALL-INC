/*
  Warnings:

  - You are about to alter the column `budget` on the `entry` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(15,2)`.

*/
-- AlterTable
ALTER TABLE `entry` MODIFY `budget` DECIMAL(15, 2) NULL;
