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

  const hideTimer = useRef<any>(null);
  const isCart = location.pathname === "/cart";

  /* 🔹 Move glass indicator smoothly BEFORE route change */
  const handleClick = (tab: string, index: number) => {
    const el = refs.current[index];
    if (el) {
      setStyle({ left: el.offsetLeft - 6, width: el.offsetWidth + 12 });
    }
    setTimeout(() => nav(`/${tab}`), 120);
  };

  /* 🔹 Update indicator on route change */
  useEffect(() => {
    const current = location.pathname.replace("/", "") || "home";
    const index = tabs.indexOf(current);
    const el = refs.current[index];
    if (el) {
      setStyle({ left: el.offsetLeft - 6, width: el.offsetWidth + 12 });
    }
  }, [location.pathname]);

  /* 🔹 Reveal / hide only in cart */
  useEffect(() => {
    if (!isCart) {
      setVisible(true);
      return;
    }

    const reveal = () => {
      setVisible(true);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setVisible(false), 3000);
    };

    window.addEventListener("wheel", reveal);
    window.addEventListener("touchmove", reveal);

    return () => {
      window.removeEventListener("wheel", reveal);
      window.removeEventListener("touchmove", reveal);
    };
  }, [isCart]);

  return (
    <div className="dash-root">
      <Outlet />

      <footer className={`dash-base ${isCart && !visible ? "dash-hide" : ""}`}>
        <div className="dash-glass" style={{ left: style.left, width: style.width }} />
        {tabs.map((t, i) => (
          <span
            key={t}
            ref={(el) => {
              if (el) refs.current[i] = el;
                          }}

            className="dash-tab"
            onClick={() => handleClick(t, i)}
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
