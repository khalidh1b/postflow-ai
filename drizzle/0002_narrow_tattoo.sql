CREATE TABLE `user_feedback` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text,
	`name` text,
	`email` text,
	`feedback_type` text NOT NULL,
	`message` text NOT NULL,
	`rating` integer,
	`page_url` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);