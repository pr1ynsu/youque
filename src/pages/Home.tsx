import { useState } from "react";
import "../styles/home.css";
import cart from "../assets/cart.jpg";
import appointment from "../assets/appointment.jpg";
import DownloadSheet from "../components/DownloadSheet";
import AuthSheet from "../components/AuthSheet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const nav = useNavigate();
  const { user, role } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  // 🔥 ROLE LOGIC
  const avatarLetter =
    role === "driver" ? "D" :
    role === "student" ? "S" :
    role === "staff" ? "A" :
    "U";

  const roleLabel =
    role === "driver" ? "Driver" :
    role === "student" ? "Student" :
    role === "staff" ? "Staff" :
    "User";

  const heroText =
    role === "driver"
      ? "Manage rides. Earn smarter."
      : role === "student"
      ? "Skip queues. Move faster."
      : role === "staff"
      ? "Access campus services easily."
      : "Smart campus mobility starts here.";

  return (
    <div className="home-root">

      {/* HEADER */}
      <div className="home-header">
        <div className="youque-logo">
          <div className="logo-circle">Q</div>
          <span className="logo-text">YouQue</span>
        </div>

        <div className="home-actions">
          {!user && (
            <button
              className="btn-download"
              onClick={() => setDownloadOpen(true)}
            >
              Download
            </button>
          )}

          {user ? (
            <div
              className="user-circle-only"
              onClick={() => nav("/user")}
            >
              {avatarLetter}
            </div>
          ) : (
            <button
              className="btn-signin"
              onClick={() => setAuthOpen(true)}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* HERO */}
      <div className="home-hero">
        <h1>{heroText}</h1>
        <p className="home-sub">
          Built for {roleLabel.toLowerCase()}s at KIIT
        </p>
      </div>

      {/* SERVICES */}
      <div className="service-column">

        <div className="service-card" onClick={() => {
  if (role === "driver") nav("/driver");
  else if (role === "admin") nav("/admin");
  else nav("/cart");
}}>
          <div className="image-box">
            <img src={cart} />
          </div>
          <p>
            {role === "driver"
              ? "View Ride Requests"
              : "Book a Cart"}
          </p>
        </div>

        <div className="service-card" onClick={() => nav("/appointment")}>
          <div className="image-box">
            <img src={appointment} />
          </div>
          <p>
            {role === "driver"
              ? "Manage Schedule"
              : "Book Appointment"}
          </p>
        </div>

      </div>

      {/* INFO SECTION */}
      <div className="home-info">
        <h4>Why YouQue?</h4>

        <div className="info-grid">
          <div className="info-box">Save Time</div>
          <div className="info-box">Real-time Access</div>
          <div className="info-box">Smart Routing</div>
        </div>
      </div>

      {/* SHEETS */}
      <DownloadSheet
        open={downloadOpen}
        onClose={() => setDownloadOpen(false)}
      />

      <AuthSheet
        open={authOpen}
        mode={mode}
        onClose={() => setAuthOpen(false)}
        onSwitch={() =>
          setMode(m => (m === "signin" ? "signup" : "signin"))
        }
      />

    </div>
  );
}