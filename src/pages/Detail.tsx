import "../styles/detail.css";
import { useState } from "react";

export default function Detail() {
  const [open, setOpen] = useState(false);

  const routine = [
    { time: "02:00", label: "Break" },
    { time: "03:00", label: "Campus 06" },
    { time: "05:00", label: "Campus 03" },
    { time: "07:00", label: "End" },
  ];

  return (
    <div className="detail-root">
      <div className="detail-title">Routine</div>

      <div className="detail-timeline">
        <div className="detail-line" />

        {routine.map((r, i) => (
          <div className="detail-row" key={i}>
            <div className="detail-time">{r.time}</div>
            <div className="detail-point" />
            <div className="detail-label">{r.label}</div>
          </div>
        ))}
      </div>

      <button className="report-btn" onClick={() => setOpen(true)}>
        Report a Problem
      </button>
    </div>
  );
}
