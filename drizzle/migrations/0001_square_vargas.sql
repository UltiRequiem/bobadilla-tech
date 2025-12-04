CREATE TABLE `pricing_estimates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`total_price` integer NOT NULL,
	`selections` text NOT NULL,
	`breakdown` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
