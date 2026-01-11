import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../styles/dashboard.css";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const nav = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const tabs = user
    ? ["home", "company", "customer", "social", "user"]
    : ["home", "company", "customer", "social"];

  const refs = useRef<HTMLSpanElement[]>([]);
  const [style, setStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const current = location.pathname.replace("/", "") || "home";
    const index = tabs.indexOf(current);
    const el = refs.current[index];
    if (el) setStyle({ left: el.offsetLeft - 6, width: el.offsetWidth + 12 });
  }, [location.pathname, tabs]);

  const handleClick = (t: string) => {
    if (t === "user" && !user) {
      nav("/signin");
      return;
    }
    nav(`/${t}`);
  };

  return (
    <div className="dash-root">
      <Outlet />

      <footer className="dash-base">
        <div className="dash-glass" style={{ left: style.left, width: style.width }} />
        {tabs.map((t, i) => (
          <span
            key={t}
            ref={(el) => { if (el) refs.current[i] = el; }}
            className="dash-tab"
            onClick={() => handleClick(t)}
          >
            {t}
          </span>
        ))}
      </footer>

      <p className="dash-copy">
        © Copyright 2025 YouQue Company Limited
      </p>
    </div>
  );
}
