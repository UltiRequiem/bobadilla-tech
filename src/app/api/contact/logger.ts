interface ContactSubmission {
	name: string;
	email: string;
	company?: string | null;
	message: string;
	id: number;
	createdAt: Date;
}

/**
 * Log contact form submission details
 * @param submission Contact form submission data
 */
export function logContactSubmission(submission: ContactSubmission): void {
	console.log("📧 New contact form submission:");
	console.log(`   Name: ${submission.name}`);
	console.log(`   Email: ${submission.email}`);
	console.log(`   Company: ${submission.company || "N/A"}`);
	console.log(`   Message: ${submission.message.substring(0, 100)}...`);
	console.log(`   ID: ${submission.id}`);
	console.log(`   Time: ${submission.createdAt.toISOString()}`);
}
