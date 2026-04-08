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

  const handleBook = (cart: any) => {
    setSelectedCart(cart);
  };

  return (
    <div className="cart-root">

      {/* LEFT PANEL */}
      <div className="cart-panel">

        <h2 className="cart-title">Find Your Ride</h2>

        {/* ROUTE */}
        <div className="cart-route-box">
          <div className="route-pill" onClick={() => setPicker("from")}>
            <span>From</span>
            <strong>{from}</strong>
          </div>

          <div className="route-pill" onClick={() => setPicker("to")}>
            <span>To</span>
            <strong>{to}</strong>
          </div>
        </div>

        {/* INFO */}
        <div className="cart-info-row">
          <span><Users size={14}/> {carts.length} carts</span>
          <span><Clock size={14}/> ~5 mins</span>
        </div>

        {/* LIST */}
        <div className="cart-list">
          {carts.length === 0 && <p>No carts available</p>}

          {carts.map(cart => (
            <div key={cart.id} className="cart-card">

              <div className="cart-header">
                <h4>{safeRender(cart.from)} → {safeRender(cart.to)}</h4>
                <span className={`status ${safeRender(cart.status)}`}>
                  {safeRender(cart.status)}
                </span>
              </div>

              <div className="cart-meta">
                <span>🪑 {safeRender(cart.seats)}</span>
                <span>⏱ {safeRender(cart.eta) || "4 min"}</span>
              </div>

              <button 
                className="book-btn"
                onClick={() => handleBook(cart)}
              >
                Book Ride
              </button>

            </div>
          ))}
        </div>

        <div className="cart-actions">
          <button onClick={() => nav("/cart-around")}>
            Nearby
          </button>
          <button onClick={() => nav("/detail")}>
            Details
          </button>
        </div>

      </div>

      {/* RIGHT MAP */}
      <div className="cart-map-frame">
        <iframe
          src={`https://www.google.com/maps?q=${from}+KIIT+to+${to}&output=embed`}
        />

        {carts.map(cart => (
          <div key={cart.id} className="map-driver">
            🚗 {cart.id}
          </div>
        ))}
      </div>

      {/* PICKER */}
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

      {/* LIVE TRACK */}
      {selectedCart && (
        <div className="live-track">
          <h4>Live Ride</h4>
          <p>{selectedCart.id}</p>
          <span className="live-dot"></span>
        </div>
      )}

    </div>
  );
}