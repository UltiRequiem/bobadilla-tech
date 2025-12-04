# Using Drizzle ORM with Cloudflare D1

## ✅ You're Still Using Drizzle!

Good news: **You're still using Drizzle ORM for all your database queries**. Nothing changed in your application code. The `schema.sql` file was only used for the initial database setup.

## 🎯 How It Works

### Your Application Code (Uses Drizzle)

```typescript
// src/app/api/contact/route.ts
const db = getDb(env.DB);

// This is Drizzle ORM! Not raw SQL
const insertedMessage = await insertContactMessage(db, validatedData);
```

```typescript
// src/app/api/contact/db.ts
// This is Drizzle ORM's type-safe query builder
export async function insertContactMessage(db: DbInstance, data: ContactMessageData) {
  const [insertedMessage] = await db
    .insert(contactMessages)
    .values({ ... })
    .returning();

  return insertedMessage;
}
```

### Schema Definition (Drizzle)

```typescript
// src/db/schema.ts
export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql\`(unixepoch())\`),
});
```

## 🔄 Drizzle Migrations for D1

### Setup

1. **Drizzle Config** - Already created: [drizzle.config.ts](drizzle.config.ts)
```typescript
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  driver: "d1-http",
});
```

2. **Generate Migrations**
```bash
npx drizzle-kit generate
```

This creates migration files in `drizzle/migrations/` based on your [src/db/schema.ts](src/db/schema.ts).

### Migration Workflow

#### 1. Modify Your Schema
Edit `src/db/schema.ts` with Drizzle schema syntax:

```typescript
// Example: Add a new field
export const contactMessages = sqliteTable("contact_messages", {
  // ... existing fields
  phone: text("phone"), // New field
});
```

#### 2. Generate Migration
```bash
npx drizzle-kit generate
```

This creates a new migration file in `drizzle/migrations/`.

#### 3. Apply to Local D1
```bash
npx wrangler d1 execute bobadilla-work --local --file=./drizzle/migrations/0001_your_migration.sql
```

#### 4. Apply to Production D1
```bash
npx wrangler d1 execute bobadilla-work --remote --file=./drizzle/migrations/0001_your_migration.sql
```

## 🖥️ Local Development

### Does it work locally?

**Yes!** D1 has two modes:

#### 1. Local Development Mode
When you run `npm run dev`, Wrangler creates a local SQLite database in `.wrangler/state/v3/d1/`.

```bash
# Your dev server automatically uses local D1
npm run dev

# Access local database directly
npx wrangler d1 execute bobadilla-work --local --command="SELECT * FROM contact_messages"
```

**How it works:**
- OpenNext.js dev server connects to local D1 instance
- Database is a local SQLite file
- Perfect for development and testing
- No network latency

#### 2. Production Mode
When deployed, uses the remote D1 database in Cloudflare's edge network.

### Local Dev Setup

**Current status:** ✅ Already working!

Your local dev server (`npm run dev`) is configured to use:
- Local D1 database at `.wrangler/state/v3/d1/`
- Same schema as production
- Full Drizzle ORM support

**Test it:**
```bash
# Start dev server
npm run dev

# In another terminal, add test data
npx wrangler d1 execute bobadilla-work --local --command="
INSERT INTO contact_messages (name, email, company, message)
VALUES ('Local Test', 'local@test.com', 'Test Co', 'Testing local D1')
"

# Query from app or CLI
npx wrangler d1 execute bobadilla-work --local --command="SELECT * FROM contact_messages"
```

## 📊 Drizzle Studio (Visual Database Browser)

Drizzle Kit includes a web UI for browsing your database!

### Launch Drizzle Studio

**For local database:**
```bash
npx drizzle-kit studio
```

This opens a web interface at `https://local.drizzle.studio` where you can:
- Browse tables visually
- Run queries with autocomplete
- View relationships
- Edit data directly

**For remote D1:**
```bash
# First, create a local proxy to remote D1
npx wrangler d1 execute bobadilla-work --remote --command="SELECT * FROM contact_messages" > /tmp/d1-data.json

# Or use Cloudflare Dashboard for remote access
```

## 🔧 Common Drizzle Operations

### Query Examples (Your Current Code)

