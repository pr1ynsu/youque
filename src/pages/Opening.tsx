import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/opening.css";

export default function Opening() {
  const nav = useNavigate();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      nav("/home");
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }, 8000);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [nav]);

  return (
    <div className="opening-root">
      <div className="opening-logo-wrap">
        <div className="opening-circle">
          <span className="opening-q">Q</span>
        </div>
        <p className="opening-text">YOUQUE</p>
      </div>
    </div>
  );
}
