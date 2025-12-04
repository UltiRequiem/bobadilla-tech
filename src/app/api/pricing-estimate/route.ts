import type { NextRequest } from "next/server";
import { z } from "zod";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
	errorResponse,
	successResponse,
	validationErrorResponse,
} from "~/lib/server/api-response";
import { getDb } from "~/db/client";
import { pricingEstimates } from "~/db/schema";

const estimateSchema = z.object({
	email: z.string().email("Invalid email address"),
	totalPrice: z.number().positive("Total price must be positive"),
	selections: z.record(z.string(), z.array(z.string())),
	breakdown: z.string(),
});

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validatedData = estimateSchema.parse(body);

		// Get Cloudflare D1 database from context
		const { env } = await getCloudflareContext();
		const db = getDb(env.DB);

		const [inserted] = await db
			.insert(pricingEstimates)
			.values({
				email: validatedData.email,
				totalPrice: validatedData.totalPrice,
				selections: validatedData.selections,
				breakdown: validatedData.breakdown,
				createdAt: new Date(),
			})
			.returning();

		console.log("📊 Pricing estimate saved:");
		console.log(`   Email: ${validatedData.email}`);
		console.log(`   Total: $${validatedData.totalPrice}`);
		console.log(`   ID: ${inserted.id}`);

		return successResponse(
			{ id: inserted.id },
			"Estimate saved successfully",
			201
		);
	} catch (error) {
		console.error("Error saving pricing estimate:", error);

		if (error instanceof z.ZodError) {
			return validationErrorResponse(error);
		}

		return errorResponse("Failed to save estimate");
	}
}
