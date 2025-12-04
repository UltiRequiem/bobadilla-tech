import { env } from "~/env";

interface ContactData {
	name: string;
	email: string;
	company?: string | null;
	message: string;
	createdAt: string;
}

/**
 * Send contact form notification to external email worker
 * @param data Contact form data to send
 * @throws Error if the fetch fails
 */
export async function sendEmailNotification(data: ContactData): Promise<void> {
	if (!env.EMAIL_WORKER_URL || !env.EMAIL_WORKER_API_KEY) {
		if (env.NODE_ENV !== "production") {
			console.log(
				"📧 Email sending skipped (no EMAIL_WORKER_URL or API_KEY configured)",
			);
		}

		return;
	}

	await fetch(env.EMAIL_WORKER_URL, {
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
}
