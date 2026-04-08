import "../styles/company.css";

export default function Company() {
  return (
    <div className="company-root">

      {/* HERO */}
      <section className="hero">
        <div className="logo">Q</div>
        <h1>YouQue</h1>
        <p className="tagline">Designed to eliminate waiting.</p>
      </section>

      {/* PROBLEM */}
      <section className="section">
        <h2>The Problem</h2>
        <p>
          Across large campuses, movement is uncertain. Students depend on
          transport systems without visibility — no clear arrival time,
          no predictable flow.
        </p>
        <p>
          What should be a simple transition between locations becomes
          a daily disruption.
        </p>
      </section>

      {/* CONSEQUENCE */}
      <section className="section subtle">
        <p>
          15–30 minutes lost waiting. Missed classes. Constant guesswork.
          An entire system running without awareness.
        </p>
      </section>

      {/* INSIGHT */}
      <section className="section">
        <h2>The Insight</h2>
        <p>
          The inefficiency is not in transport itself —
          but in the absence of real-time information.
        </p>
        <p>
          When users cannot see the system, they cannot respond to it.
        </p>
      </section>

      {/* SOLUTION */}
      <section className="section emphasis">
        <h2>The Solution</h2>
        <p>
          YouQue introduces real-time visibility and demand coordination.
          It allows users to understand movement as it happens —
          and act accordingly.
        </p>
      </section>

      {/* SYSTEM */}
      <section className="section">
        <h2>The System</h2>
        <p>
          A connected ecosystem where students, drivers, and administrators
          operate within a shared layer of information.
        </p>

        <ul>
          <li>Live vehicle tracking across campus</li>
          <li>Demand signaling at pickup points</li>
          <li>Centralized admin coordination</li>
          <li>Continuous location updates every few seconds</li>
        </ul>
      </section>

      {/* IMPACT */}
      <section className="section">
        <h2>The Impact</h2>
        <p>
          Reduced waiting time. Better allocation of resources.
          A smoother, predictable flow of movement.
        </p>
      </section>

      {/* VISION */}
      <section className="section vision">
        <h2>Vision</h2>
        <p>
          We believe waiting is not inevitable — it is a design flaw.
        </p>
        <p>
          YouQue aims to redefine how movement systems operate,
          extending beyond campuses into cities and everyday infrastructure.
        </p>
      </section>

    </div>
  );
}