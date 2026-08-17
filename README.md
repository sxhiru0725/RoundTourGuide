# Mirissa Ocean Adventures

A responsive React/Vite tourism website for a Mirissa ocean-adventure operator.

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
```

## Replace before launch

- Update contact, meeting-point and WhatsApp fields in `src/config/business.js`.
- Confirm activities, ages, group sizes, prices, inclusions and policies in `src/data/`.
- Add approved photos to the matching `mirissa-assets/` folders, copy web-ready files into `public/mirissa-assets/`, and update `src/data/media.js`.
- Replace demo testimonials and team profiles with verified content.
- Connect the contact and booking interfaces to an approved email, CRM or booking backend.
- Add final privacy, terms and cancellation policy pages.

No payment processing or live form submission is included.
