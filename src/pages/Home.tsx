import { Search, MapPin } from "lucide-react";
import { useState } from "react";
import "../styles/home.css";
import cart from "../assets/cart.jpg";
import appointment from "../assets/appointment.jpg";
import DownloadSheet from "../components/DownloadSheet";
import AuthSheet from "../components/AuthSheet";

export default function Home() {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [location, setLocation] = useState<string | null>(null);
  const [campuses, setCampuses] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  const campusDB: any = {
    Bhubaneswar: ["KIIT", "XIM", "SOA"],
    Delhi: ["IIT Delhi", "DU"],
  };

  const services = ["Cart Service", "Appointment Service"];

  return (
    <div className="home-root">

      <div className="home-header">
        <div className="youque-logo">
          <div className="logo-circle">Q</div>
          <span className="logo-text">YouQue</span>
        </div>

        <div className="home-actions">
          <button className="btn-download" onClick={() => setDownloadOpen(true)}>
            Download
          </button>
          <button
            className="btn-signin"
            onClick={() => {
              setMode("signin");
              setAuthOpen(true);
            }}
          >
            Sign In
          </button>
        </div>
      </div>

      <h2 className="home-title">
        Book appointment or discover services. Skip the queue with YouQue!
      </h2>

      <div className="home-main-btns">
        <button className="icon-btn" onClick={() => setShowSearch(!showSearch)}>
          <Search size={18} /> Search for services
        </button>

        <button
          className="icon-btn"
          onClick={() => {
            navigator.geolocation.getCurrentPosition(() => {
              setLocation("Bhubaneswar");
              setCampuses(campusDB["Bhubaneswar"]);
            });
          }}
        >
          <MapPin size={18} /> {location ?? "Location"}
        </button>
      </div>

      {showSearch && (
        <div className="glass-dropdown">
          {services.map((s) => (
            <p key={s}>{s}</p>
          ))}
        </div>
      )}

      {campuses.length > 0 && (
        <div className="glass-dropdown">
          {campuses.map((c) => (
            <p key={c}>{c}</p>
          ))}
        </div>
      )}

      <div className="service-column">
        <div className="service-card" onClick={() => (window.location.href = "/cart")}>
          <div className="image-box">
            <img src={cart} className="service-img" />
          </div>
          <p>Cart Service</p>
        </div>

        <div className="service-card" onClick={() => (window.location.href = "/appointment")}>
          <div className="image-box">
            <img src={appointment} className="service-img" />
          </div>
          <p>Appointment Service</p>
        </div>

        <div className="service-card coming-soon">
          <div className="coming-box">Coming Soon</div>
          <p>More services coming</p>
        </div>
      </div>

      <DownloadSheet open={downloadOpen} onClose={() => setDownloadOpen(false)} />

      <AuthSheet
        open={authOpen}
        mode={mode}
        onClose={() => setAuthOpen(false)}
        onSwitch={() => setMode(mode === "signin" ? "signup" : "signin")}
      />
    </div>
  );
}
