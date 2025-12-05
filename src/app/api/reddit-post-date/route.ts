import type { NextRequest } from "next/server";
import { z } from "zod";
import { errorResponse, successResponse } from "~/lib/server/api-response";
import { fetchRedditPostTimestamp, validateTimestamp } from "./reddit-client";
import { extractRedditInfo, redditUrlSchema } from "./validation";

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const url = searchParams.get("url");

		if (!url) {
			return errorResponse("URL parameter is required", 400);
		}

		// Validate URL format
		redditUrlSchema.parse(url);

		// Extract subreddit and post ID
		const { subreddit, postId } = extractRedditInfo(url);

		// Fetch timestamp from Reddit API
		const timestamp = await fetchRedditPostTimestamp(subreddit, postId);

		// Validate timestamp is within reasonable bounds
		validateTimestamp(timestamp);

		return successResponse({ timestamp, postId });
	} catch (error) {
		console.error("Error fetching Reddit post:", error);

		if (error instanceof z.ZodError) {
			return errorResponse(error.issues[0]?.message ?? "Invalid URL", 400);
		}

		if (error instanceof Error) {
			return errorResponse(error.message, 400);
		}

		return errorResponse(
			"An unexpected error occurred while fetching post data",
			500
		);
	}
}
