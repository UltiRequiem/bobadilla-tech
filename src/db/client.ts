import { drizzle } from "drizzle-orm/d1";
import type { D1Database } from "@cloudflare/workers-types";
import * as schema from "./schema";

/**
 * Cloudflare D1 database client configuration
 * D1 is Cloudflare's native serverless SQL database built on SQLite
 *
 * Note: D1 binding is provided by the Cloudflare Workers runtime
 * The database connection is established automatically via the binding in wrangler.jsonc
 *
 * @see https://developers.cloudflare.com/d1/
 * @see https://orm.drizzle.team/docs/get-started-sqlite#cloudflare-d1
 */

/**
 * Get Drizzle ORM instance with D1 database
 * @param d1Database D1Database instance from Cloudflare Workers binding
 * @returns Drizzle ORM instance with full schema support
 */
export function getDb(d1Database: D1Database) {
	return drizzle(d1Database, { schema });
}

// For backward compatibility and easier usage in API routes
// This will be initialized per-request with the D1 binding
export type DbInstance = ReturnType<typeof getDb>;
