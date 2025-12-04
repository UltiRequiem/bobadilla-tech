import type { NextRequest } from "next/server";
import { z } from "zod";
import {
	errorResponse,
	successResponse,
	validationErrorResponse,
} from "~/lib/server/api-response";
import { insertContactMessage } from "./db";
import { sendEmailNotification } from "./email-notification";
import { logContactSubmission } from "./logger";
import { contactSchema } from "./validation";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validatedData = contactSchema.parse(body);

		const insertedMessage = await insertContactMessage(validatedData);

		logContactSubmission(insertedMessage);

		try {
			await sendEmailNotification(insertedMessage);
		} catch (emailError) {
			console.error("Email notification failed:", emailError);
		}

		return successResponse(
			{ id: insertedMessage.id },
			"Thank you for contacting us! We'll get back to you soon.",
			201,
		);
	} catch (error) {
		console.error("Contact form error:", error);

		if (error instanceof z.ZodError) {
			return validationErrorResponse(error, "Invalid form data");
		}

		return errorResponse(
			"Failed to submit contact form. Please try again later.",
		);
	}
}
