import "../../styles/cart.css";
import { MapPin, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import safeRender from "../../utils/safeRender"; 
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const campuses = ["Campus 03", "Campus 06", "Campus 15", "Campus 17"];

export default function UserCart() {
  const nav = useNavigate();

  const [picker, setPicker] = useState<"from" | "to" | null>(null);
  const [from, setFrom] = useState("Campus 15");
  const [to, setTo] = useState("Campus 06");

  const [carts, setCarts] = useState<any[]>([]);
  const [selectedCart, setSelectedCart] = useState<any>(null);

  // 🔥 LIVE FIRESTORE DATA
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "carts"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCarts(data);
    });

    return () => unsub();
  }, []);

  // 🎯 FILTER BASED ON ROUTE
  const filtered = carts;

  // 🚀 BOOK FUNCTION
  const handleBook = (cart: any) => {
    setSelectedCart(cart);

    alert(`Booked cart ${cart.id} 🚗`);
    // later: send to backend / socket
  };

  return (
    <div className="cart-root">

      {/* ===== LEFT PANEL ===== */}
      <div className="cart-panel">

        <h3 className="cart-title">Find your ride</h3>

        {/* ROUTE */}
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

        {/* INFO */}
        <div className="cart-info-row">
          <span><Users size={14}/> {filtered.length} carts</span>
          <span><Clock size={14}/> ~5 mins avg</span>
        </div>

        {/* 🔥 AVAILABLE CARTS */}
        <div className="cart-list">
          {filtered.length === 0 && <p>No carts available</p>}

          {filtered.map(cart => (
            <div key={cart.id} className="cart-card">

              <div className="cart-header">
                <h4>{safeRender(cart.from)} → {safeRender(cart.to)}</h4>
                <span className={`status ${safeRender(cart.status)}`}>
                  {safeRender(cart.status)}
                </span>
              </div>

              <p>🪑 Seats: {safeRender(cart.seats)}</p>
              <p>⏱ ETA: {safeRender(cart.eta) || "4 mins"}</p>

              <button onClick={() => handleBook(cart)}>
                Book Ride
              </button>

            </div>
          ))}
        </div>

        {/* 🔥 ACTION BUTTONS */}
        <button
          className="cart-action wide secondary"
          onClick={() => nav("/cart-around")}
        >
          Nearby Carts
        </button>

        <button
          className="cart-action wide secondary"
          onClick={() => nav("/detail")}
        >
          Route Details
        </button>

      </div>

      {/* ===== RIGHT MAP ===== */}
      <div className="cart-map-frame">

        {/* 🔥 dynamic map */}
        <iframe
          src={`https://www.google.com/maps?q=${from}+KIIT+to+${to}&output=embed`}
        />

        {/* 🔥 LIVE DRIVER OVERLAY */ }
        {filtered.map(cart => (
          <div key={safeRender(cart.id)} className="map-driver">
            🚗 {safeRender(cart.id)}
          </div>
        ))}

      </div>

      {/* ===== PICKER ===== */}
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

      {/* 🔥 LIVE TRACK PANEL */}
      {selectedCart && (
        <div className="live-track">
          <h4>Live Ride</h4>
          <p>Driver: {safeRender(selectedCart.id)}</p>
          <p>Status: {safeRender(selectedCart.status)}</p>
          <p>Seats Left: {safeRender(selectedCart.seats)}</p>
          <span className="live-dot"></span>
        </div>
      )}

    </div>
  );
}