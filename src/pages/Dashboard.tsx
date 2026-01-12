import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../styles/dashboard.css";
import SocialSheet from "../components/SocialSheet";
import { useUI } from "../context/UIContext";

export default function Dashboard() {
  const nav = useNavigate();
  const location = useLocation();
  const { modalOpen } = useUI();

  const tabs = ["home", "company", "customer", "social"];
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [style, setStyle] = useState({ left: 0, width: 0 });
  const [socialOpen, setSocialOpen] = useState(false);

  

  const handleClick = (tab: string, i: number) => {
    if (tab === "social") {
      setSocialOpen(true);
      return;
    }
    const el = refs.current[i];
    if (el) setStyle({ left: el.offsetLeft - 6, width: el.offsetWidth + 12 });
    setTimeout(() => nav(`/${tab}`), 120);
  };

  useEffect(() => {
    const cur = location.pathname.replace("/", "") || "home";
    if (cur === "social") return;
    const i = tabs.indexOf(cur);
    const el = refs.current[i];
    if (el) setStyle({ left: el.offsetLeft - 6, width: el.offsetWidth + 12 });
  }, [location.pathname]);

  return (
    <div className="dash-root">
      <Outlet />

      {!modalOpen && (
        <>
          <footer className="dash-base">
            <div className="dash-glass" style={{ left: style.left, width: style.width }} />
            {tabs.map((t, i) => (
              <span
                key={t}
                ref={(el) => { refs.current[i] = el; }}
                className="dash-tab"
                onClick={() => handleClick(t, i)}
              >
                {t}
              </span>
            ))}
          </footer>
          <p className="dash-copy">© 2025 YouQue Company Limited</p>
        </>
      )}

      <SocialSheet open={socialOpen} onClose={() => setSocialOpen(false)} />
    </div>
  );
}
