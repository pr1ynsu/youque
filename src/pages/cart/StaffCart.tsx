import { useState } from "react";
import Admin from "../Admin";
import UserCart from "./UserCart";
import Tracking from "./Tracking";
import "../../styles/staff.css";

export default function StaffCart() {
  const [tab, setTab] = useState("control");

  return (
    <div className="staff-root">

      <h2 className="staff-title">Admin Dashboard</h2>

      {/* 🔥 TABS */}
      <div className="staff-tabs">
        <button
          className={tab === "control" ? "active" : ""}
          onClick={() => setTab("control")}
        >
          Control
        </button>

        <button
          className={tab === "monitor" ? "active" : ""}
          onClick={() => setTab("monitor")}
        >
          Monitor
        </button>

        <button
          className={tab === "booking" ? "active" : ""}
          onClick={() => setTab("booking")}
        >
          Booking
        </button>
      </div>

      {/* 🔥 CONTENT */}
      <div className="staff-content">

        {tab === "control" && (
          <div style={{ height: "100%" }}>
            <Admin />
          </div>
        )}

        {tab === "monitor" && (
          <div style={{ height: "100%" }}>
            <Tracking />
          </div>
        )}

        {tab === "booking" && (
          <div style={{ height: "100%" }}>
            <UserCart />
          </div>
        )}

      </div>
    </div>
  );
}