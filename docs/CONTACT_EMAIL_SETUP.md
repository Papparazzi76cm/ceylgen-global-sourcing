# Contact form email setup

The website stores each contact request in the Supabase `leads` table and calls the `send-contact-email` Edge Function.

The function sends:

1. A complete notification to `info@ceylgen.com`.
2. An automatic confirmation to the visitor in Spanish, English or French.

## Required Supabase secrets

Create and verify the sending domain in Resend, then add these secrets to the Supabase project:

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxxx
supabase secrets set CONTACT_FROM_EMAIL="CEYLGEN Website <web@ceylgen.com>"
supabase secrets set CONTACT_TO_EMAIL=info@ceylgen.com
```

Never add the Resend API key to `.env`, frontend code or GitHub.

## Deploy the Edge Function

```bash
supabase functions deploy send-contact-email --project-ref lwaopdfzyozdeydvvyms
```

The same values can be added from the Supabase dashboard under **Edge Functions → Secrets**.

## DNS

Resend will provide the SPF and DKIM records that must be added to the DNS zone for `ceylgen.com`. Use a dedicated sender such as `web@ceylgen.com`; replies will still go to `info@ceylgen.com`.

## Test

Submit the website contact form and confirm that:

- A row is created in the `leads` table.
- `info@ceylgen.com` receives the full enquiry.
- The visitor receives the automatic confirmation.
- The Edge Function logs show a `200` response.
