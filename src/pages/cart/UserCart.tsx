import "../../styles/cart.css";
import { MapPin, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const campuses = ["Campus 03", "Campus 06", "Campus 15", "Campus 17"];

export default function UserCart() {
  const nav = useNavigate();

  const [picker, setPicker] = useState<"from" | "to" | null>(null);
  const [from, setFrom] = useState("Campus 15");
  const [to, setTo] = useState("Campus 06");

  const seatsAvailable = 3;
  const eta = "4 mins";

  return (
    <div className="cart-root">

      {/* ===== Info Panel ===== */}
      <div className="cart-panel">

        <h3 className="cart-title">Find your ride</h3>

        {/* From/To */}
        <div className="cart-route-box">
          <div className="route-pill" onClick={() => setPicker("from")}>
            <span className="route-title">From</span>
            <span className="route-value">{from}</span>
          </div>

          <div className="route-pill" onClick={() => setPicker("to")}>
            <span className="route-title">To</span>
            <span className="route-value">{to}</span>
          </div>
        </div>

        {/* Info row */}
        <div className="cart-info-row">
          <span><Users size={14}/> {seatsAvailable} seats</span>
          <span><Clock size={14}/> {eta}</span>
        </div>

        {/* EXISTING */}
        <button className="cart-action wide">
          Book Cart
        </button>

        {/* 🔥 ADDED ONLY THESE TWO (nothing else changed) */}

        <button
          className="cart-action wide secondary"
          onClick={() => nav("/cart-around")}
        >
          Cart around you
        </button>

        <button
          className="cart-action wide secondary"
          onClick={() => nav("/detail")}
        >
          View Details
        </button>

      </div>


      {/* ===== MAP ===== */}
      <div className="cart-map-frame">
        <iframe src="https://www.google.com/maps?q=KIIT+Campus+6&output=embed" />
      </div>


      {/* ===== Picker Sheet ===== */}
      {picker && (
        <div className="center-backdrop" onClick={() => setPicker(null)}>
          <div className="center-sheet" onClick={(e) => e.stopPropagation()}>
            <h4>Select Campus</h4>

            {campuses.map(c => (
              <div
                key={c}
                className="picker-option"
                onClick={() => {
                  picker === "from" ? setFrom(c) : setTo(c);
                  setPicker(null);
                }}
              >
                <MapPin size={14}/> {c}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
