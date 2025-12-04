CREATE TABLE `contact_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`company` text,
	`message` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
