-- CreateTable
CREATE TABLE `Words` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sl` VARCHAR(50) NOT NULL,
    `tl` VARCHAR(50) NOT NULL,
    `word` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `syntactic` VARCHAR(100) NOT NULL,
    `level` ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2') NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `example` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Words_word_key`(`word`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
