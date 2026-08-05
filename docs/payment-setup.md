Stripe & payment setup (test-mode)

What I implemented
- Added a client-side Stripe Payment Request Button integration in script.js (test publishable key placeholder).
- Fallback card form and a visible Bank Transfer section for offline payments.
- The website displays the payment note: "Payment methods depend on the service and your country. Please contact us before placing an order." on the contact/checkout area.

How to enable production Google Pay / Card payments
1. Create a Stripe account and enable your business details and payments.
2. Obtain your publishable key (starts with pk_live_...) and replace the placeholder in script.js:
   const stripe = Stripe('pk_test_00000000000000000000000000');
   => replace with your publishable key.
3. Implement a server-side endpoint to create PaymentIntents and securely complete payments. Stripe requires a server to confirm card payments and to handle webhooks.
4. For Google Pay specifically: follow Stripe docs to register your domain for Payments and add the required credentials in your Stripe Dashboard.

Notes & limitations
- This repo is a static GitHub Pages site. For production payments you will need at least one small server-side component (serverless function or simple endpoint) to create PaymentIntents and process webhooks securely.
- The current implementation is demo/test-only and does NOT process real payments.
