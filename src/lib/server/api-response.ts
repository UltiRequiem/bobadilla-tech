import { NextResponse } from "next/server";
import { type ZodError, type ZodTreeError } from "zod";

interface SuccessResponse<T = unknown> {
	success: true;
	message?: string;
	data?: T;
}

interface ErrorResponse {
	success: false;
	message: string;
	errors?: ZodTreeError;
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
	status = 200,
): NextResponse<SuccessResponse<T>> {
	return NextResponse.json(
		{
			success: true,
			...(message && { message }),
			...(data && { data }),
		},
		{ status },
	);
}

/**
 * Create an error API response
 * @param message Error message
 * @param status HTTP status code (default: 500)
 */
export function errorResponse(
	message: string,
	status = 500,
): NextResponse<ErrorResponse> {
	return NextResponse.json(
		{
			success: false,
			message,
		},
		{ status },
	);
}

/**
 * Create a validation error API response from Zod error
 * @param error Zod validation error
 * @param message Optional custom message (default: "Invalid request data")
 */
export function validationErrorResponse(
	error: ZodError,
	message = "Invalid request data",
): NextResponse<ErrorResponse> {
	return NextResponse.json(
		{
			success: false,
			message,
			errors: error.format() as ZodTreeError,
		},
		{ status: 400 },
	);
}
