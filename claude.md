# Project Architecture Guide

This document outlines the architectural patterns and conventions for this Next.js project.

## 📋 Table of Contents

- [Overview](#overview)
- [API Endpoints Architecture](#api-endpoints-architecture)
- [Tools Architecture](#tools-architecture)
- [Shared Utilities](#shared-utilities)
- [Directory Structure](#directory-structure)
- [Conventions](#conventions)
- [Examples](#examples)

## 🏗️ Overview

This project follows a modular, self-contained architecture where:

- API endpoints are organized with separated concerns (validation, business logic, database, external services)
- Tools are self-contained features with dedicated client and server logic
- Shared utilities are centralized in `src/lib/` for reusability
- Type safety is enforced throughout with TypeScript and Zod

## 🔌 API Endpoints Architecture

### Standard Structure

Every API endpoint should follow this modular pattern:

```
src/app/api/[endpoint-name]/
├── route.ts              # Main request handler (orchestrator)
├── validation.ts         # Input validation schemas (Zod)
├── db.ts                 # Database operations (if needed)
├── [service].ts          # External service integrations
└── logger.ts             # Logging utilities (if needed)
```

### File Responsibilities

#### `route.ts` - Request Handler

The orchestrator that coordinates all operations. Should be thin and delegate to other modules.

**Responsibilities:**

- Parse request data
- Call validation
- Orchestrate business logic
- Handle errors consistently
- Return standardized responses

**Example:**

```typescript
import type { NextRequest } from "next/server";
import { z } from "zod";
import {
	errorResponse,
	successResponse,
	validationErrorResponse,
} from "~/lib/server/api-response";
import { insertRecord } from "./db";
import { logAction } from "./logger";
import { mySchema } from "./validation";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validatedData = mySchema.parse(body);

		const result = await insertRecord(validatedData);
		logAction(result);

		return successResponse(result, "Success message", 201);
	} catch (error) {
		console.error("Error:", error);

		if (error instanceof z.ZodError) {
			return validationErrorResponse(error);
		}

		return errorResponse("Operation failed");
	}
}
```

#### `validation.ts` - Input Validation

Zod schemas for request validation and data extraction.

**Responsibilities:**

- Define input schemas
- Validation rules
- Data transformation/extraction utilities

**Example:**

```typescript
import { z } from "zod";

export const mySchema = z.object({
	name: z.string().min(1).max(100),
	email: z.string().email(),
	optional: z.string().optional(),
});

export type MySchemaType = z.infer<typeof mySchema>;
```

#### `db.ts` - Database Operations

All database queries for this endpoint.

**Responsibilities:**

- Database CRUD operations
- Query composition
- Data mapping

**Example:**

```typescript
import { db } from "~/db/client";
import { myTable } from "~/db/schema";

interface RecordData {
	name: string;
	email: string;
}

export async function insertRecord(data: RecordData) {
	const [inserted] = await db.insert(myTable).values(data).returning();

	return inserted;
}
```

#### `[service].ts` - External Services

Integration with third-party APIs or services.

**Responsibilities:**

- External API calls
- Response parsing
- Error handling for external services

**Example:**

```typescript
export async function callExternalService(data: SomeData) {
	const response = await fetch("https://api.example.com/endpoint", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("External service failed");
	}

	return response.json();
}
```

#### `logger.ts` - Logging

Structured logging for this endpoint.

**Responsibilities:**

- Console logging
- Log formatting
- Observability

**Example:**

```typescript
interface LogData {
	id: number;
	name: string;
	timestamp: Date;
}

export function logAction(data: LogData): void {
	console.log("📝 Action performed:");
	console.log(`   ID: ${data.id}`);
	console.log(`   Name: ${data.name}`);
	console.log(`   Time: ${data.timestamp.toISOString()}`);
}
```

### Response Format

All API endpoints **MUST** use standardized response utilities from `~/lib/server/api-response.ts`:

#### Success Response

```typescript
successResponse(
  { id: 123, name: "Result" },  // data (optional)
  "Operation successful",        // message (optional)
  201                            // status code (default: 200)
)

// Returns:
{
  success: true,
  message: "Operation successful",
  data: { id: 123, name: "Result" }
}
```

#### Error Response

```typescript
errorResponse(
  "Something went wrong",  // message
  500                      // status code (default: 500)
)

// Returns:
{
  success: false,
  message: "Something went wrong"
}
```

#### Validation Error Response

```typescript
validationErrorResponse(
  zodError,               // Zod error object
  "Invalid input"         // message (default: "Invalid request data")
)

// Returns:
{
  success: false,
  message: "Invalid input",
  errors: { /* Zod formatted errors */ }
}
```

## 🛠️ Tools Architecture

### Standard Structure

Tools are self-contained features with both UI and API logic:

```
src/app/tools/[tool-name]/
├── page.tsx              # Client UI component
├── utils.ts              # Client-side utilities
└── types.ts              # Shared types (optional)

src/app/api/[tool-name]/
├── route.ts              # API handler
├── validation.ts         # Input validation
├── [service].ts          # Business logic
└── ... (other modules as needed)
```

### When to Keep Tools Self-Contained

Tools should remain self-contained (not sharing utilities) when:

- The logic is specific to that tool's domain
- The utility would not be reused by other features
- The tool is a standalone feature with no cross-dependencies

### When to Extract to Shared Libraries

Extract to `src/lib/` when:

- Multiple tools use the same utility
- The utility is generic and reusable (date formatting, URL parsing, etc.)
- The code would benefit from centralized testing

## 📚 Shared Utilities

### `src/lib/server/` - Server-Side Utilities

#### `api-response.ts`

Standardized API response helpers. **All endpoints must use these.**

```typescript
import {
	successResponse,
	errorResponse,
	validationErrorResponse,
} from "~/lib/server/api-response";
```

### Future Shared Utilities

As the project grows, add shared utilities here:

- `src/lib/server/auth.ts` - Authentication utilities
- `src/lib/server/middleware.ts` - Request middleware
- `src/lib/server/cache.ts` - Caching utilities
- `src/lib/client/` - Client-side shared utilities

## 📁 Directory Structure

```
bobadilla-work/
├── src/
│   ├── app/
│   │   ├── api/                    # API routes
│   │   │   ├── contact/            # Contact form endpoint
│   │   │   │   ├── route.ts
│   │   │   │   ├── validation.ts
│   │   │   │   ├── db.ts
│   │   │   │   ├── email-notification.ts
│   │   │   │   └── logger.ts
│   │   │   └── reddit-post-date/   # Reddit tool endpoint
│   │   │       ├── route.ts
│   │   │       ├── validation.ts
│   │   │       └── reddit-client.ts
│   │   │
│   │   ├── tools/                  # Tool UIs
│   │   │   ├── page.tsx            # Tools catalog
│   │   │   └── reddit-post-date/
│   │   │       ├── page.tsx
│   │   │       └── utils.ts
│   │   │
│   │   └── ... (other app routes)
│   │
│   ├── lib/
│   │   ├── server/                 # Server-only utilities
│   │   │   └── api-response.ts
│   │   └── ... (other shared code)
│   │
│   ├── db/
│   │   ├── client.ts               # Database client
│   │   └── schema.ts               # Database schema
│   │
│   └── env.ts                      # Environment config
│
├── claude.md                       # This file
└── ... (config files)
```

## 📏 Conventions

### Naming Conventions

- **Directories**: kebab-case (`reddit-post-date`)
- **Files**: kebab-case (`api-response.ts`, `email-notification.ts`)
- **Functions**: camelCase (`insertContactMessage`, `logAction`)
- **Types/Interfaces**: PascalCase (`ContactData`, `RedditApiResponse`)
- **Constants**: UPPER_SNAKE_CASE (rare, use `as const` instead)

### File Organization

1. **Imports** - Group by source:

   ```typescript
   // External packages
   import type { NextRequest } from "next/server";
   import { z } from "zod";

   // Shared utilities
   import { successResponse } from "~/lib/server/api-response";

   // Local modules
   import { insertRecord } from "./db";
   import { mySchema } from "./validation";
   ```

2. **Types/Interfaces** - Define before usage

3. **Functions** - Export functions in order of importance

### Error Handling

All endpoints must handle errors consistently:

```typescript
try {
	// Main logic
} catch (error) {
	console.error("Context-specific error:", error);

	// Handle Zod validation errors
	if (error instanceof z.ZodError) {
		return validationErrorResponse(error);
	}

	// Handle known Error instances
	if (error instanceof Error) {
		return errorResponse(error.message, 400);
	}

	// Fallback for unknown errors
	return errorResponse("Unexpected error occurred");
}
```

### Type Safety

- Use TypeScript `strict` mode
- Prefer interfaces over types for objects
- Use Zod for runtime validation
- Infer types from Zod schemas: `type MyType = z.infer<typeof mySchema>`
- Avoid `any` - use `unknown` and type guards instead

### Database Operations

- All database operations go in `db.ts`
- Use Drizzle ORM for type-safe queries
- Always use `.returning()` for insert operations
- Handle database errors gracefully

### Environment Variables

- Define in `src/env.ts` using T3 Env
- Validate at startup
- Access via `env.VARIABLE_NAME`
- Never commit secrets to `.env.production`

## 📝 Examples

### Example 1: Contact Form Endpoint

Perfect example of modular architecture:

```
src/app/api/contact/
├── route.ts              # Orchestrates the flow
├── validation.ts         # Zod schema for form data
├── db.ts                 # Database insert operation
├── email-notification.ts # External email service
└── logger.ts             # Console logging
```

**Key Features:**

- ✅ Separated concerns
- ✅ Reusable modules
- ✅ Type-safe validation
- ✅ Standardized responses
- ✅ Error handling doesn't block main flow

### Example 2: Reddit Post Date Endpoint

Example of stateless API with external service:

```
src/app/api/reddit-post-date/
├── route.ts              # GET handler
├── validation.ts         # URL validation and extraction
└── reddit-client.ts      # Reddit API integration
```

**Key Features:**

- ✅ No database needed
- ✅ URL validation with Zod
- ✅ External API client module
- ✅ Timestamp validation
- ✅ Standardized responses

## 🚀 Creating a New Endpoint

1. **Create directory structure:**

   ```bash
   mkdir -p src/app/api/my-endpoint
   ```

2. **Create validation schema** (`validation.ts`):

   ```typescript
   import { z } from "zod";

   export const mySchema = z.object({
   	field: z.string().min(1),
   });
   ```

3. **Create route handler** (`route.ts`):

   ```typescript
   import type { NextRequest } from "next/server";
   import { z } from "zod";
   import {
   	successResponse,
   	errorResponse,
   	validationErrorResponse,
   } from "~/lib/server/api-response";
   import { mySchema } from "./validation";

   export async function POST(request: NextRequest) {
   	try {
   		const body = await request.json();
   		const validatedData = mySchema.parse(body);

   		// Your business logic here

   		return successResponse({ result: "data" });
   	} catch (error) {
   		console.error("Error:", error);

   		if (error instanceof z.ZodError) {
   			return validationErrorResponse(error);
   		}

   		return errorResponse("Operation failed");
   	}
   }
   ```

4. **Add additional modules as needed:**
   - `db.ts` - If database operations
   - `[service].ts` - If external API calls
   - `logger.ts` - If complex logging needed

## ✅ Checklist for New Endpoints

- [ ] Created directory under `src/app/api/`
- [ ] Added `validation.ts` with Zod schemas
- [ ] Created `route.ts` with proper error handling
- [ ] Used standardized response utilities
- [ ] Added database module (`db.ts`) if needed
- [ ] Created service module for external APIs if needed
- [ ] Added logging if needed
- [ ] Tested error cases
- [ ] Verified TypeScript types
- [ ] Documented any non-obvious logic

## 🔄 Migration Guide

If you find an endpoint not following this architecture:

1. Create the modular file structure
2. Extract validation to `validation.ts`
3. Extract database operations to `db.ts`
4. Extract external services to separate files
5. Update `route.ts` to use standardized responses
6. Test thoroughly

## 📖 Additional Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Zod Documentation](https://zod.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [T3 Env Documentation](https://env.t3.gg/)

---

**Last Updated:** 2025-12-03

For questions or suggestions, contact the development team.
