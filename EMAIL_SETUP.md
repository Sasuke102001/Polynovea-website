# Contact Form Email Setup

The contact form now submits to a backend API that sends emails using **Gmail SMTP**. This requires your Gmail account and an app password (more secure than your actual password).

## Quick Setup (5 minutes)

### Step 1: Generate Gmail App Password

Gmail requires an "App Password" for third-party apps. This is different from your Gmail password.

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** (left sidebar)
3. Enable **2-Step Verification** if you haven't already
   - Google will prompt you through the process
4. After 2-Step is enabled, scroll down and find **App passwords**
5. Select:
   - **App**: Mail
   - **Device**: Windows Computer (or your device type)
6. Click **Generate**
7. **Copy the 16-character password** that appears
   - It will look like: `abcd efgh ijkl mnop`

### Step 2: Add to Vercel

For **Production** (polynovearecords.in):

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select **polynovea-web** project
3. Go to **Settings** → **Environment Variables**
4. Add two new variables:

   **Variable 1:**
   - **Name**: `GMAIL_EMAIL`
   - **Value**: `subrojitroy101@gmail.com` (your Gmail)
   - **Environments**: Check "Production"

   **Variable 2:**
   - **Name**: `GMAIL_APP_PASSWORD`
   - **Value**: (paste the 16-character app password)
   - **Environments**: Check "Production"

5. Click **Save**
6. Vercel will auto-redeploy

For **Development** (.env.local):

1. Open `.env.local` in your project
2. Uncomment and fill in:
   ```
   GMAIL_EMAIL=subrojitroy101@gmail.com
   GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
   ```
3. Run `npm run dev` to test locally

### Step 3: Test the Form

1. Go to polynovearecords.in/contact (or Vercel URL if domain not live)
2. Fill out and submit the contact form
3. Check your Gmail inbox for the test email
4. Email should be from `subrojitroy101@gmail.com` with reply-to set to the form user's email

## How It Works

- User submits contact form
- Email sent to `subrojitroy@polynovearecords.in` via Gmail SMTP
- Reply-to automatically set to user's email for easy responses
- Email appears as coming from your Gmail account

## Troubleshooting

### "Email service not yet configured"
- GMAIL_EMAIL or GMAIL_APP_PASSWORD not set in Vercel
- Check environment variables
- Redeploy after adding them

### Emails not arriving
- Check Gmail spam folder
- Verify app password is exactly 16 characters (without spaces)
- Check that 2-Step Verification is enabled
- Try resetting app password and regenerating

### "Invalid login" error
- App password was incorrectly copied (missing characters)
- 2-Step Verification is disabled
- Check that it's the 16-char app password, not your Gmail password

### Email sender shows Gmail address
- This is normal with Gmail SMTP
- The form user's email is in "Reply-To" for easy responses

## Limits

**Gmail Free Tier:**
- Up to 500 emails/day (way more than needed)
- No extra sign-ups or costs
- Uses your existing Gmail account

## Future: Custom Sender Domain

Later, if you want to send from `noreply@polynovearecords.in`:
- Use a service like Resend or SendGrid
- Add custom domain verification
- Update the API code to use that service

For now, Gmail SMTP is the simplest solution.
