# Bobadilla.work

A professional portfolio and business website built with Next.js 15 and deployed
on Cloudflare Workers.

## 🚀 Tech Stack

- **Framework:** Next.js 15.5.7 (App Router)
- **Deployment:** Cloudflare Workers via OpenNext.js
- **Database:** Cloudflare D1 (SQLite)
- **ORM:** Drizzle ORM
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Validation:** Zod
- **Email:** External Cloudflare Worker

## 📋 Features

- **Contact Form** - Database-backed with email notifications
- **Tools Section** - Utility tools (e.g., Reddit Post Date Extractor)
- **Modular API Architecture** - Clean, maintainable endpoint structure
- **Type-Safe** - Full TypeScript + Zod validation
- **Edge-Optimized** - Deployed on Cloudflare's global network

## 🏗️ Architecture

This project follows a clean, modular architecture pattern:

```
src/
├── app/
│   ├── api/                    # API endpoints
│   │   ├── contact/            # Contact form API
│   │   │   ├── route.ts        # Request handler
│   │   │   ├── validation.ts   # Zod schemas
│   │   │   ├── db.ts           # Database operations
│   │   │   ├── email-notification.ts
│   │   │   └── logger.ts
│   │   └── reddit-post-date/   # Reddit tool API
│   │       ├── route.ts
│   │       ├── validation.ts
│   │       └── reddit-client.ts
│   └── tools/                  # Tool pages
│
├── db/
│   ├── client.ts               # D1 database client
│   └── schema.ts               # Drizzle schema
│
└── lib/
    └── server/
        └── api-response.ts     # Standardized responses
```

See [claude.md](claude.md) for complete architecture documentation.

## 🛠️ Development

### Prerequisites

- Node.js 18+ (use [Volta](https://volta.sh/) or
  [nvm](https://github.com/nvm-sh/nvm))
- npm/yarn/pnpm

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bobadilla-work
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Initialize local D1 database**

   ```bash
   npx wrangler d1 execute bobadilla-work --local --file=./drizzle/migrations/0000_*.sql
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3001](http://localhost:3001) in your browser.

### Development Commands

```bash
# Run Next.js dev server (with local D1)
npm run dev

# Preview on Cloudflare runtime
npm run preview

# Build for production
npm run build

# Deploy to Cloudflare
npm run deploy

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🗄️ Database

### Cloudflare D1 + Drizzle ORM

This project uses Cloudflare D1 (serverless SQLite) with Drizzle ORM for
type-safe database operations.

**Database:** `bobadilla-work` **Binding:** `DB`

### Schema Management

**Generate migration:**

```bash
# 1. Edit src/db/schema.ts
# 2. Generate migration
npx drizzle-kit generate
```

**Apply migration:**

```bash
# Local
npx wrangler d1 execute bobadilla-work --local --file=./drizzle/migrations/XXXX.sql

# Production
npx wrangler d1 execute bobadilla-work --remote --file=./drizzle/migrations/XXXX.sql
```

**Query database:**

```bash
# Local
npx wrangler d1 execute bobadilla-work --local --command="SELECT * FROM contact_messages"

# Production
npx wrangler d1 execute bobadilla-work --remote --command="SELECT * FROM contact_messages"
```

**Visual database browser:**

```bash
npx drizzle-kit studio
```

See [D1_DRIZZLE_GUIDE.md](D1_DRIZZLE_GUIDE.md) for complete database
documentation.

## 📦 Project Structure

```
bobadilla-work/
├── src/
│   ├── app/              # Next.js app directory
│   ├── db/               # Database schema & client
│   ├── lib/              # Shared utilities
│   └── env.ts            # Environment configuration
├── drizzle/
│   └── migrations/       # Database migrations
├── public/               # Static assets
├── wrangler.jsonc        # Cloudflare configuration
├── drizzle.config.ts     # Drizzle ORM configuration
└── claude.md             # Architecture guide

Documentation:
├── README.md                    # This file
├── claude.md                    # Architecture patterns
├── ARCHITECTURE_SUMMARY.md      # Architecture refactoring
├── D1_MIGRATION_SUMMARY.md      # D1 migration details
└── D1_DRIZZLE_GUIDE.md          # D1 + Drizzle guide
```

## 🚀 Deployment

### Deploy to Cloudflare

```bash
# Build and deploy
npm run deploy
```

### First-Time Deployment

1. **Apply database schema to production:**

   ```bash
   npx wrangler d1 execute bobadilla-work --remote --file=./drizzle/migrations/0000_*.sql
   ```

2. **Set up secrets (if needed):**

   ```bash
   echo "your-api-key" | npx wrangler secret put EMAIL_WORKER_API_KEY
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### Environment Variables

Configure in Cloudflare Dashboard or via wrangler:

- `EMAIL_WORKER_URL` - External email worker endpoint
- `EMAIL_WORKER_API_KEY` - Email worker authentication

D1 database binding is configured in `wrangler.jsonc` (no secrets needed).

## 📝 API Endpoints

### Contact Form

- **POST** `/api/contact`
- Validates and stores contact submissions
- Sends email notifications via external worker
- Returns: `{ success: true, data: { id: number }, message: string }`

### Reddit Post Date

- **GET** `/api/reddit-post-date?url=<reddit-url>`
- Extracts post creation date from Reddit URLs
- Returns: `{ success: true, data: { timestamp: number, postId: string } }`

All endpoints follow standardized response format. See [claude.md](claude.md)
for API patterns.

## 🏛️ Architecture Patterns

This project follows specific architectural patterns for maintainability:

- **Modular API Endpoints** - Self-contained with separated concerns
- **Standardized Responses** - Consistent JSON format across all APIs
- **Type Safety** - Full TypeScript + Zod validation
- **Clean Separation** - Validation, business logic, and data access are
  separate

See [claude.md](claude.md) for:

- API endpoint structure guidelines
- Coding conventions
- Creating new endpoints
- Best practices

## 🧪 Testing

### Local Testing

```bash
# Test contact form locally
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'

# Test Reddit tool
curl "http://localhost:3001/api/reddit-post-date?url=https://www.reddit.com/r/programming/comments/abc123/post-title/"
```

### Database Testing

```bash
# Add test data
npx wrangler d1 execute bobadilla-work --local --command="
INSERT INTO contact_messages (name, email, company, message)
VALUES ('Test', 'test@test.com', 'Test Co', 'Test message')
"

# Query test data
npx wrangler d1 execute bobadilla-work --local --command="
SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5
"
```

## 📚 Documentation

- **[claude.md](claude.md)** - Complete architecture guide
- **[ARCHITECTURE_SUMMARY.md](ARCHITECTURE_SUMMARY.md)** - Architecture
  refactoring summary
- **[D1_MIGRATION_SUMMARY.md](D1_MIGRATION_SUMMARY.md)** - Turso → D1 migration
  details
- **[D1_DRIZZLE_GUIDE.md](D1_DRIZZLE_GUIDE.md)** - Working with D1 + Drizzle ORM

## 🤝 Contributing

When adding new features:

1. Follow the architecture patterns in [claude.md](claude.md)
2. Use modular API endpoint structure
3. Add Drizzle schema changes via migrations
4. Use standardized API responses
5. Maintain type safety with TypeScript + Zod

## 📄 License

[Your License]

## 🔗 Links

- **Website:** [bobadilla.work](https://bobadilla.work)
- **Cloudflare Dashboard:** [Workers & Pages](https://dash.cloudflare.com)
- **D1 Database:** [D1 Console](https://dash.cloudflare.com)

---

Built with ❤️ using Next.js and Cloudflare Workers
