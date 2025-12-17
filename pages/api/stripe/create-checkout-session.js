import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, customerEmail, locale, currency, metadata } = req.body;

    console.log('Creating checkout session:', { priceId, customerEmail });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: customerEmail,
      locale: locale || 'auto',
      currency: currency?.toLowerCase() || 'usd',
      metadata: metadata || {},
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/MembershipSuccess?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/Membership?status=cancelled`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    });

    console.log('✅ Checkout session created:', session.id);
    res.status(200).json({ sessionUrl: session.url });
  } catch (error) {
    console.error('❌ Stripe Checkout Error:', error);
    res.status(500).json({ error: error.message });
  }
}