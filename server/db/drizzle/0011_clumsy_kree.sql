CREATE TABLE `wishtree` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`adopter_id` bigint unsigned NOT NULL,
	`tree_id` bigint unsigned NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `wishtree_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `wishtree` ADD CONSTRAINT `wishtree_adopter_id_tree_adopters_id_fk` FOREIGN KEY (`adopter_id`) REFERENCES `tree_adopters`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wishtree` ADD CONSTRAINT `wishtree_tree_id_tree_id_fk` FOREIGN KEY (`tree_id`) REFERENCES `tree`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `adopter_id_idx_wishtree` ON `wishtree` (`adopter_id`);--> statement-breakpoint
CREATE INDEX `tree_id_idx_wishtree` ON `wishtree` (`tree_id`);