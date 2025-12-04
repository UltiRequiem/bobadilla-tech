# T3 Env Setup - Complete ✅

## What Was Done

### 1. Installed Dependencies
- `@t3-oss/env-nextjs` - Type-safe environment variable validation
- `zod` - Schema validation library
- `jiti` - Import TypeScript files in JavaScript config

### 2. Created Environment Schema
**File:** `src/env.ts`

Configured with:
- ✅ `NODE_ENV` - Environment type (development/production/test)
- ✅ `TURSO_DATABASE_URL` - Database connection URL
- ✅ `TURSO_AUTH_TOKEN` - Optional auth token (for production only)

### 3. Environment Files Created

#### `.env` (Development - Local)
```env
NODE_ENV=development
TURSO_DATABASE_URL=file:local.db
# No auth token needed for local DB
```

#### `.env.production` (Production - Turso Cloud)
```env
NODE_ENV=production
TURSO_DATABASE_URL=libsql://boba-tech-prod-ultirequiem.aws-us-east-1.turso.io
TURSO_AUTH_TOKEN=<production-token>
```

#### `.env.example` (Template for developers)
```env
NODE_ENV=development
TURSO_DATABASE_URL=file:local.db
# Production variables documented but commented out
```

### 4. Configuration Updates

#### `next.config.js` (Migrated from .ts)
- Added jiti import for TypeScript support
- Added env validation at build time
- Maintains Cloudflare OpenNext configuration

#### `package.json`
- Added `"type": "module"` for ES module support

#### `.gitignore`
- Added `.env` files to ignore list (except `.env.example`)
- Added `local.db` and SQLite journal files

### 5. Documentation Created

- **ENV_SETUP.md** - Complete guide for environment variables
- **T3_ENV_SUMMARY.md** - This file, quick reference
- **src/lib/db.example.ts** - Example usage patterns

## How to Use

### Development (Default)
```bash
# 1. Copy example env
cp .env.example .env

# 2. Start dev server (uses local.db automatically)
npm run dev
```

### Production
Environment variables are set in Cloudflare Pages dashboard:
- `NODE_ENV=production`
- `TURSO_DATABASE_URL=libsql://boba-tech-prod-ultirequiem.aws-us-east-1.turso.io`
- `TURSO_AUTH_TOKEN=<your-token>`

### In Your Code
```typescript
import { env } from "~/env";

// Type-safe access with autocomplete
const dbUrl = env.TURSO_DATABASE_URL;
const authToken = env.TURSO_AUTH_TOKEN; // string | undefined
```

## Key Features

✅ **Type-safe** - Full TypeScript support with autocomplete
✅ **Validated** - Zod schemas validate at build time
✅ **Optional token** - TURSO_AUTH_TOKEN not required in development
✅ **Local-first** - Use local SQLite in development by default
✅ **Production-ready** - Seamless Turso cloud integration
✅ **Developer-friendly** - Clear error messages when validation fails
✅ **Secure** - Server variables never exposed to client

## Environment Variable Summary

| Variable | Required | Default | Development | Production |
|----------|----------|---------|-------------|------------|
| `NODE_ENV` | No | `development` | `development` | `production` |
| `TURSO_DATABASE_URL` | Yes | - | `file:local.db` | `libsql://...` |
| `TURSO_AUTH_TOKEN` | No | - | Not needed | Required |

## Important Notes

⚠️ **Never commit** `.env` or `.env.production` to git
⚠️ **Always commit** `.env.example` as a template
⚠️ **Auth token** is optional - only needed for Turso cloud
⚠️ **Local database** (local.db) is auto-created and gitignored

## Validation

Environment variables are validated:
- ✅ At build time (via next.config.js)
- ✅ At runtime (via src/env.ts)
- ✅ Before any code runs

## Troubleshooting

### "TURSO_AUTH_TOKEN is required"
- Check you're using `file:local.db` for local development
- In production, ensure the token is set in Cloudflare dashboard

### Build fails with validation error
- Check all required variables are in your `.env` file
- Ensure URLs are valid (start with `file:` or `libsql://`)

### Variables not updating
- Restart dev server after changing `.env`
- Clear `.next` folder: `rm -rf .next`

## Next Steps

1. **Install database client** (if needed):
   ```bash
   npm install @libsql/client
   ```

2. **Create database utility** in `src/lib/db.ts`:
   ```typescript
   import { createClient } from "@libsql/client";
   import { env } from "~/env";

   export const db = createClient({
     url: env.TURSO_DATABASE_URL,
     authToken: env.TURSO_AUTH_TOKEN,
   });
   ```

3. **Use in API routes or server components**:
   ```typescript
   import { db } from "~/lib/db";

   const result = await db.execute("SELECT * FROM users");
   ```

## Resources

- [T3 Env Documentation](https://env.t3.gg/)
- [Turso Documentation](https://docs.turso.tech/)
- [Zod Documentation](https://zod.dev/)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

---

**Setup Date:** December 3, 2025
**Status:** ✅ Complete and tested
