import { z } from "zod";

/**
 * Reddit URL validation schema
 * Validates URL format and extracts subreddit + post ID
 */
export const redditUrlSchema = z
	.string()
	.min(1, "URL is required")
	.refine(
		(url) => /reddit\.com\/r\/([^/]+)\/comments\/([a-z0-9]+)/i.test(url),
		{ message: "Invalid Reddit URL format" }
	);

/**
 * Extract subreddit and post ID from Reddit URL
 * @param url Reddit post URL
 * @returns Object with subreddit and postId
 */
export function extractRedditInfo(url: string): {
	subreddit: string;
	postId: string;
} {
	const urlPattern = /reddit\.com\/r\/([^/]+)\/comments\/([a-z0-9]+)/i;
	const match = url.match(urlPattern);

	if (!match) {
		throw new Error("Invalid Reddit URL format");
	}

	return {
		subreddit: match[1]!,
		postId: match[2]!,
	};
}
