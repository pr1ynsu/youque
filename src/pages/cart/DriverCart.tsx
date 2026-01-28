import "../../styles/cart.css";
import { Settings, Play, StopCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUI } from "../../context/UIContext";

export default function DriverCart() {
  const nav = useNavigate();
  const { setModalOpen } = useUI();

  const [running, setRunning] = useState(false);
  const [sheet, setSheet] = useState<"user" | "settings" | null>(null);

  const closeAll = () => {
    setSheet(null);
    setModalOpen(false);
  };

  const openModal = (type: "user" | "settings") => {
    setModalOpen(true);
    setSheet(type);
  };

  return (
    <div className="cart-root">

      <div className="cart-panel">

        <div className="cart-header">
          <div className="cart-avatar driver" onClick={() => openModal("user")}>D</div>
          <Settings size={18} onClick={() => openModal("settings")} />
        </div>

        {/* DRIVER ACTION */}
        <button
          className="cart-action wide"
          onClick={() => setRunning(!running)}
        >
          {running ? <StopCircle size={18} /> : <Play size={18} />}
          {running ? " Stop Route" : " Start Route"}
        </button>

        {/* INFO */}
        <div className="cart-info-box">
          <p><b>Cart No:</b> C-03</p>
          <p><b>Route:</b> 15 → 06</p>
          <p><b>Seats:</b> 8 / 12 filled</p>
        </div>

        {/* DETAILS */}
        <button
          className="cart-action wide secondary"
          onClick={() => nav("/detail")}
        >
          View Route Details
        </button>
      </div>

      <div className="cart-map-frame">
        <iframe src="https://www.google.com/maps?q=KIIT+Campus+6&output=embed" />
      </div>

      {sheet && (
        <div className="center-backdrop" onClick={closeAll}>
          <div className="center-sheet" onClick={(e) => e.stopPropagation()}>
            <h4>Menu</h4>

            {sheet === "user" && (
              <div className="mini-panel" onClick={() => nav("/user")}>
                Driver Profile
              </div>
            )}

            {sheet === "settings" && (
              <div className="mini-panel">Settings coming soon</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
