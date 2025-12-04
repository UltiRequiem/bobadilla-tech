import { render } from "@react-email/components";
import { createMimeMessage } from "mimetext";
import { ContactNotification } from "~/emails/ContactNotification";

// Type definition for Cloudflare Email Message
// @see https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/
declare class EmailMessage {
  constructor(from: string, to: string, raw: string | ReadableStream);
}

// Cloudflare environment with Email Workers binding
interface CloudflareEnv {
  SEND_EMAIL?: {
    send(message: EmailMessage): Promise<void>;
  };
}

/**
 * Send email using Cloudflare Email Workers native API
 *
 * This uses the official Cloudflare Email Workers send_email binding
 * 100% Cloudflare-native solution!
 *
 * Setup in wrangler.jsonc:
 * ```jsonc
 * "send_email": [
 *   {
 *     "name": "SEND_EMAIL",
 *     "destination_address": "ale@bobadilla.work"
 *   },
 *   {
 *     "name": "SEND_EMAIL",
 *     "destination_address": "eliaz@bobadilla.work"
 *   }
 * ]
 * ```
 *
 * @see https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/
 */
export async function sendContactNotification(
  {
    name,
    email,
    company,
    message,
    createdAt,
  }: {
    name: string;
    email: string;
    company?: string;
    message: string;
    createdAt: Date;
  },
  env: CloudflareEnv
) {
  const recipients = ["ale@bobadilla.work", "eliaz@bobadilla.work"];

  // Render React Email template to HTML
  const html = await render(
    ContactNotification({
      name,
      email,
      company,
      message,
      createdAt,
    })
  );

  // Create plain text version
  const text = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || "N/A"}
Message: ${message}

Submitted: ${createdAt.toLocaleString()}

Reply directly to ${email} to respond.
  `.trim();

  // Send to each recipient
  const emailPromises = recipients.map(async (to) => {
    // Create MIME message
    const msg = createMimeMessage();
    msg.setSender({ name: "Boba Tech Contact Form", addr: "contact-us@bobadilla.work" });
    msg.setRecipient(to);
    msg.setSubject(`New Contact Form Submission from ${name}`);

    // Add plain text version
    msg.addMessage({
      contentType: "text/plain",
      data: text,
    });

    // Add HTML version
    msg.addMessage({
      contentType: "text/html",
      data: html,
    });

    // Set reply-to
    msg.setHeader("Reply-To", `${name} <${email}>`);

    // Send via Cloudflare Email Workers
    if (!env?.SEND_EMAIL) {
      throw new Error(
        "SEND_EMAIL binding not found. Ensure Email Routing is enabled in Cloudflare Dashboard " +
        "and wrangler.jsonc is configured with send_email binding."
      );
    }

    try {
      const emailMessage = new EmailMessage(
        "contact-us@bobadilla.work",
        to,
        msg.asRaw()
      );
      await env.SEND_EMAIL.send(emailMessage);
      console.log(`✓ Email sent to ${to} via Cloudflare Email Workers`);
    } catch (error) {
      console.error(`✗ Failed to send to ${to}:`, error);
      throw error;
    }
  });

  try {
    await Promise.all(emailPromises);
    return { success: true };
  } catch (error) {
    console.error("Failed to send email notifications:", error);
    throw error;
  }
}
