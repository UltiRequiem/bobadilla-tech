/* eslint-disable @typescript-eslint/no-explicit-any */
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "libsql-stateless-easy";
import { env } from "~/env";
import * as schema from "./schema";

/**
 * Turso/libSQL client configuration for Cloudflare Workers
 * Uses libsql-stateless-easy - a drop-in replacement designed for edge/serverless environments
 * This package works perfectly with OpenNext.js Cloudflare bundler
 *
 * @see https://www.npmjs.com/package/libsql-stateless-easy
 * @see https://github.com/tursodatabase/libsql-client-ts/issues/303
 */
const client: any = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

/**
 * Drizzle ORM instance with Turso client
 * Type-safe database access with full schema support
 */
export const db = drizzle(client, { schema });
