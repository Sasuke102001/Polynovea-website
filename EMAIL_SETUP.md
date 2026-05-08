# Contact Form Email Setup

The contact form now submits to a backend API that sends emails. To enable email notifications, you need to set up Resend.

## Quick Setup (2 minutes)

### 1. Sign Up for Resend

1. Go to [resend.com](https://resend.com)
2. Click "Get Started"
3. Sign up with email (free tier available)
4. Verify your email

### 2. Create API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Copy the API key

### 3. Add to Vercel

For **Production** (polynovearecords.in):

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select **polynovea-web** project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: (paste your API key)
   - **Environments**: Check "Production"
5. Click **Save**
6. Redeploy the project

For **Development** (.env.local):

1. Open `.env.local` in your project
2. Uncomment and update:
   ```
   RESEND_API_KEY=your_api_key_here
   ```
3. Run `npm run dev` to test

### 4. Verify Setup

Test the contact form:
1. Go to polynovearecords.in/contact
2. Fill out and submit the form
3. Check `subrojitroy@polynovearecords.in` for the email

## Email Limits

**Resend Free Tier:**
- Up to 100 emails/day
- Perfect for a new website
- Upgrade later if needed

## Sender Email

The contact form sends from `noreply@polynovearecords.in`.

To customize this:
1. In Resend dashboard, add your custom domain
2. Update `from` field in `/app/api/contact/route.ts`

## Troubleshooting

### "Email service not yet configured"
- RESEND_API_KEY is not set
- Check Vercel environment variables
- Run local build: `npm run build`

### Emails not arriving
- Check spam/promotions folder
- Verify API key is correct
- Check Resend dashboard for failures

### Custom domain setup
- Resend has guides for adding verified senders
- Needed for higher deliverability
- Free tier can use `noreply@polynovearecords.in` temporarily

## Contact Form Behavior

Without RESEND_API_KEY:
- Form submits successfully ✅
- Message is logged to console
- User sees "Submission received" message
- Email NOT sent (requires API key)

With RESEND_API_KEY:
- Form submits successfully ✅
- Email sent to `subrojitroy@polynovearecords.in` ✅
- Reply-to set to user's email ✅
- User sees success message ✅
