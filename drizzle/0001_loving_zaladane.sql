CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`post_content` text NOT NULL,
	`virality_score` integer NOT NULL,
	`character_count` integer NOT NULL,
	`post_type` text NOT NULL,
	`tone` text NOT NULL,
	`length` text NOT NULL,
	`format` text NOT NULL,
	`hook_style` text NOT NULL,
	`cta_type` text NOT NULL,
	`hashtag_strategy` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
