import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/db/client";
import { contactMessages } from "~/db/schema";
import { sendContactNotification } from "~/lib/email";

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  company: z.string().max(100).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Insert into database
    const [insertedMessage] = await db
      .insert(contactMessages)
      .values({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company || null,
        message: validatedData.message,
      })
      .returning();

    // Log the submission for internal tracking
    console.log("📧 New contact form submission:");
    console.log(`   Name: ${validatedData.name}`);
    console.log(`   Email: ${validatedData.email}`);
    console.log(`   Company: ${validatedData.company || "N/A"}`);
    console.log(`   Message: ${validatedData.message.substring(0, 100)}...`);
    console.log(`   ID: ${insertedMessage.id}`);
    console.log(`   Time: ${insertedMessage.createdAt.toISOString()}`);

    // Send email notification via Cloudflare Email Workers
    try {
      // Access Cloudflare bindings from request context (OpenNext.js)
      // @ts-expect-error - Cloudflare env is available in production
      const env = request.cloudflare?.env || process.env;

      await sendContactNotification(
        {
          name: validatedData.name,
          email: validatedData.email,
          company: validatedData.company,
          message: validatedData.message,
          createdAt: insertedMessage.createdAt,
        },
        env
      );
    } catch (emailError) {
      // Log error but don't fail the request - message is already saved
      console.error("Email notification failed:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us! We'll get back to you soon.",
        id: insertedMessage.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form data",
          errors: error.issues.map((issue) => ({
            field: issue.path[0],
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle database errors
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit contact form. Please try again later.",
      },
      { status: 500 }
    );
  }
}
