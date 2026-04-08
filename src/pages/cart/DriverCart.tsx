import "../../styles/driver.css";
import { Settings, Play, StopCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUI } from "../../context/UIContext";

import { db } from "../../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

export default function DriverCart() {
  const nav = useNavigate();
  const { setModalOpen } = useUI();

  const [running, setRunning] = useState(false);
  const [sheet, setSheet] = useState<"user" | "settings" | null>(null);

  const [cartId, setCartId] = useState("cart1"); // 🔥 SELECT CART
  const [status, setStatus] = useState("available");
  const [location, setLocation] = useState<any>(null);

  const [route, setRoute] = useState("Not Assigned");
  const [timing, setTiming] = useState("-");
  const [seats, setSeats] = useState(10);

  // 🔥 RECEIVE ADMIN DATA
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "carts", cartId), (snap) => {
      const data = snap.data();
      if (!data) return;

      setRoute(data.route || "Not Assigned");
      setTiming(data.timing || "-");
      setStatus(data.status || "available");
      setSeats(data.seats ?? 10);
    });

    return () => unsub();
  }, [cartId]);

  // 🔥 UPDATE FIRESTORE
  const updateCart = async (lat: number, lng: number, newStatus = status) => {
    await setDoc(
      doc(db, "carts", cartId),
      {
        location: { lat, lng },
        status: newStatus,
        seats,
      },
      { merge: true }
    );
  };

  // 🔁 GPS LOOP
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setLocation({ lat, lng });
        updateCart(lat, lng);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [running, status, seats]);

  // UI
  const closeAll = () => {
    setSheet(null);
    setModalOpen(false);
  };

  const openModal = (type: "user" | "settings") => {
    setModalOpen(true);
    setSheet(type);
  };

  return (
    <div className="driver-root">

      {/* HEADER */}
      <div className="driver-header">
        <div className="driver-avatar">D</div>
        <Settings size={20} onClick={() => openModal("settings")} />
      </div>

      {/* 🔥 CART SELECT */}
      <select
        value={cartId}
        onChange={(e) => setCartId(e.target.value)}
        className="driver-select"
      >
        <option value="cart1">Cart 1</option>
        <option value="cart2">Cart 2</option>
        <option value="cart3">Cart 3</option>
        <option value="cart4">Cart 4</option>
      </select>

      {/* MAIN CARD */}
      <div className="driver-main-card">
        <p className="label">Current Route</p>
        <h3>{route}</h3>
        <p className="sub">{timing}</p>

        <div className="status-pill">{status}</div>
      </div>

      {/* START / STOP */}
      <button
        className={`driver-toggle ${running ? "stop" : "start"}`}
        onClick={() => setRunning(!running)}
      >
        {running ? <StopCircle size={18} /> : <Play size={18} />}
        {running ? " Stop Route" : " Start Route"}
      </button>

      {/* STATUS */}
      <div className="driver-status-row">
        {["available", "few", "full", "break", "issue"].map((s) => (
          <button
            key={s}
            className={status === s ? "active" : ""}
            onClick={() => {
              setStatus(s);
              updateCart(location?.lat || 0, location?.lng || 0, s);
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* SEATS */}
      <div className="driver-info-card">
        <p><b>Seats Left:</b> {seats}</p>

        <input
          type="range"
          min="0"
          max="12"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
        />
      </div>

      {/* MAP */}
      <div className="driver-map">
        <iframe
          src={
            location
              ? `https://www.google.com/maps?q=${location.lat},${location.lng}&output=embed`
              : `https://www.google.com/maps?q=KIIT&output=embed`
          }
        />
      </div>

    </div>
  );
}