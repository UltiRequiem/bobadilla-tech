# Cloudflare Email Workers Setup

## Overview

Your contact form uses **Cloudflare Email Workers** for sending emails. This is
a 100% Cloudflare-native solution that's completely free!

## What's Included

1. **Contact Form** → Saves to Turso database
2. **Email Sending** → Uses Cloudflare Email Workers API
3. **React Email** → Beautiful HTML email templates

## Quick Setup (10 minutes)

### Step 1: Enable Email Routing

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select domain: **bobadilla.work**
3. Navigate to **Email** → **Email Routing**
4. Click **Enable Email Routing**

Cloudflare automatically adds DNS records.

### Step 2: Add Destination Addresses

1. In Email Routing, go to **Destination addresses**
2. Add both addresses:
   - `ale@bobadilla.work` → Forward to Ale's personal email
   - `eliaz@bobadilla.work` → Forward to Eliaz's personal email
3. Verify both emails (check inbox)

### Step 3: Configure Wrangler (Already Done!)

The `wrangler.jsonc` file already includes the email configuration:

```jsonc
"send_email": [
  {
    "name": "SEND_EMAIL",
    "destination_address": "ale@bobadilla.work"
  },
  {
    "name": "SEND_EMAIL",
    "destination_address": "eliaz@bobadilla.work"
  }
]
```

This binding allows your Worker to send emails to these addresses.

### Step 4: Deploy to Cloudflare

```bash
npm run deploy
```

This will deploy your application with email sending capabilities.

### Step 5: Test It!

1. Submit the contact form on your website
2. Check both personal email inboxes
3. You should receive a beautiful HTML email with the form details

**That's it!** Configuration is already done, just enable Email Routing and
deploy!

## How It Works

```
User submits contact form
        ↓
Saved to Turso database
        ↓
API calls sendContactNotification()
        ↓
Cloudflare Email Workers send email
        ↓
Email delivered to ale@bobadilla.work & eliaz@bobadilla.work
```

## Features

✅ **100% Free** - No costs, no API keys ✅ **Cloudflare Native** - Works with
Workers/Pages ✅ **React Email** - Beautiful HTML templates ✅ **Direct
Reply** - Reply-to sender's email ✅ **Dual Recipients** - Both team members
notified ✅ **Database Backup** - All messages saved to Turso

## Email Template

Your emails include:

- Sender information (name, email, company)
- Full message content
- Timestamp
- Reply-to functionality
- Professional design matching your brand

## Configuration

### Current Setup

The contact form is configured in two places:

**1. wrangler.jsonc** - Email sending permissions:

```jsonc
"send_email": [
  {
    "name": "SEND_EMAIL",
    "destination_address": "ale@bobadilla.work"
  },
  {
    "name": "SEND_EMAIL",
    "destination_address": "eliaz@bobadilla.work"
  }
]
```

**2. src/lib/email.ts** - Email recipients:

```typescript
const recipients = ["ale@bobadilla.work", "eliaz@bobadilla.work"];
```

**3. src/app/api/contact/route.ts** - API endpoint that handles form submissions
and sends emails

### Email Details

- **From:** `contact-us@bobadilla.work`
- **To:** `ale@bobadilla.work`, `eliaz@bobadilla.work`
- **Reply-To:** Sender's email address

### Customization

To change recipients:

1. Update `wrangler.jsonc` - Add/remove destination addresses
2. Update `src/lib/email.ts` - Match the recipients array
3. Redeploy: `npm run deploy`

## Monitoring

### Check Email Delivery

**Option 1: Email Logs**

- Cloudflare Dashboard → Email Routing → Logs
- View all sent/received emails

**Option 2: Application Logs**

- Terminal shows: `✓ Email sent to...`
- Or: `✗ Failed to send to...` if error

**Option 3: Database** All submissions saved regardless of email status:

```bash
npm run db:studio
```

## Troubleshooting

### Emails not arriving?

1. **Check spam folder** - First emails may go to spam
2. **Verify addresses** - Must be verified in Cloudflare
3. **Check DNS** - Email Routing DNS records must be active
4. **Check logs** - View Cloudflare Email Routing logs for delivery status

### DNS Issues?

Required DNS records (auto-added by Cloudflare):

- MX record pointing to Cloudflare
- SPF record for email authentication
- DKIM record (optional but recommended)

## Optional: Add DKIM for Better Deliverability

To improve deliverability and avoid spam folder:

1. Go to Cloudflare Dashboard → Email Routing → **Settings**
2. Follow the instructions to add DKIM records
3. Cloudflare will provide the specific TXT records to add to your DNS

This authenticates emails from your domain and significantly improves delivery
rates.

## Production Checklist

- [x] Configure `wrangler.jsonc` with send_email binding
- [x] Set up contact form API endpoint
- [x] Implement email sending with React Email templates
- [x] Update sender address to `contact-us@bobadilla.work`
- [ ] Enable Email Routing in Cloudflare Dashboard
- [ ] Add and verify destination addresses (ale@bobadilla.work,
      eliaz@bobadilla.work)
- [ ] Deploy to Cloudflare: `npm run deploy`
- [ ] Test contact form submission in production
- [ ] Check emails arrive (both recipients)
- [ ] Add DKIM record (optional, for better deliverability)
- [ ] Set up monitoring/alerts

## Cost Breakdown

| Service                  | Cost                |
| ------------------------ | ------------------- |
| Cloudflare Email Routing | Free                |
| Cloudflare Email Workers | Free                |
| Turso Database           | Free (500MB)        |
| Cloudflare Workers/Pages | Free (100k req/day) |
| React Email              | Free (open source)  |
| **Total**                | **$0/month** 🎉     |

## Resources

- [Cloudflare Email Routing Docs](https://developers.cloudflare.com/email-routing/)
- [Email Workers Guide](https://developers.cloudflare.com/email-routing/email-workers/)
- [Send Emails from Workers](https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/)
- [React Email Docs](https://react.email/)

## Support

If emails aren't working:

1. Check Cloudflare Email Routing is enabled
2. Verify destination addresses in Cloudflare
3. Check application logs for errors
4. View database to confirm form submissions are saved

All messages are saved to database first, so you won't lose any submissions even
if email fails!

---

**Setup Date:** December 3, 2025 **Email Sender:** contact-us@bobadilla.work
**Email Recipients:** ale@bobadilla.work, eliaz@bobadilla.work **Status:** Ready
to enable in Cloudflare Dashboard **Configuration:** Complete - just enable
Email Routing and deploy!
