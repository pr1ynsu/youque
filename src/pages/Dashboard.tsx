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

  const [visible, setVisible] = useState(true);
  const timer = useRef<number | null>(null);
  const isCart = location.pathname === "/cart";

  useEffect(() => {
    const current = location.pathname.replace("/", "") || "home";
    const index = tabs.indexOf(current);
    const el = refs.current[index];
    if (el) setStyle({ left: el.offsetLeft - 6, width: el.offsetWidth + 12 });
  }, [location.pathname, tabs]);

  useEffect(() => {
    if (!isCart) return;

    const reveal = () => {
      setVisible(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setVisible(false), 2500);
    };

    window.addEventListener("wheel", reveal);
    window.addEventListener("touchmove", reveal);

    return () => {
      window.removeEventListener("wheel", reveal);
      window.removeEventListener("touchmove", reveal);
    };
  }, [isCart]);

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

      <footer className="dash-base" style={{ display: visible ? 'flex' : 'none' }}>
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
