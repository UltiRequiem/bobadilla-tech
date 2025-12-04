/**
 * Example: Database client setup with Cloudflare D1
 *
 * This is an example file showing how to use D1 database with Drizzle ORM.
 */

import { env } from "~/env";

// Example: Getting the database instance in an API route
export function exampleDatabaseUsage() {
	console.log("Database Configuration:");
	console.log("- D1 Database: bobadilla-work");
	console.log("- Binding: DB");
	console.log("- Environment:", env.NODE_ENV);

	// In actual code, you would get the D1 binding from the request:
	// import { getDb } from "~/db/client";
	// const db = getDb(request.cloudflare?.env?.DB);

	// Example query with Drizzle ORM (pseudo-code)
	// const results = await db.select().from(contactMessages);
}

// Example API route usage
// src/app/api/example/route.ts
/*
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "~/db/client";
import { contactMessages } from "~/db/schema";

export async function GET(request: NextRequest) {
  // Get D1 database from Cloudflare Workers binding
  const env = request.cloudflare?.env || {};
  const db = getDb(env.DB);

  // Query database with Drizzle ORM
  const messages = await db.select().from(contactMessages).limit(10);

  return NextResponse.json({
    success: true,
    data: messages
  });
}
*/

// Example server component usage
// src/app/page.tsx
/*
import { env } from "~/env";

export default async function HomePage() {
  // Only accessible on server-side
  const isProduction = env.NODE_ENV === "production";

  return (
    <div>
      <h1>Environment: {isProduction ? "Production" : "Development"}</h1>
    </div>
  );
}
*/
