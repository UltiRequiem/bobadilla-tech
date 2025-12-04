# Environment Variables Setup

This project uses [T3 Env](https://env.t3.gg/) for type-safe environment
variables with validation.

## Quick Start

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **For development (default):** The `.env` file is already configured to use a
   local SQLite database:
   ```env
   NODE_ENV=development
   TURSO_DATABASE_URL=file:local.db
   ```

   No auth token is required for local development.

3. **For production:** The production environment variables are stored in
   `.env.production` (not committed to git):
   ```env
   NODE_ENV=production
   TURSO_DATABASE_URL=libsql://boba-tech-prod-ultirequiem.aws-us-east-1.turso.io
   TURSO_AUTH_TOKEN=your-production-token
   ```

## Environment Variables

### Server-side Variables

#### `NODE_ENV`

- **Type:** `"development" | "production" | "test"`
- **Default:** `"development"`
- **Description:** The environment the application is running in

#### `TURSO_DATABASE_URL`

- **Type:** `string` (URL)
- **Required:** Yes
- **Description:** The Turso database connection URL
- **Development:** Use `file:local.db` for local SQLite
- **Production:** Use
  `libsql://boba-tech-prod-ultirequiem.aws-us-east-1.turso.io`

#### `TURSO_AUTH_TOKEN`

- **Type:** `string`
- **Required:** No (optional in development)
- **Description:** Authentication token for Turso cloud database
- **Development:** Not needed when using local DB
- **Production:** Required for cloud database access

## Usage in Code

Import the validated `env` object from `~/env`:

```typescript
import { env } from "~/env";

// Type-safe access to environment variables
const dbUrl = env.TURSO_DATABASE_URL;
const authToken = env.TURSO_AUTH_TOKEN; // string | undefined

// Use in your database client
const client = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});
```

## Validation

Environment variables are validated at build time using Zod schemas defined in
`src/env.ts`. This ensures:

- ✅ All required variables are present
- ✅ Variables have the correct format (URLs, strings, etc.)
- ✅ Type-safety throughout your application
- ✅ Clear error messages when validation fails

## Adding New Variables

To add new environment variables:

1. **Update the schema in `src/env.ts`:**

   ```typescript
   export const env = createEnv({
     server: {
       // Add new server variable
       MY_NEW_VAR: z.string().min(1),
     },
     client: {
       // Add new client variable (must start with NEXT_PUBLIC_)
       NEXT_PUBLIC_API_URL: z.string().url(),
     },
     experimental__runtimeEnv: {
       // Only list client variables here
       NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
     },
   });
   ```

2. **Add to `.env` and `.env.example`:**
   ```env
   MY_NEW_VAR=value
   NEXT_PUBLIC_API_URL=https://api.example.com
   ```

3. **Restart the dev server** to pick up the changes

## Cloudflare Pages Configuration

For Cloudflare Pages deployment, add these environment variables in the
Cloudflare dashboard:

1. Go to your Cloudflare Pages project
2. Settings → Environment Variables
3. Add production variables:
   - `NODE_ENV` = `production`
   - `TURSO_DATABASE_URL` =
     `libsql://boba-tech-prod-ultirequiem.aws-us-east-1.turso.io`
   - `TURSO_AUTH_TOKEN` = `your-production-token`

## Security Notes

- ✅ `.env` and `.env.production` are in `.gitignore`
- ✅ `.env.example` is committed (no secrets)
- ✅ Server variables are never exposed to the client
- ✅ Only `NEXT_PUBLIC_*` variables are available in the browser
- ⚠️ Never commit `.env.production` to version control
- ⚠️ Rotate tokens immediately if accidentally exposed

## Troubleshooting

### Build fails with "Invalid environment variables"

Check the error message for which variable is invalid or missing. Ensure all
required variables are set in your `.env` file.

### "TURSO_AUTH_TOKEN is required"

If you see this in development, make sure you're using `file:local.db` for
`TURSO_DATABASE_URL`. The auth token is only required for cloud databases.

### Variables not updating

Restart your dev server after changing `.env` files:

```bash
npm run dev
```

## Local Database Setup

For local development, the project uses a local SQLite file:

```bash
# The local.db file will be created automatically
# It's in .gitignore, so it won't be committed
```

To reset your local database:

```bash
rm local.db
# Restart the dev server to recreate
```
