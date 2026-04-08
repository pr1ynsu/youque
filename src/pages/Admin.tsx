import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";
import "../styles/admin.css";

export default function Admin() {
  const [driverId, setDriverId] = useState("");
  const [route, setRoute] = useState("");
  const [timing, setTiming] = useState("");
  const [carts, setCarts] = useState<any[]>([]);

  // 🔥 ASSIGN ROUTE TO DRIVER
  const assign = async () => {
    if (!driverId || !route || !timing) {
      alert("Fill all fields");
      return;
    }

    await setDoc(
      doc(db, "carts", driverId),
      {
        route,
        timing,
      },
      { merge: true }
    );

    alert("Assigned successfully");
  };

  // 🔥 LIVE CART DATA
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "carts"), (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setCarts(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="admin-root">

      <h2 className="admin-title">Operations Control</h2>

      {/* 🔧 CONTROL CARD */}
      <div className="admin-card">

        <h4>Assign Route</h4>

        <div className="form-group">
          <label>Driver UID</label>
          <input
            placeholder="Enter driver UID"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Route</label>
          <input
            placeholder="Campus 6 → Campus 15"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Timing</label>
          <input
            placeholder="8:00 AM – 10:00 AM"
            value={timing}
            onChange={(e) => setTiming(e.target.value)}
          />
        </div>

        <button className="primary-btn" onClick={assign}>
          Assign Route
        </button>

      </div>

      {/* 📊 ACTIVE CARTS */}
      <div className="admin-card">

        <h4>Active Carts</h4>

        {carts.length === 0 && <p>No carts active</p>}

        {carts.map((c) => (
          <div key={c.id} className="admin-row">

            <div>
              <p className="route">{c.route || "No Route"}</p>
              <p className="sub">{c.timing || "No Timing"}</p>
              <p className="sub">Driver: {c.id.slice(0, 6)}</p>
            </div>

            <span className={`status ${c.status || "available"}`}>
              {c.status || "available"}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}