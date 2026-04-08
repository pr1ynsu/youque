import "../../styles/driver.css";
import { Settings, Play, StopCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUI } from "../../context/UIContext";

import { auth, db } from "../../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

export default function DriverCart() {
  const nav = useNavigate();
  const { setModalOpen } = useUI();

  const [running, setRunning] = useState(false);
  const [sheet, setSheet] = useState<"user" | "settings" | null>(null);

  const [status, setStatus] = useState("available");
  const [location, setLocation] = useState<any>(null);

  const [route, setRoute] = useState("Not Assigned");
  const [timing, setTiming] = useState("-");
  const [seats] = useState(0);

  const user = auth.currentUser;

  // 🔥 RECEIVE ADMIN DATA
  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(doc(db, "carts", user.uid), (snap) => {
      const data = snap.data();
      if (!data) return;

      setRoute(data.route || "Not Assigned");
      setTiming(data.timing || "-");
      setStatus(data.status || "available");
    });

    return () => unsub();
  }, [user]);

  // 🔥 SEND GPS
  const updateCart = async (lat: number, lng: number) => {
    if (!user) return;

    await setDoc(
      doc(db, "carts", user.uid),
      {
        lat,
        lng,
        status,
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
  }, [running, status]);

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
        <div className="driver-avatar" onClick={() => openModal("user")}>D</div>
        <Settings size={20} onClick={() => openModal("settings")} />
      </div>

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

      {/* STATUS BUTTONS */}
      <div className="driver-status-row">
        <button
          className={status === "available" ? "active" : ""}
          onClick={() => {
            setStatus("available");
            navigator.vibrate?.(50);
          }}
        >
          Available
        </button>

        <button
          className={status === "few" ? "active" : ""}
          onClick={() => {
            setStatus("few");
            navigator.vibrate?.(50);
          }}
        >
          Few
        </button>

        <button
          className={status === "full" ? "active" : ""}
          onClick={() => {
            setStatus("full");
            navigator.vibrate?.(50);
          }}
        >
          Full
        </button>
      </div>

      {/* INFO */}
      <div className="driver-info-card">
        <p><b>Seats:</b> {seats}/12</p>
        <p><b>Live:</b> {running ? "Running" : "Stopped"}</p>
      </div>

      {/* MAP */}
      <div className="driver-map">
        {location ? (
          <iframe
            src={`https://www.google.com/maps?q=${location.lat},${location.lng}&output=embed`}
          />
        ) : (
          <iframe src="https://www.google.com/maps?q=KIIT&output=embed" />
        )}
      </div>

      {/* MODAL */}
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