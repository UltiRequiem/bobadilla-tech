import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/web";
import { env } from "~/env";
import * as schema from "./schema";

/**
 * Turso/libSQL client configuration for Cloudflare Workers
 * Uses @libsql/client/web for edge compatibility
 */
const client = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

/**
 * Drizzle ORM instance with Turso client
 * Type-safe database access with full schema support
 */
export const db = drizzle({ client, schema });
