import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/opening.css";

export default function Opening() {
  const nav = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => nav("/home"), 10000);
    return () => clearTimeout(timer);
  }, []);

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
