import { Search, MapPin } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import "../styles/home.css";
import cart from "../assets/cart.jpg";
import appointment from "../assets/appointment.jpg";
import DownloadSheet from "../components/DownloadSheet";
import AuthSheet from "../components/AuthSheet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchCityData } from "../services/locationService";

export default function Home() {
  const nav = useNavigate();
  const { user } = useAuth();

  const [downloadOpen, setDownloadOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const [campuses, setCampuses] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [loopText, setLoopText] = useState("Location");

  const [showSearch, setShowSearch] = useState(false);
  const [showCampuses, setShowCampuses] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSearch(false);
        setShowCampuses(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const loadLocation = async () => {
    navigator.geolocation.getCurrentPosition(async () => {
      const city = "bhubaneswar";

      const data = await fetchCityData(city);
      if (!data) return;

      setCampuses(data.campuses || []);
      setServices(data.services || []);
      setShowCampuses(true);
    });
  };

  useEffect(() => {
    if (!campuses.length) return;
    let i = 0;

    const loop = setInterval(() => {
      setLoopText(campuses[i]);
      i = (i + 1) % campuses.length;
    }, 3000);

    return () => clearInterval(loop);
  }, [campuses]);

  return (
    <div className="home-root">

      <div className="home-header">
        <div className="youque-logo">
          <div className="logo-circle">Q</div>
          <span className="logo-text">YouQue</span>
        </div>

        <div className="home-actions">
          {!user && (
            <button className="btn-download" onClick={() => setDownloadOpen(true)}>
              Download
            </button>
          )}

          {user ? (
            <div className="user-circle-only" onClick={() => nav("/user")}>U</div>
          ) : (
            <button className="btn-signin" onClick={() => setAuthOpen(true)}>
              Sign In
            </button>
          )}
        </div>
      </div>

      <h2 className="home-title">
        Book appointment or discover services. Skip the queue with YouQue!
      </h2>

      <div className="home-main-btns">
        <button className="icon-btn" onClick={() => setShowSearch(!showSearch)}>
          <Search size={18}/> Search
        </button>

        <button className="icon-btn" onClick={loadLocation}>
          <MapPin size={18} /> {loopText}
        </button>
      </div>

      {showSearch && (
        <div ref={dropdownRef} className="glass-dropdown">
          {services.map(s => (
            <p key={s} onClick={() => setShowSearch(false)}>{s}</p>
          ))}
        </div>
      )}

      {showCampuses && (
        <div ref={dropdownRef} className="glass-dropdown">
          {campuses.map(c => (
            <p key={c} onClick={() => setShowCampuses(false)}>{c}</p>
          ))}
        </div>
      )}

      <div className="service-column">
        <div className="service-card" onClick={() => nav("/cart")}>
          <div className="image-box"><img src={cart}/></div>
          <p>Cart Service</p>
        </div>

        <div className="service-card">
          <div className="image-box"><img src={appointment}/></div>
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
