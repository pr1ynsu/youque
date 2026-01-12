import "../styles/cartAround.css";
import { useState } from "react";

const points = [
  "Campus 03",
  "Campus 06",
  "Campus 12",
  "Campus 14",
  "Campus 15",
  "Campus 17",
  "Campus 25",
];

export default function CartAround() {
  const [location, setLocation] = useState("KIIT Campus 6");

  return (
    <div className="cartaround-root">
      <div className="cartaround-map">
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`}
        />
      </div>

      <div className="cartaround-list">
        {points.map((p) => (
          <button
            key={p}
            className="cartaround-btn"
            onClick={() => setLocation(p)}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
