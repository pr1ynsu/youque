import "../styles/customer.css";

export default function Customer() {
  return (
    <div className="customer-root">

      {/* HERO */}
      <section className="hero">
        <h1>YouQue</h1>
        <p>Everything you need, without the wait.</p>
      </section>

      {/* STATUS */}
      <section className="section">
        <h3>System Status</h3>
        <p>
          All services are currently running smoothly. Transport systems are active,
          and bookings are being processed without delays.
        </p>
        <p className="muted">Average wait time: ~5 minutes</p>
      </section>

      {/* INFORMATION */}
      <section className="section">
        <h3>Your Experience</h3>
        <p>
          YouQue is designed to remove uncertainty from your daily movement.
          Instead of waiting blindly, you stay informed — knowing when services
          are available and how to act accordingly.
        </p>
        <p>
          Whether it’s transport, appointments, or availability,
          everything is structured to reduce wasted time and improve flow.
        </p>
      </section>

      {/* HELP */}
      <section className="section help">
        <h3>Need Assistance</h3>
        <p>
          If something doesn’t work as expected or you need clarification,
          you can reach out directly. We aim to respond quickly and keep
          your experience uninterrupted.
        </p>

        <textarea placeholder="Describe your issue or question..." />
        <button className="primary-btn">Submit Request</button>
      </section>

      {/* CONTACT */}
      <section className="section contact">
        <h3>Contact Admin</h3>
        <p>
          For urgent concerns, you can directly reach the administrator.
        </p>

        <div className="contact-actions">
          <a href="tel:+917070567961" className="contact-btn">
            Call
          </a>

          <a href="mailto:priyanshukr804@gmail.com" className="contact-btn outline">
            Email
          </a>
        </div>
      </section>

    </div>
  );
}