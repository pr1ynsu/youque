import "../styles/cart.css";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUI } from "../context/UIContext";

const campuses = ["Campus 03", "Campus 06", "Campus 15", "Campus 17"];

export default function Cart() {
  const nav = useNavigate();
  const { setModalOpen } = useUI();

  const [picker, setPicker] = useState<"from" | "to" | null>(null);
  const [from, setFrom] = useState("Campus 15");
  const [to, setTo] = useState("Campus 06");
  const [openSheet, setOpenSheet] = useState<"user" | "settings" | null>(null);

  const closeAll = () => {
    setPicker(null);
    setOpenSheet(null);
    setModalOpen(false);
  };

  const openModal = (type: "from" | "to" | "user" | "settings") => {
    setModalOpen(true);
    if (type === "from" || type === "to") setPicker(type);
    else setOpenSheet(type);
  };

  return (
    <div className="cart-root">
      <div className="cart-panel">

        <div className="cart-header">
          <div className="cart-avatar" onClick={() => openModal("user")}>U</div>
          <Settings size={18} onClick={() => openModal("settings")} />
        </div>

        <button className="cart-action wide" onClick={() => nav("/cart-around")}>Cart around you</button>

        <div className="cart-route-box">
          <div className="route-pill" onClick={() => openModal("from")}>
            <p>From</p><span>{from}</span>
          </div>
          <div className="route-pill" onClick={() => openModal("to")}>
            <p>To</p><span>{to}</span>
          </div>
        </div>

        <button className="cart-action wide" onClick={() => nav("/detail")}>Break – 02:00</button>
      </div>

      <div className="cart-map-frame">
        <iframe src="https://www.google.com/maps?q=KIIT+Campus+6&output=embed" />
      </div>

      {(picker || openSheet) && (
        <div className="center-backdrop" onClick={closeAll}>
          <div className="center-sheet" onClick={e => e.stopPropagation()}>
            <h4>{picker ? "Choose Campus" : openSheet === "user" ? "User" : "Settings"}</h4>

            {picker && campuses.map(c => (
              <div key={c} className="picker-option"
                onClick={() => {
                  picker === "from" ? setFrom(c) : setTo(c);
                  closeAll();
                }}>
                {c}
              </div>
            ))}

            {openSheet === "user" && (
              <div className="mini-panel" onClick={() => nav("/user")}>Go to Profile</div>
            )}

            {openSheet === "settings" && (
              <div className="mini-panel">Settings coming soon</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
