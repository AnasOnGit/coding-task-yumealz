/*
  Warnings:

  - You are about to drop the `test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `test`;

-- CreateTable
CREATE TABLE `Captains` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `joining_date` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Captains_email_key`(`email`),
    UNIQUE INDEX `Captains_phone_number_key`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CaptainAttributes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `captain_id` INTEGER NOT NULL,
    `vehicle_type` VARCHAR(191) NOT NULL,
    `vehicle_model` VARCHAR(191) NOT NULL,
    `vehicle_color` VARCHAR(191) NOT NULL,
    `vehicle_plate_number` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CaptainStatistics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `captain_id` INTEGER NOT NULL,
    `total_distance_traveled` DOUBLE NOT NULL,
    `total_orders_delivered` INTEGER NOT NULL,
    `total_orders_canceled` INTEGER NOT NULL,
    `total_orders_rejected` INTEGER NOT NULL,
    `total_orders_accepted` INTEGER NOT NULL,
    `total_rating` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_number` VARCHAR(191) NOT NULL,
    `customer_name` VARCHAR(191) NOT NULL,
    `customer_phone_number` VARCHAR(191) NOT NULL,
    `customer_longitude` DOUBLE NOT NULL,
    `customer_latitude` DOUBLE NOT NULL,
    `order_status` VARCHAR(191) NOT NULL,
    `captain_id` INTEGER NOT NULL,
    `delivered_at` DATETIME(3) NOT NULL,
    `order_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Orders_order_number_key`(`order_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
