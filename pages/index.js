export default function Home() {
  return (
    <div style={{ padding: '50px', fontFamily: 'Arial' }}>
      <h1>Glamport Stripe Backend</h1>
      <p>API is running ✓</p>
      <p>Endpoints:</p>
      <ul>
        <li>/api/stripe/create-checkout-session</li>
        <li>/api/stripe/create-portal-session</li>
        <li>/api/stripe/webhook</li>
      </ul>
    </div>
  );
}
