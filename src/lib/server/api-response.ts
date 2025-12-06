import { NextResponse } from "next/server";
import type { ZodError } from "zod";

interface SuccessResponse<T = unknown> {
	success: true;
	message?: string;
	data?: T;
}

interface FieldError {
	field: string;
	message: string;
}

interface ErrorResponse {
	success: false;
	message: string;
	errors?: FieldError[];
}

/**
 * Create a successful API response
 * @param data Response data
 * @param message Optional success message
 * @param status HTTP status code (default: 200)
 */
export function successResponse<T>(
	data?: T,
	message?: string,
	status = 200
): NextResponse<SuccessResponse<T>> {
	return NextResponse.json(
		{
			success: true,
			...(message && { message }),
			...(data && { data }),
		},
		{ status }
	);
}

/**
 * Create an error API response
 * @param message Error message
 * @param status HTTP status code (default: 500)
 */
export function errorResponse(
	message: string,
	status = 500
): NextResponse<ErrorResponse> {
	return NextResponse.json(
		{
			success: false,
			message,
		},
		{ status }
	);
}

/**
 * Create a validation error API response from Zod error
 * @param error Zod validation error
 * @param message Optional custom message (default: "Invalid request data")
 */
export function validationErrorResponse(
	error: ZodError,
	message = "Invalid request data"
): NextResponse<ErrorResponse> {
	// Format errors to show field-specific messages with exact details
	const fieldErrors: FieldError[] = error.issues.map((issue) => ({
		field: issue.path.join(".") || "root",
		message: issue.message,
	}));

	return NextResponse.json(
		{
			success: false,
			message,
			errors: fieldErrors,
		},
		{ status: 400 }
	);
}
