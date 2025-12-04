/**
 * Example: Database client setup using T3 Env
 *
 * This is an example file showing how to use the validated environment variables
 * to set up a Turso database client.
 */

import { env } from "~/env";

// Example using @libsql/client (you would need to install this)
// import { createClient } from "@libsql/client";

export function createDatabaseClient() {
  // Access validated environment variables
  const dbUrl = env.TURSO_DATABASE_URL;
  const authToken = env.TURSO_AUTH_TOKEN;

  console.log("Database Configuration:");
  console.log("- URL:", dbUrl);
  console.log("- Auth Token:", authToken ? "✓ Provided" : "✗ Not provided (local mode)");
  console.log("- Environment:", env.NODE_ENV);

  // Example client creation (pseudo-code)
  // const client = createClient({
  //   url: dbUrl,
  //   authToken: authToken,
  // });

  // return client;
}

// Example API route usage
// src/app/api/example/route.ts
/*
import { env } from "~/env";
import { NextResponse } from "next/server";

export async function GET() {
  // Type-safe access to environment variables
  const dbUrl = env.TURSO_DATABASE_URL;

  // Use in your database queries
  // const result = await db.query(...);

  return NextResponse.json({
    message: "Connected to database",
    environment: env.NODE_ENV
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
