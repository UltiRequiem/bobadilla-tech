import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/db/client";
import { contactMessages } from "~/db/schema";
import { sendEmailNotification } from "./email-notification";
import { contactSchema } from "./validation";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validatedData = contactSchema.parse(body);

		const [insertedMessage] = await db
			.insert(contactMessages)
			.values({
				name: validatedData.name,
				email: validatedData.email,
				company: validatedData.company || null,
				message: validatedData.message,
			})
			.returning();

		console.log("📧 New contact form submission:");
		console.log(`   Name: ${validatedData.name}`);
		console.log(`   Email: ${validatedData.email}`);
		console.log(`   Company: ${validatedData.company || "N/A"}`);
		console.log(`   Message: ${validatedData.message.substring(0, 100)}...`);
		console.log(`   ID: ${insertedMessage.id}`);
		console.log(`   Time: ${insertedMessage.createdAt.toISOString()}`);

		try {
			await sendEmailNotification({
				name: validatedData.name,
				email: validatedData.email,
				company: validatedData.company,
				message: validatedData.message,
				createdAt: insertedMessage.createdAt.toISOString(),
			});
		} catch (emailError) {
			console.error("Email notification failed:", emailError);
		}

		return NextResponse.json(
			{
				success: true,
				message: "Thank you for contacting us! We'll get back to you soon.",
				id: insertedMessage.id,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Contact form error:", error);

		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid form data",
					errors: z.treeifyError(error),
				},
				{ status: 400 },
			);
		}

		return NextResponse.json(
			{
				success: false,
				message: "Failed to submit contact form. Please try again later.",
			},
			{ status: 500 },
		);
	}
}