```typescript
import { getDb } from "~/db/client";
import { contactMessages } from "~/db/schema";
import { eq, desc } from "drizzle-orm";

// Get database instance
const db = getDb(env.DB);

// Insert (what you're already doing)
const [newMessage] = await db
  .insert(contactMessages)
  .values({ name, email, company, message })
  .returning();

// Select all
const allMessages = await db
  .select()
  .from(contactMessages)
  .orderBy(desc(contactMessages.createdAt));

// Select with filter
const userMessages = await db
  .select()
  .from(contactMessages)
  .where(eq(contactMessages.email, 'user@example.com'));

// Update
await db
  .update(contactMessages)
  .set({ company: 'New Company' })
  .where(eq(contactMessages.id, 123));

// Delete
await db
  .delete(contactMessages)
  .where(eq(contactMessages.id, 123));
```

### No Raw SQL Needed!

You can do everything with Drizzle's type-safe API. Raw SQL is only needed for:
1. Initial database setup (already done)
2. Complex migrations (Drizzle generates these)
3. Database administration (rare)

## 🚀 Deployment

### Build & Deploy
```bash
# Build your app
npm run build

# Deploy to Cloudflare
npx wrangler deploy
```

The D1 database binding is automatically available in production!

## 📝 Schema Changes Workflow

### Example: Adding a Phone Field

#### 1. Update Drizzle Schema
```typescript
// src/db/schema.ts
export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  phone: text("phone"), // New field!
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql\`(unixepoch())\`),
});
```

#### 2. Generate Migration
```bash
npx drizzle-kit generate
```

Output:
```
[✓] Your SQL migration file ➜ drizzle/migrations/0001_add_phone_field.sql 🚀
```

#### 3. Review Generated SQL
```sql
-- drizzle/migrations/0001_add_phone_field.sql
ALTER TABLE contact_messages ADD COLUMN phone TEXT;
```

#### 4. Apply Migration

**Local:**
```bash
npx wrangler d1 execute bobadilla-work --local --file=./drizzle/migrations/0001_add_phone_field.sql
```

**Production:**
```bash
npx wrangler d1 execute bobadilla-work --remote --file=./drizzle/migrations/0001_add_phone_field.sql
```

#### 5. Update TypeScript Types
```typescript
// src/app/api/contact/validation.ts
export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  phone: z.string().optional(), // Add phone validation
  message: z.string().min(10).max(2000),
});
```

#### 6. Use in Code
```typescript
// Drizzle automatically knows about the new field!
const insertedMessage = await db
  .insert(contactMessages)
  .values({
    name: data.name,
    email: data.email,
    company: data.company,
    phone: data.phone, // TypeScript knows this exists!
    message: data.message,
  })
  .returning();
```

## 🎯 Key Takeaways

### What You're Using

✅ **Drizzle ORM** - All your queries
- Type-safe query builder
- Full TypeScript support
- Zero SQL strings in your code
- Automatic type inference

❌ **Not using raw SQL** - Only for:
- Initial setup (one-time)
- Migrations (auto-generated by Drizzle)

### Local Development

✅ **Works perfectly locally**
- Local D1 instance at `.wrangler/state/v3/d1/`
- No internet required
- Fast development cycle
- Same API as production

### Migrations

✅ **Drizzle Kit handles everything**
- Generate from schema changes
- Apply with Wrangler
- Version controlled
- Safe and reversible

## 📚 Resources

- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [Drizzle with D1](https://orm.drizzle.team/docs/get-started-sqlite#cloudflare-d1)
- [Drizzle Kit (Migrations)](https://orm.drizzle.team/kit-docs/overview)
- [D1 Documentation](https://developers.cloudflare.com/d1/)

## 🔍 Verify Your Setup

### Check Drizzle is Working

```bash
# Start dev server
npm run dev

# Test contact form at http://localhost:3001/contact
# Submit a form
# Check database

npx wrangler d1 execute bobadilla-work --local --command="SELECT * FROM contact_messages"
```

You should see your submission stored via Drizzle ORM!

---

**Summary:** You're using Drizzle ORM for everything. The schema.sql file was just for initial setup. All your queries are type-safe Drizzle queries. Local development works perfectly with D1!
