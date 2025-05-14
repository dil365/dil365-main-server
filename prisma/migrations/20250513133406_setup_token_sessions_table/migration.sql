-- AlterTable
ALTER TABLE `UserDetails` MODIFY `birthdate` DATE NULL;

-- CreateTable
CREATE TABLE `TokenSessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_for` VARCHAR(100) NOT NULL,
    `token` TEXT NOT NULL,
    `payload` JSON NOT NULL,
    `expired_in` DATE NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `owner_id` INTEGER NOT NULL,

    INDEX `owner_id`(`owner_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TokenSessions` ADD CONSTRAINT `TokenSessions_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
