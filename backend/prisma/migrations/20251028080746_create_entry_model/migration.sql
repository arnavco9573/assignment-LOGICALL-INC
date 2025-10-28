/*
  Warnings:

  - You are about to drop the `movie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `movie`;

-- CreateTable
CREATE TABLE `Entry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('MOVIE', 'TV_SHOW') NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `director` VARCHAR(191) NULL,
    `budget` DECIMAL(10, 2) NULL,
    `location` VARCHAR(191) NULL,
    `duration` INTEGER NULL,
    `year` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
