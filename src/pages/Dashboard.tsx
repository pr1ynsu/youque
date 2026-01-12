import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../styles/dashboard.css";
import SocialSheet from "../components/SocialSheet";

export default function Dashboard() {
  const nav = useNavigate();
  const location = useLocation();

  const tabs = ["home", "company", "customer", "social"];
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [style, setStyle] = useState({ left: 0, width: 0 });
  const [visible, setVisible] = useState(true);
  const [socialOpen, setSocialOpen] = useState(false);

  const hideTimer = useRef<number | null>(null);
  const isCart = location.pathname === "/cart";

  const handleClick = (tab: string, index: number) => {
    const el = refs.current[index];
    if (el) setStyle({ left: el.offsetLeft - 6, width: el.offsetWidth + 12 });

    if (tab === "social") {
      setSocialOpen(true);
      return;
    }

    setTimeout(() => nav(`/${tab}`), 140);
  };

  useEffect(() => {
    const current = location.pathname.replace("/", "") || "home";
    const index = tabs.indexOf(current);
    const el = refs.current[index];
    if (el) setStyle({ left: el.offsetLeft - 6, width: el.offsetWidth + 12 });
  }, [location.pathname]);

  useEffect(() => {
    if (!isCart) {
      setVisible(true);
      return;
    }

    const reveal = () => {
      setVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setVisible(false), 2600);
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
            ref={(el) => (refs.current[i] = el)}
            className="dash-tab"
            onClick={() => handleClick(t, i)}
          >
            {t}
          </span>
        ))}
      </footer>

      <p className={`dash-copy ${isCart && !visible ? "dash-hide" : ""}`}>
        © 2025 YouQue Company Limited
      </p>

      <SocialSheet open={socialOpen} onClose={() => setSocialOpen(false)} />
    </div>
  );
}
