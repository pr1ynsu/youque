import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";
import "../styles/admin.css";

export default function Admin() {
  const [campuses, setCampuses] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [carts, setCarts] = useState<any[]>([]);

  const [routeName, setRouteName] = useState("");
  const [selectedStops, setSelectedStops] = useState<string[]>([]);

  const [selectedCart, setSelectedCart] = useState("");
  const [assignRoute, setAssignRoute] = useState("");
  const [timing, setTiming] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const campusSnap = await getDocs(collection(db, "campuses"));
    setCampuses(campusSnap.docs.map(d => d.data()));

    const routeSnap = await getDocs(collection(db, "routes"));
    setRoutes(routeSnap.docs.map(d => ({
      id: d.id,
      ...d.data()
    })));

    const cartSnap = await getDocs(collection(db, "carts"));
    setCarts(cartSnap.docs.map(d => ({
      id: d.id,
      ...d.data()
    })));
  };

  const addRoute = async () => {
    if (!routeName || selectedStops.length < 2) return;

    await addDoc(collection(db, "routes"), {
      name: routeName,
      stops: selectedStops
    });

    setRouteName("");
    setSelectedStops([]);
    loadData();
  };

  const toggleStop = (campus: string) => {
    setSelectedStops(prev =>
      prev.includes(campus)
        ? prev.filter(c => c !== campus)
        : [...prev, campus]
    );
  };

  const assignCart = async () => {
    if (!selectedCart || !assignRoute) return;

    await updateDoc(doc(db, "carts", selectedCart), {
      route: assignRoute,
      timing: timing,
      status: "available"
    });

    setSelectedCart("");
    setAssignRoute("");
    setTiming("");
    loadData();
  };

  return (
    <div className="admin-root">

      <h2 className="admin-title">Admin Control</h2>

      {/* CREATE ROUTE */}
      <div className="admin-card">
        <h3>Create Route</h3>

        <input
          placeholder="Route Name"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
        />

        <div className="route-grid">
          {campuses.map(c => (
            <button
              key={c.name}
              onClick={() => toggleStop(c.name)}
              className={`route-btn ${
                selectedStops.includes(c.name) ? "active" : ""
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <button className="primary-btn" onClick={addRoute}>
          Create Route
        </button>
      </div>

      {/* ASSIGN CART */}
      <div className="admin-card">
        <h3>Assign Cart</h3>

        <select
          value={selectedCart}
          onChange={(e) => setSelectedCart(e.target.value)}
        >
          <option value="">Select Cart</option>
          {carts.map(c => (
            <option key={c.id} value={c.id}>
              {c.id}
            </option>
          ))}
        </select>

        <select
          value={assignRoute}
          onChange={(e) => setAssignRoute(e.target.value)}
        >
          <option value="">Select Route</option>
          {routes.map(r => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Timing (8 AM - 6 PM)"
          value={timing}
          onChange={(e) => setTiming(e.target.value)}
        />

        <button className="primary-btn" onClick={assignCart}>
          Assign Cart
        </button>
      </div>

      {/* CART STATUS */}
      <div className="admin-card">
        <h3>Cart Status</h3>

        {carts.map(c => (
          <div key={c.id} className="cart-row">
            <div>
              <div className="route">{c.id}</div>
              <div className="sub">{c.route || "Not assigned"}</div>
            </div>

            <span className={`status ${c.status}`}>
              {c.status}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}