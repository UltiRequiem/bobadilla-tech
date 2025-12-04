import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/db/client";
import { contactMessages } from "~/db/schema";
import { env } from "~/env";
import { Resend } from "resend";
import { ContactNotification } from "~/emails/ContactNotification";

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

    // Send email notifications if Resend API key is configured
    if (env.RESEND_API_KEY) {
      try {
        const resend = new Resend(env.RESEND_API_KEY);

        // Send notification emails to both ale and eliaz
        const recipients = ["ale@bobadilla.work", "eliaz@bobadilla.work"];

        await Promise.all(
          recipients.map((to) =>
            resend.emails.send({
              from: "Boba Tech Contact Form <contact@bobadilla.work>",
              to,
              subject: `New Contact Form Submission from ${validatedData.name}`,
              react: ContactNotification({
                name: validatedData.name,
                email: validatedData.email,
                company: validatedData.company,
                message: validatedData.message,
                createdAt: insertedMessage.createdAt,
              }),
            })
          )
        );

        console.log("✓ Email notifications sent successfully");
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error("✗ Failed to send email notifications:", emailError);
        // Continue - message was saved to database
      }
    } else {
      console.log("ℹ Email notifications disabled (no RESEND_API_KEY)");
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
          errors: error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
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
