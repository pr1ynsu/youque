import { Search, MapPin } from "lucide-react";
import { useState, useRef } from "react";
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

  /* NEW SHEETS */
  const [serviceSheet, setServiceSheet] = useState(false);
  const [locationSheet, setLocationSheet] = useState(false);

  const [location, setLocation] = useState("Location");
  const [query, setQuery] = useState("");

  const services = [
    { label: "Cart Service", path: "/cart" },
    { label: "Appointment", path: "/appointment" },
  ];

  const campuses = [
    "Campus 03",
    "Campus 06",
    "Campus 15",
    "Campus 17",
  ];

  /* role avatar letter */
  const avatarLetter =
    role === "driver" ? "D" :
    role === "student" ? "S" :
    "U";

  return (
    <div className="home-root">

      {/* ---------------- HEADER ---------------- */}
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

      {/* ---------------- TITLE ---------------- */}
      <h2 className="home-title">
        Skip the queue.  
        Book faster.  
        Move smarter.
      </h2>

      {/* ---------------- MAIN BUTTONS ---------------- */}
      <div className="home-main-btns">

        <button
          className="icon-btn"
          onClick={() => setServiceSheet(true)}
        >
          <Search size={18}/> Services
        </button>

        <button
          className="icon-btn"
          onClick={() => setLocationSheet(true)}
        >
          <MapPin size={18}/> {location}
        </button>

      </div>

      {/* ---------------- CARDS ---------------- */}
      <div className="service-column">
        <div className="service-card" onClick={() => nav("/cart")}>
          <div className="image-box"><img src={cart}/></div>
          <p>Cart Service</p>
        </div>

        <div className="service-card" onClick={() => nav("/appointment")}>
          <div className="image-box"><img src={appointment}/></div>
          <p>Appointment</p>
        </div>
      </div>


      {/* ================================================= */}
      {/* SERVICE SHEET (bottom popup like rapido) */}
      {/* ================================================= */}
      {serviceSheet && (
        <div className="sheet-backdrop" onClick={() => setServiceSheet(false)}>
          <div className="sheet" onClick={e => e.stopPropagation()}>
            <h4>Select Service</h4>

            {services.map(s => (
              <div
                key={s.label}
                className="sheet-option"
                onClick={() => nav(s.path)}
              >
                {s.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* LOCATION SHEET */}
      {/* ================================================= */}
      {locationSheet && (
        <div className="sheet-backdrop" onClick={() => setLocationSheet(false)}>
          <div className="sheet" onClick={e => e.stopPropagation()}>
            <h4>Choose Location</h4>

            <input
              className="sheet-input"
              placeholder="Search campus..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />

            {campuses
              .filter(c =>
                c.toLowerCase().includes(query.toLowerCase())
              )
              .map(c => (
                <div
                  key={c}
                  className="sheet-option"
                  onClick={() => {
                    setLocation(c);
                    setLocationSheet(false);
                  }}
                >
                  {c}
                </div>
              ))}
          </div>
        </div>
      )}

      <DownloadSheet open={downloadOpen} onClose={() => setDownloadOpen(false)} />
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
