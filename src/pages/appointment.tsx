import "../styles/appointment.css";

export default function Appointment() {
  return (
    <div className="appointment-root">
      <div className="appointment-card">
        <div className="appointment-icon">⏳</div>
        <h2>Appointment Service</h2>
        <p className="appointment-tagline">
          We’re crafting a smarter way to book, skip queues, and manage time.
        </p>

        <div className="appointment-divider" />

        <p className="appointment-soon">Coming Soon</p>
      </div>
    </div>
  );
}
