# SHIVAM MNP BOOKING - SIM Porting & New Jio SIM Booking Website

A modern, fast, mobile-responsive SIM Porting booking website designed for **SHIVAM MNP BOOKING** in Sasaram, Bihar.

## Features
- **Official Brand Design**: Teal Green (`#00A86B`), Dark Blue (`#0B192C`), and White telecom palette.
- **English & Hindi Support**: 1-click bilingual language toggle with natural Hindi translations.
- **5 MNP & SIM Services**:
  1. Airtel to Jio
  2. Vi to Jio
  3. BSNL to Jio
  4. Other Operator to Jio
  5. New Jio SIM Booking
- **Customer Booking Form**: Validates Full Name, Indian 10-digit Mobile Number, Address, PIN Code, Date, and Operator.
- **WhatsApp Click-to-Chat Integration**: Formats and triggers the exact booking template directly to WhatsApp without requiring customer login.
- **Strict Booking Confirmation Flow**: Displays `"Your booking details are ready. Please send the WhatsApp message to confirm your booking."` ensuring customers remember to press Send.
- **Contact & Trust Details**: Verified local details for Owner Shivam Kumar in Sasaram, Bihar.
- **Privacy First**: Zero collection of sensitive Aadhaar photos or OTPs on the website (biometric verification is performed in-person by executive).

---

## How to Set Your Real WhatsApp Number

Open `src/config.ts` and replace the default number with your real WhatsApp number (including country code `91`, without spaces or `+`):

```typescript
export const BUSINESS_CONFIG = {
  businessName: 'SHIVAM MNP BOOKING',
  ownerName: 'SHIVAM KUMAR',
  location: 'Sasaram, Bihar',
  defaultWhatsAppNumber: '919876543210', // <-- Put your 10-digit number here with 91 prefix
  // ...
};
```

You can also test your real number immediately on the live website by clicking **"Admin"** or **"Business Settings"** in the top bar or footer.

---

## Free Hosting on GitHub Pages

1. Push this repository to your GitHub account (e.g. `github.com/shivamkumar/shivam-mnp-booking`).
2. Run build:
   ```bash
   npm run build
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**
   - Under **Build and deployment**, select **GitHub Actions** or deploy from the `dist` folder.
4. Your website will be live 100% free forever at:
   `https://<your-username>.github.io/<repo-name>/`
