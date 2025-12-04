import { env } from "~/env";

/**
 * Email notification service using external email worker microservice
 * @see https://github.com/UltiRequiem/email-worker
 */

interface ContactData {
	name: string;
	email: string;
	company?: string | null;
	message: string;
	createdAt: string | Date;
}

/**
 * Send contact form notification to external email worker
 * @param data Contact form data to send
 * @throws Error if the fetch fails
 */
export async function sendEmailNotification(data: ContactData): Promise<void> {
	if (!env.EMAIL_WORKER_URL || !env.EMAIL_WORKER_API_KEY) {
		if (env.NODE_ENV !== "production") {
			console.log("📧 Email sending skipped: no EMAIL_WORKER_URL or API_KEY configured");
		}
		return;
	}

	try {
		console.log(`📤 Sending email notification to worker: URL=${env.EMAIL_WORKER_URL}, Name="${data.name}", Email="${data.email}"`);

		const response = await fetch(env.EMAIL_WORKER_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-Key": env.EMAIL_WORKER_API_KEY,
			},
			body: JSON.stringify({
				name: data.name,
				email: data.email,
				company: data.company,
				message: data.message,
				createdAt: data.createdAt,
			}),
		});

		if (!response.ok) {
			throw new Error(`Email worker responded with ${response.status}: ${response.statusText}`);
		}

		console.log(`✅ Email notification sent successfully: Status=${response.status}, Name="${data.name}"`);
	} catch (error) {
		console.error(`❌ Email notification failed: ${error instanceof Error ? error.message : 'Unknown error'}, Name="${data.name}", Email="${data.email}"`);
		throw error;
	}
}
