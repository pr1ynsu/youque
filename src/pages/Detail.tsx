import "../styles/detail.css";
import { useState } from "react";

export default function Detail() {
  const [reportOpen, setReportOpen] = useState(false);

  const routine = [
    { time: "02:00", label: "Break" },
    { time: "03:00", label: "Campus 06" },
    { time: "05:00", label: "Campus 03" },
    { time: "07:00", label: "End" },
  ];

  return (
    <div className="detail-root">

      {/* ===== Title ===== */}
      <h2 className="detail-title">Today’s Cart Routine</h2>


      {/* ===== Timeline ===== */}
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


      {/* ===== Button INSIDE FLOW (no overlap bug) ===== */}
      <div className="detail-footer">
        <button
          className="report-btn"
          onClick={() => setReportOpen(true)}
        >
          Report a Problem
        </button>
      </div>


      {/* ===== Bottom Sheet (app style) ===== */}
      {reportOpen && (
        <div
          className="report-backdrop"
          onClick={() => setReportOpen(false)}
        >
          <div
            className="report-sheet"
            onClick={e => e.stopPropagation()}
          >
            <h4>Report Issue</h4>

            <textarea
              placeholder="Describe the problem..."
            />

            <button
              className="report-submit"
              onClick={() => setReportOpen(false)}
            >
              Submit
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
