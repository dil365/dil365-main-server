/*
  Warnings:

  - You are about to drop the column `first_name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Users` table. All the data in the column will be lost.
  - Added the required column `email_registered` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Users` DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    ADD COLUMN `email_registered` BOOLEAN NOT NULL,
    ADD COLUMN `password` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `UserDetails` (
    `user_id` INTEGER NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `birthdate` DATETIME(0) NULL,

    UNIQUE INDEX `user_id`(`user_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserDetails` ADD CONSTRAINT `UserDetails_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
