import "../styles/company.css";

export default function Company() {
  return (
    <div className="company-root">

      <section className="company-hero">
        <div className="company-logo">Q</div>
        <h1>YouQue</h1>
        <p>Skip the queue. Reclaim your time.</p>
      </section>

      <section className="company-card">
        <h2>The Problem</h2>
        <p>
          Students waste hours waiting for services — carts, offices, 
          help desks — without knowing availability or queue length.
          Time disappears silently.
        </p>
      </section>

      <section className="company-card">
        <h2>Our Solution</h2>
        <p>
          YouQue converts uncertainty into clarity. 
          Live service discovery, instant bookings, 
          campus mobility tracking — no guessing, no chaos.
        </p>
      </section>

      <section className="company-card">
        <h2>About Us</h2>
        <p>
          Born in campus frustration, built with empathy.
          We design tools that respect human time.
        </p>
      </section>

      <section className="company-card">
        <h2>Careers</h2>
        <p>
          We don’t hire resumes. We hire rebels who believe queues
          are a design flaw in civilization.
        </p>
      </section>

      <section className="company-card">
        <h2>Team YouQue</h2>
        <p>
          Engineers, designers, skaters, problem-solvers.
          All united by impatience for broken systems.
        </p>
      </section>

      <div className="company-footer-space"/>
    </div>
  );
}
