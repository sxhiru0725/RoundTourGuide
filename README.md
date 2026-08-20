# Mirissa Ocean Adventures

A responsive React/Vite tourism website with booking-request and general-enquiry forms for a Mirissa ocean-adventure operator. Forms use Formspree; no payment details are collected and every booking requires manual confirmation.

## Run locally

```bash
npm install
copy .env.example .env.local
npm run dev
```

Production checks:

```bash
npm test
npm run lint
npm run build
```

## Formspree setup

The public Formspree form IDs are safe to use in Vite client environment variables. Never add Gmail passwords, SMTP credentials, Formspree account credentials, or private API keys to this repository.

### Booking form

1. Create or sign in to a Formspree account.
2. Create a form named `Four Vista Tours - Bookings`.
3. In Formspree, set its Target Email to `fourvistatours@gmail.com` and complete any email verification Formspree requests.
4. Copy the form ID from Formspree.
5. Add it to `.env.local`:

```env
VITE_FORMSPREE_BOOKING_FORM_ID=YOUR_FORM_ID
```

### Enquiry form

1. Create a second form named `Four Vista Tours - Enquiries`.
2. Set its Target Email to `fourvistatours@gmail.com` and complete any required verification.
3. Copy its form ID and add it to `.env.local`:

```env
VITE_FORMSPREE_ENQUIRY_FORM_ID=YOUR_FORM_ID
```

Setting the public email address in React does **not** configure Formspree delivery. The Target Email must be set separately for both forms in the Formspree dashboard.

The forms include Formspree's `_gotcha` honeypot field. Additional spam controls can be enabled in the Formspree dashboard if needed.

## Vercel deployment

Add both variables under the Vercel project's **Settings > Environment Variables** for each relevant environment, then redeploy:

```text
VITE_FORMSPREE_BOOKING_FORM_ID
VITE_FORMSPREE_ENQUIRY_FORM_ID
```

`vercel.json` rewrites client-side routes to `index.html`, so direct visits to routes such as `/booking` and `/contact` work on Vercel.

## Confirmed activity pricing

- Snorkeling: 1 guest at $35; 2–4 guests at $30 per person.
- Kayaking: 1 guest at $40; 2–4 guests at $30 per person.
- Surf Lesson: 1 guest at $45; 2–4 guests at $35 per person.
- Groups larger than four and all other experiences show a quote/availability request instead of an invented price.

## Business details still needed

- Add the confirmed WhatsApp number, meeting point, support hours, approved business copy, photos and policies where placeholders remain.
- Confirm all activity descriptions, ages, inclusions and operational policies before launch.
- Replace demonstration testimonials and team profiles with verified content.

The public contact email is configured in `src/config/business.js` as `fourvistatours@gmail.com`.
