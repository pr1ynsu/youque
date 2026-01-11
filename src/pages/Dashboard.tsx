import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../styles/dashboard.css";

export default function Dashboard() {
  const nav = useNavigate();
  const location = useLocation();
  const tabs = ["home", "company", "customer", "social"];
  const refs = useRef<HTMLSpanElement[]>([]);
  const [style, setStyle] = useState({ left: 0, width: 0 });
  const [visible, setVisible] = useState(true);

  const lastScroll = useRef(0);
  const timer = useRef<any>(null);

  const isCart = location.pathname === "/cart";

  useEffect(() => {
    const current = location.pathname.replace("/", "") || "home";
    const index = tabs.indexOf(current);
    const el = refs.current[index];
    if (el) {
      setStyle({ left: el.offsetLeft - 6, width: el.offsetWidth + 12 });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isCart) {
      setVisible(true);
      return;
    }

    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY < lastScroll.current) {
        setVisible(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setVisible(false), 3000);
      }

      lastScroll.current = currentY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isCart]);

  return (
    <div className="dash-root">
      <Outlet />

      <footer className={`dash-base ${isCart && !visible ? "dash-hide" : ""}`}>
        <div
          className="dash-glass"
          style={{ left: style.left, width: style.width }}
        />

        {tabs.map((t, i) => (
          <span
            key={t}
            ref={(el) => { if (el) refs.current[i] = el; }}

            className="dash-tab"
            onClick={() => nav(`/${t}`)}
          >
            {t}
          </span>
        ))}
      </footer>

      <p className={`dash-copy ${isCart && !visible ? "dash-hide" : ""}`}>
        © Copyright 2025 YouQue Company Limited
      </p>
    </div>
  );
}
