CREATE TABLE `tree_adopters` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`phone` varchar(20),
	`avatar` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `tree_adopters_id` PRIMARY KEY(`id`),
	CONSTRAINT `tree_adopters_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `adopt_history` DROP FOREIGN KEY `adopt_history_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `adopt_history` ADD `adopter_id` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `adopt_history` ADD CONSTRAINT `adopt_history_adopter_id_tree_adopters_id_fk` FOREIGN KEY (`adopter_id`) REFERENCES `tree_adopters`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `tree_id_idx_adopt_history` ON `adopt_history` (`tree_id`);--> statement-breakpoint
CREATE INDEX `adopter_id_idx_adopt_history` ON `adopt_history` (`adopter_id`);--> statement-breakpoint
ALTER TABLE `adopt_history` DROP COLUMN `user_id`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `role`;