import "../styles/customer.css";

export default function Customer() {
  return (
    <div className="customer-root">
      <h2>Your Services</h2>

      <div className="customer-card">
        <h4>Cart Service</h4>
        <p>Track nearby carts instantly.</p>
      </div>

      <div className="customer-card">
        <h4>Appointment Service</h4>
        <p>Book queues without standing.</p>
      </div>
    </div>
  );
}
